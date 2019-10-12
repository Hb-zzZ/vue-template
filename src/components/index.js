// 自动导出局部组件  引用方式 import { xxx } form '@/components'

const req = require.context('./_regional', true, /index\.vue$/)
const requireAll = (requireContext) => {
  const files = requireContext.keys()
  let fileName

  return files.map((file, index, arr) => {
    file.replace(/\/([a-zA-Z1-9]*)\//i, function(all, name) {
      fileName = name
      return name
    })
    const requireApi = requireContext(file, index, arr)
    exports[fileName] = requireApi.default || requireApi
    return requireApi
  })
}
requireAll(req)
