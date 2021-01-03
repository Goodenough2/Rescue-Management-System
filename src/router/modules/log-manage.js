/* 货物管理路由*/

import Layout from '@/layout'

export default {
  path: '/system-log',
  component: Layout,
  redirect: 'noRedirect',
  name: 'SystemLog',
  meta: {
    title: '日志记录',
    icon: 'log'
  },
  children: [
    {
      path: 'store-record',
      component: () => import('@/views/log-manage/store-record'),
      name: 'StoreRecord',
      meta: { title: '系统日志' }
    }
  ]

}
