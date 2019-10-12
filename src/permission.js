import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import getRoutes from '@/utils/getRoutes'
import { canSupportCss } from '@/utils/support'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 检测浏览器是否支持
  if (!canSupportCss()) {
    if (from.name === 'NoSupport') {
      next(false)
      NProgress.done()
      return
    }
    if (to.name !== 'NoSupport') {
      next({ name: 'NoSupport' })
      return
    }
  }

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const { isLogin, isFirstLogin } = store.getters

      if (isLogin) {
        if (!isFirstLogin) {
          next()
        } else {
          // 第一次登陆
          await store.dispatch('user/resetIsFirstLogin')
          next()
        }
      } else {
        try {
          // get user info
          store.dispatch('user/getInfo').then(() => {
            const asyncTables = getRoutes()

            store.dispatch('user/addRoutes', asyncTables).then(() => {
              router.addRoutes(asyncTables) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || '登录错误')
          // next(`/login?redirect=${to.path}`)
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    const unRequiredLogin = (to.meta && to.meta.unRequiredLogin) || false

    if (unRequiredLogin) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
