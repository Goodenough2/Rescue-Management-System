import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/function/list',
    method: 'post',
    data: {
      page: { current: page.current, size: page.size },
      sort: { property: sort.prop, direction: sort.order },
      query: { ...query }
    }
  })
}

// 根据id获取数据
export function get(id) {
  return request({
    url: `/function/${id}/detail`,
    method: 'get'
  })
}

// 获得下拉列表的数据
export function getlist() {
  return request({
    url: '/function/selectlist',
    method: 'get'
  })
}

// 添加数据
export function create(data) {
  return request({
    url: '/function/create',
    method: 'post',
    data
  })
}

// 排序上移
export function rankup(id) {
  return request({
    url: `/function/${id}/rankup`,
    method: 'patch'
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/function/update',
    method: 'put',
    data
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/function/delete',
    method: 'delete',
    data: data
  })
}
