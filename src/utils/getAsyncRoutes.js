export default (userInfo) => {
  const asyncRoutes = []
  // 自行根据userInfo加载异步路由 ...

  const noFountPage = { path: '*', redirect: '/404', hidden: true }
  asyncRoutes.push(noFountPage)

  // 处理完毕后返回即可
  return asyncRoutes
}
