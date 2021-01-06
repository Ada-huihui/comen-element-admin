import request from '@/utils/request'

export function getRecruitCategory(params) {
  return request({
    url: `/sys/dict/dictItems/${params}`,
    method: 'get'
  })
}

export function getRecruitList(params) {
  return request({
    url: '/recruit/page',
    method: 'get',
    params
  })
}
export function editRecruit(data) {
  return request({
    url: '/recruit/save',
    method: 'post',
    data
  })
}
export function delRecruit(params) {
  return request({
    url: `/recruit/${params}`,
    method: 'delete'
  })
}
// export function editList(data) {
//   return request({
//     url: '/news',
//     method: 'put',
//     data
//   })
// }
