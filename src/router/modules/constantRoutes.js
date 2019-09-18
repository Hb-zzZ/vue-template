import { overallLayout } from '@/layout/index.js'

export default [
  {
    path: '/',
    component: overallLayout,
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: {
          unRequiredLogin: true,
          title: '首页',
          icon: 'home',
          copyright: true,
          activeTab: 'home'
        },
        hidden: true
      },
      {
        path: 'login',
        component: () => import('@/views/login'),
        hidden: true,
        meta: { unRequiredLogin: true, copyright: true, title: '登录' }
      },
      {
        path: '404',
        component: () => import('@/views/error/404'),
        hidden: true,
        meta: { unRequiredLogin: true, copyright: true, title: '404' }
      }
    ]
  },
  {
    path: '/no-support',
    name: 'NoSupport',
    component: () => import('@/views/error/no-support'),
    hidden: true,
    meta: { unRequiredLogin: true, copyright: true, title: '暂不支持' }
  }
]