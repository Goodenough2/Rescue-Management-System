/* 系统操作路由 */

import Layout from '@/layout'

export default {
  path: '/system-operation',
  component: Layout,
  redirect: 'noRedirect',
  name: 'SystemOperation',
  meta: {
    title: '系统操作',
    icon: 'bussiness'
  },
  children: [
    {
      path: 'informationEntry',
      component: () => import('@/views/system-operation/information-entry'),
      name: 'informationEntry',
      meta: { title: '信息调查表录入' }
    },
    {
      path: 'task-schedule',
      component: () => import('@/views/system-operation/task-schedule'),
      name: 'TaskSchedule',
      meta: { title: '任务调度' }
    }
  ]
}
