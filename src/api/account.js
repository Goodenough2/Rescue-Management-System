import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/account/login',
    // url: '/user/login',
    method: 'post',
    data
  })
}

export function getAccess() {
  // return request({
  //   // url: '/account/access',
  //   url: '/account/access\.*',
  //   method: 'get'
  // })
  const geoData = require('../../access.json')
  console.log(geoData.data)
  return geoData
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function updatePwd(data) {
  return request({
    url: '/user/changePwd',
    method: 'put',
    data
  })
}
