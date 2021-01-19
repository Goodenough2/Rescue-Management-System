// 家属管理api接口
import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/relative/list',
    method: 'post',
    data: {
      page: { current: page.current, size: page.size },
      sort: { property: sort.prop, direction: sort.order },
      query: { ...query }
    }
  })
  // const geoData = require('@/static/test/relative.json')
  // console.log(geoData.data)
  // return geoData
}

// 根据id获取数据
export function get(id) {
  return request({
    url: `/getRelatives/${id}`,
    method: 'get'
  })
}

// 根据当前用户所有权限数据
export function getAllAccess() {
  return request({
    url: '/relative/access',
    method: 'get'
  })
}

// 根据当前用户所有权限数据
export function getAccess(id) {
  return request({
    url: `/relative/${id}/access`,
    method: 'get'
  })
}

// 获得下拉列表的数据
export function getlist() {
  return request({
    url: '/relative/selectList',
    method: 'get'
  })
}

// 添加数据
export function create(data) {
  return request({
    url: '/relative/create',
    method: 'post',
    data
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/relative/update',
    method: 'put',
    data
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/relative/delete',
    method: 'delete',
    data: data
  })
}
