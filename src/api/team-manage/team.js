// 团队管理api接口
import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/group/list',
    method: 'post',
    data: {
      page: { current: page.current, size: page.size },
      sort: { property: sort.prop, direction: sort.order },
      query: { ...query }
    }
  })
  // const geoData = require('@/static/test/team.json')
  // console.log(geoData.data)
  // return geoData
}

// 根据id获取数据
export function get(id) {
  return request({
    url: `/group/${id}/detail`,
    method: 'get'
  })
}
// 根据id获取亲属信息
export function getRelative(id) {
  return request({
    url: `/group/getRelatives/${id}`,
    method: 'get'
  })
}

// 根据id获取图片
export function getPhoto(id) {
  return request({
    url: `/group/getPhotos/${id}`,
    method: 'get'
  })
}

// 获得下拉列表的数据
export function getlist() {
  return request({
    url: '/group/selectList',
    method: 'get'
  })
}

// 添加数据
export function create(data, membersId) {
  return request({
    url: '/group/create',
    method: 'post',
    data: {
      group: data,
      membersId: membersId
    }
  })
}

// 更新数据
export function update(data, membersId) {
  return request({
    url: '/group/update',
    method: 'put',
    data: {
      group: data,
      membersId: membersId
    }
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/group/delete',
    method: 'delete',
    data: data
  })
}
