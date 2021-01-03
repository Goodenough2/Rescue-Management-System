/* 系统管理路由 */

import Layout from '@/layout'

export default {
  path: '/system-manage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'SystemManage',
  meta: {
    title: '系统管理',
    icon: 'system'
  },
  children: [
    {
      path: 'password',
      component: () => import('@/views/system-manage/password'),
      name: 'Password',
      meta: { title: '密码修改' }
    },
    // {
    //   path: 'function',
    //   component: () => import('@/views/system-manage/function'),
    //   name: 'Function',
    //   meta: { title: '系统功能' }
    // },
    {
      path: 'role',
      component: () => import('@/views/system-manage/role'),
      name: 'Role',
      meta: { title: '角色管理' }
    },
    {
      path: 'Account',
      component: () => import('@/views/system-manage/account'),
      name: 'Account',
      meta: { title: '用户管理' }
    }
  ]
}
