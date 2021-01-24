/* 走失任务管理路由*/

import Layout from '@/layout'

export default {
  path: '/mission-manage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'MissionManage',
  meta: {
    title: '走失任务管理',
    icon: 'guide'
  },
  children: [
    {
      path: 'current',
      component: () => import('@/views/mission-manage/current'),
      name: 'Current',
      meta: { title: '进行中任务管理' }
    },
    {
      path: 'finish',
      component: () => import('@/views/mission-manage/finish'),
      name: 'Finish',
      meta: { title: '已完成任务管理' }
    }
  ]

}
