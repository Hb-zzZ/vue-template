import { normalLayout } from '@/layout'

export default [
  {
    path: '/',
    component: normalLayout,
    meta: {
      title: '组件示例',
      icon: 'menu'
    },
    children: [
      {
        path: 'cheap-step',
        name: 'CheapStep',
        component: () => import('@/views/examples/cheap-step'),
        meta: {
          title: 'CheapStep',
          icon: 'menu'
        }
      },
      {
        path: 'el-custom-tooltip',
        name: 'ElCustomTooltip',
        component: () => import('@/views/examples/el-custom-tooltip'),
        meta: {
          title: 'ElCustomTooltip',
          icon: 'menu'
        }
      },
      {
        path: 'image-verification',
        name: 'ImageVerification',
        component: () => import('@/views/examples/image-verification'),
        meta: {
          title: 'ImageVerification',
          icon: 'menu'
        }
      },
      {
        path: 'get-code-button',
        name: 'GetCodeButton',
        component: () => import('@/views/examples/get-code-button'),
        meta: {
          title: 'GetCodeButton',
          icon: 'menu'
        }
      }
    ]
  }
]
