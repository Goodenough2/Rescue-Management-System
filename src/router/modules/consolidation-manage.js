/* 系统管理路由 */

import Layout from '@/layout'

export default {
  path: '/consolidation-manage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ConsolidationManage',
  meta: {
    title: '盘整管理',
    icon: 'table'
  },
  children: [
    {
      path: 'consolidation',
      component: () => import('@/views/consolidation-manage/consolidation'),
      name: 'Consolidation',
      meta: { title: '货物盘整' }
    },
    {
      path: 'audit',
      component: () => import('@/views/consolidation-manage/audit'),
      name: 'Audit',
      meta: { title: '货物审批' }
    }
  ]
}
