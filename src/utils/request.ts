import axios from 'axios'
import store from '@/store/index.ts'
import { Message } from 'element-ui'

const request = axios.create({

})

request.interceptors.request.use(config => {
  const user = store.state.user
  if (user && user.access_token) {
    config.headers.Authorization = store.state.user.access_token
  }
  return config
})

request.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) { // error response
    const status = error.response.status
    if (status === 401) {
      if (store.state.user.refresh_token) {

      } else {

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
