// 走失人员管理api接口
import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/elderly/list',
    method: 'post',
    data: {
      page: { current: page.current, size: page.size },
      sort: { property: sort.prop, direction: sort.order },
      query: { ...query }
    }
  })
  // const geoData = require('@/static/test/elderly.json')
  // console.log(geoData.data)
  // return geoData
}

// 根据id获取数据
export function get(id) {
  return request({
    url: `/role/${id}/detail`,
    method: 'get'
  })
}
// 根据id获取亲属信息
export function getRelative(id) {
  return request({
    url: `/elderly/getRelatives/${id}`,
    method: 'get'
  })
}

// 根据id获取图片
export function getPhoto(id) {
  return request({
    url: `/elderly/getPhotos/${id}`,
    method: 'get'
  })
}

// 根据当前用户所有权限数据
export function getAllAccess() {
  return request({
    url: '/elderly/access',
    method: 'get'
  })
}

// 根据当前用户所有权限数据
export function getAccess(id) {
  return request({
    url: `/elderly/${id}/access`,
    method: 'get'
  })
}

// 获得下拉列表的数据
export function getlist() {
  return request({
    url: '/elderly/selectList',
    method: 'get'
  })
}

// 添加数据
export function create(data) {
  return request({
    url: '/elderly/create',
    method: 'post',
    data: {
      elderly: data,
      photos: data.photos,
      relatives: data.relatives
    }
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/elderly/update',
    method: 'put',
    data: {
      elderly: data,
      photos: data.photos,
      relatives: data.relatives
    }
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/elderly/delete',
    method: 'delete',
    data: data
  })
}
