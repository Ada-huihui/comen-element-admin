import request from '@/utils/request'

export function getCategory(params) {
  return request({
    url: '/newsCategory',
    method: 'get',
    params
  })
}
export function addCategory(data) {
  return request({
    url: '/newsCategory',
    method: 'post',
    data
  })
}
export function delCategory(categoryId) {
  return request({
    url: `/newsCategory/${categoryId}`,
    method: 'delete'
  })
}
export function editCategory(data) {
  return request({
    url: '/newsCategory',
    method: 'put',
    data
  })
}

export function getList(params) {
  return request({
    url: '/news/page',
    method: 'get',
    params
  })
}
export function addList(data) {
  return request({
    url: '/news',
    method: 'post',
    data
  })
}
export function delList(params) {
  return request({
    url: `/news/${params}`,
    method: 'delete'
  })
}
export function editList(data) {
  return request({
    url: '/news',
    method: 'put',
    data
  })
}
