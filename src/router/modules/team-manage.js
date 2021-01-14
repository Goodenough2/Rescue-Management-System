/* 救援队管理路由*/

import Layout from '@/layout'

export default {
  path: '/team-manage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'TeamManage',
  meta: {
    title: '救援队管理',
    icon: 'operate'
  },
  children: [
    {
      path: 'member',
      component: () => import('@/views/team-manage/member'),
      name: 'Member',
      meta: { title: '队员管理' }
    },
    {
      path: 'team',
      component: () => import('@/views/team-manage/team'),
      name: 'Team',
      meta: { title: '团队管理' }
    }
  ]

}
