import { normalLayout } from '@/layout'

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
          title: '首页',
          icon: 'menu'
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
