const getters = {
  // app
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  isLoading: state => state.app.isLoading,
  // user
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  token: state => state.user.token,
  role: state => state.user.role,
  routes: state => state.user.routes,
  userInfo: state => state.user.userInfo,
  isFirstLogin: state => state.user.isFirstLogin,
  isLogin: state => state.user.isLogin
}
export default getters
