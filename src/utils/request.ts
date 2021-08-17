import axios from 'axios'
import store from '@/store/index.ts'
import { Message } from 'element-ui'
import router from '@/router/index.ts'
import qs from 'qs'

const request = axios.create({

})

const _redirectLogin = () => {
  store.commit('setUser', null)
  router.push({
    name: 'login'
  })
}

request.interceptors.request.use(config => {
  const user = store.state.user
  if (user && user.access_token) {
    config.headers.Authorization = store.state.user.access_token
  }
  return config
})

let isRefreshing = false
let waitingRefreshReqs : any[] = []
request.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) { // error response
    const status = error.response.status
    if (status === 401) {
      if (store.state.user.refresh_token) {
        if (!isRefreshing) {
          isRefreshing = true
          return axios.create()({
            method: 'POST',
            url: '/front/user/refresh_token',
            data: qs.stringify({
              refreshtoken: store.state.user.refresh_token
            })
          }).then(response => {
            waitingRefreshReqs.forEach(cb => cb(isRefreshing))
            store.commit('setUser', response.data.content)
            return request(error.config)
          }).catch(error => {
            waitingRefreshReqs.forEach(cb => cb())
            _redirectLogin()
            return Promise.reject(error)
          }).finally(() => {
            isRefreshing = false
            waitingRefreshReqs = []
          })
        } else {
          return new Promise((resolve, reject) => {
            waitingRefreshReqs.push((ok: boolean) => {
              if (ok) {
                resolve(request(error.config))
              } else {
                reject(new Error('cannot start retry'))
              }
            })
          })
        }
      } else {
        _redirectLogin()
      }
    }
    console.dir(error)
  } else if (error.request) { // requested, no response
    Message.error('No response from server')
  } else { // error before request
    Message.error(`Request fail: ${error.message}`)
  }

  return Promise.reject(error)
})
export default request
