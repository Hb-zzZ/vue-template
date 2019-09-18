import store from '@/store'
import asyncRoutes from '@/router/modules/asyncRoutes'

const asyncTable = {
  async: asyncRoutes
}

export default () => {
  let asyncRoutes = []
  const role = store.getters.role

  role.forEach((roleName) => {
    const routes = asyncTable[roleName]
    if (routes) {
      asyncRoutes = [...asyncRoutes, ...routes]
    }
  })

  const noFountPage = { path: '*', redirect: '/404', hidden: true }
  asyncRoutes.push(noFountPage)

  return asyncRoutes
}
