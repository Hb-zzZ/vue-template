import '@babel/polyfill'

import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import '@/styles/element-ui.scss'

import '@/styles/public.scss' // global css
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/components/globalComponents' // global components

import '@/icons' // icon
import '@/permission' // permission control
import $fetch from '@/api' // apis

import $common from '@/utils/common' // common
import messageTip from '@/static/messageTip' // messageTip

import optimizeRequest from '@/utils/optimizeRequest' // 请求优化，loading

import * as customFilters from '@/utils/filters'

Object.keys(customFilters).forEach((item) => Vue.filter(item, customFilters[item])) // 注册过滤器

// set ElementUI lang to EN
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$fetch = $fetch
Vue.prototype.$common = $common
Vue.prototype.$message = ElementUI.Message
Vue.prototype.messageTip = messageTip

Vue.prototype.$loading = {
  open: (type) => {
    optimizeRequest.beginLoading(type)
  }
}

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
