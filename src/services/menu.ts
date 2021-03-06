import request from '@/utils/request'

interface Menu {
  parentId: number,
  name: string,
  href: string,
  icon: string,
  orderNum: number,
  description: string,
  shown: boolean
}

export const getEditMenuInfo = (id: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const saveOrUpdate = (data: Menu) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
