/* *
autoLoading  是否需要loading
loadingType  loading类型
highFrequency  是否高频 高频时不限制繁忙请求
brevity  是否短暂的 直接出现遮罩，不等请求完成取消

canRequest or replaceRequest 一个实例下只能存在一个
* */

import store from '@/store'
// 默认遮罩
const initType = 'inline'
// 遮罩优先级
const priority = ['dialog', 'overall', 'inline']

export class OptimizeRequest {
  constructor() {
    this.isFetchRequest = []
    this.loadingRequest = []
    this.loadingType = initType
    this.loadingTimer = null
    this.config = {}
  }

  changeRelatedStatus(config = {}) {
    const requestUrl = `${config.method}-${config.url}`
    let isAutoLoading = true
    const { autoLoading, loadingType, brevity } = config

    if (brevity) {
      this.beginLoading(loadingType || initType)
      return
    }

    if (autoLoading === false) {
      isAutoLoading = false
    }

    if (isAutoLoading) {
      const loadingRequestIndex = this.loadingRequest.indexOf(requestUrl)
      if (~loadingRequestIndex) {
        this.loadingRequest.splice(loadingRequestIndex, 1)
      }
      this.loadingRequest.push(requestUrl)

      this.loadingType = loadingType || initType
      this.beginLoading()
    }
  }

  // 只允许一次请求通过
  canRequest(config = {}) {
    const { highFrequency } = config
    const requestUrl = `${config.method}-${config.url}`

    let canRequestFlag = false

    if (highFrequency) {
      canRequestFlag = true
    } else if (~this.isFetchRequest.indexOf(requestUrl)) {
      canRequestFlag = false
    } else {
      this.isFetchRequest.push(requestUrl)
      canRequestFlag = true
    }

    canRequestFlag && this.changeRelatedStatus(config)
    return canRequestFlag
  }

  // 替换之前请求
  replaceRequest(config = {}) {
    const { highFrequency } = config
    const requestUrl = `${config.method}-${config.url}`

    let canRequestFlag = false

    if (highFrequency) {
      canRequestFlag = true
    } else if (~this.isFetchRequest.indexOf(requestUrl)) {
      const cancel = this.config[requestUrl].cancel
      typeof cancel === 'function' && cancel({ isCancel: true })

      this.config[requestUrl] = config
      canRequestFlag = true
    } else {
      this.isFetchRequest.push(requestUrl)
      this.config[requestUrl] = config
      canRequestFlag = true
    }

    canRequestFlag && this.changeRelatedStatus(config)
    return canRequestFlag
  }

  fetchedRequest(config) {
    // 请求结束的请求要特殊处理
    const url = config.url.replace(config.baseURL, '')
    const requestUrl = `${config.method}-${url}`

    const isFetchIndex = this.isFetchRequest.indexOf(requestUrl)
    ~isFetchIndex && this.isFetchRequest.splice(isFetchIndex, 1)
    const loadingIndex = this.loadingRequest.indexOf(requestUrl)
    ~loadingIndex && this.loadingRequest.splice(loadingIndex, 1)

    this.config[requestUrl] && delete this.config[requestUrl]

    this.endLoading()
  }

  beginLoading(customType) {
    const loadingType = customType || this.loadingType
    const { type } = store.getters.isLoading

    const typeIndex = priority.indexOf(type)
    const loadingTypeIndex = priority.indexOf(loadingType)

    if ([typeIndex, loadingTypeIndex].includes(-1)) {
      throw Error`can't found type`
    } else {
      if (loadingTypeIndex <= typeIndex) {
        store.dispatch('app/setLoading', { loading: true, type: loadingType })
      }
    }

    if (customType) {
      // 为了防止外部传来的open一直不关闭
      this.endLoading()
    }
  }

  endLoading() {
    clearTimeout(this.loadingTimer)
    this.loadingTimer = setTimeout(() => {
      if (this.loadingRequest.length === 0) {
        store.dispatch('app/setLoading', {
          loading: false,
          type: priority.slice(-1)[0]
        })
        // 结束时将type优先级归为最低
      }
    }, 360)
  }
}

const optimizeRequest = new OptimizeRequest()
export default optimizeRequest
