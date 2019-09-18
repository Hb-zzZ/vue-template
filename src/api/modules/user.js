import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/a/wy/login',
    method: 'post',
    params
  })
}

export function getInfo() {
  return request({
    url: '/a/wy/getCurrentUser',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/a/wy/logout',
    method: 'get',
    loadingType: 'overall'
  })
}
