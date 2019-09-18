import common from '@/utils/common'
// 自动导出modules的 api，导出格式为一个对象，键值为文件名
// 支持嵌套文件夹 例如modules下 文件路径问 test/a/api.js  api里有一函数为b 则调用为 test.a.api.b()
const importResult = {}

const req = require.context('./modules', true, /\.js$/)
const requireAll = (requireContext) => {
  const files = requireContext.keys()
  let fileName

  return files.map((file, index, arr) => {
    file.replace(/\/([/a-zA-Z1-9]*)\.js$/i, function(all, name) {
      fileName = name.replace(/\//g, '.')
      return name
    })
    const requireApi = requireContext(file, index, arr)
    common.lodash.set(importResult, fileName, requireApi)
    return requireApi
  })
}
requireAll(req)
export default importResult
