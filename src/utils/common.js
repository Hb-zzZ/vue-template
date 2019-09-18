import lodash from 'lodash'

export default {
  lodash,
  // 生成随机标识符
  createSign() {
    const randomPow = 6

    return `${Math.random().toFixed(randomPow) * Math.pow(10, randomPow)}-${new Date().getTime()}`
  },
  // 富文本转义
  escape2Html(str) {
    const arrEntities = {
      '&lt;': '<',
      '&gt;': '>',
      '&nbsp;': ' ',
      '&amp;': '&',
      '&quot;': '"',
      '\n': '<br/>',
      '\\n': '<br/>'
    }
    const newReg = new RegExp(Object.keys(arrEntities).join('|'), 'gi')

    return str.replace(newReg, function(all) {
      return arrEntities[all]
    })
  },
  // 转换为时间戳
  time2timestamp(time) {
    let timestamp = new Date(time).getTime()
    if (!timestamp) {
      timestamp = Date.parse(time.replace('-', '/'))
      // 向下兼容ie换算时间
    }
    return timestamp
  }
}
