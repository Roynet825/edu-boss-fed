import request from '@/utils/request'

export const getAllResourceCategory = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
