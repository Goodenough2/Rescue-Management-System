import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/storeRecord/list',
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
    url: `/storeRecord/${id}/detail`,
    method: 'get'
  })
}

// 导出Excel
export function exportExcel(query, page, sort) {
  return request({
    url: '/storeRecord/export',
    method: 'post',
    responseType: 'blob',
    data: {
      page: { current: page.current, size: page.size },
      sort: { property: sort.prop, direction: sort.order },
      query: { ...query }
    }
  })
}
