/* 走失人员管理路由*/

import Layout from '@/layout'

export default {
  path: '/elderly-manage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ElderlyManage',
  meta: {
    title: '走失人员管理',
    icon: 'peoples'
  },
  children: [
    {
      path: 'elderly-manage',
      component: () => import('@/views/elderly-manage/elderly'),
      name: 'Elderly',
      meta: { title: '走失人员管理' }
    },
    {
      path: 'relative-manage',
      component: () => import('@/views/elderly-manage/relative'),
      name: 'Relative',
      meta: { title: '亲属管理' }
    }
  ]

}
