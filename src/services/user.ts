import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string,
  password: string
}

export const login = (user : User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(user)
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
