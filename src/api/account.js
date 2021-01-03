import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/account/login',
    method: 'post',
    data
  })
}

export function getAccess() {
  return request({
    url: '/account/access',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/account/logout',
    method: 'post'
  })
}

export function updatePwd(data) {
  return request({
    url: '/account/updatePwd',
    method: 'post',
    data
  })
}
