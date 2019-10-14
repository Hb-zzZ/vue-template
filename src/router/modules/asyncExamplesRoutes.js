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
          title: '自制步骤条',
          icon: 'menu'
        }
      }
    ]
  }
]
