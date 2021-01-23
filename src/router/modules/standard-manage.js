/* 走失类型管理路由*/

import Layout from '@/layout'

export default {
  path: '/standard-manage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'StandardManage',
  meta: {
    title: '走失类型管理',
    icon: 'theme'
  },
  children: [
    {
      path: 'standard',
      component: () => import('@/views/standard-manage/standard'),
      name: 'Standard',
      meta: { title: '走失等级管理' }
    },
    {
      path: 'reason',
      component: () => import('@/views/standard-manage/reason'),
      name: 'Reason',
      meta: { title: '走失原因管理' }
    }
  ]

}
