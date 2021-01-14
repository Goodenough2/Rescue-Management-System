/* 区域管理路由*/

import Layout from '@/layout'

export default {
  path: '/area-manage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'AreaManage',
  meta: {
    title: '区域管理',
    icon: 'tree'
  },
  children: [
    {
      path: 'police-station',
      component: () => import('@/views/area-manage/police-station'),
      name: 'PoliceStation',
      meta: { title: '警察局信息管理' }
    },
    {
      path: 'hospital',
      component: () => import('@/views/area-manage/hospital'),
      name: 'Hospital',
      meta: { title: '医院信息管理' }
    },
    {
      path: 'shelter',
      component: () => import('@/views/area-manage/shelter'),
      name: 'Shelter',
      meta: { title: '收容所信息管理' }
    }
  ]

}
