import { normalLayout } from '@/layout/index.js'

export default [
  {
    path: '/',
    component: normalLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: {
          unRequiredLogin: true,
          title: '首页',
          icon: 'eye',
          activeTab: 'home'
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
    meta: { unRequiredLogin: true, title: '登录' }
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true,
    meta: { unRequiredLogin: true, title: '404' }
  },
  {
    path: '/no-support',
    name: 'NoSupport',
    component: () => import('@/views/error/no-support'),
    hidden: true,
    meta: { unRequiredLogin: true, title: '暂不支持' }
  }
]
