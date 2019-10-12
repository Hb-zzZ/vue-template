import Vue from 'vue'

// 单独注册定制表格
import './ElCustomTable/registerGlobal'

// 自动注册全局组件 例:global文件夹下有一个组件IconTitle  则引用<icon-title />
const req = require.context('./_global', true, /index\.vue$/)
const requireAll = (requireContext) => {
  const files = requireContext.keys()
  let fileName

  return files.map((file, index, arr) => {
    file.replace(/\/([a-zA-Z1-9]*)\//i, function(all, name) {
      fileName = name
      return name
    })
    const requireApi = requireContext(file, index, arr)

    const matchResult = fileName.match(/[A-Z][a-z]*/g)
    const componentName = matchResult
      .map((result) => {
        return result.toLowerCase()
      })
      .join('-')
    // 注册全局组件
    Vue.component(componentName, requireApi.default || requireApi)

    return requireApi
  })
}
requireAll(req)
