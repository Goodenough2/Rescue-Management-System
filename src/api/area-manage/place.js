// 派出所信息管理api接口
import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/place/list',
    method: 'post',
    data: {
      page: { current: page.current, size: page.size },
      sort: { property: sort.prop, direction: sort.order },
      query: { ...query }
    }
  })
  // const geoData = require('@/static/test/police.json')
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

// 根据当前用户所有权限数据
export function getAllAccess() {
  return request({
    url: '/role/access',
    method: 'get'
  })
}

// 根据当前用户所有权限数据
export function getAccess(id) {
  return request({
    url: `/role/${id}/access`,
    method: 'get'
  })
}

// 获得下拉列表的数据
export function getlist() {
  return request({
    url: '/role/selectList',
    method: 'get'
  })
}

// 添加数据
export function create(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/role/update',
    method: 'put',
    data
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/role/delete',
    method: 'delete',
    data: data
  })
}

// 导出Excel
export function exportExcel(query, page, sort) {
  return request({
    url: '/place/export',
    method: 'post',
    responseType: 'blob',
    data: {
      page: { current: page.current, size: page.size },
      sort: { property: sort.prop, direction: sort.order },
      query: { ...query }
    }
  })
}
