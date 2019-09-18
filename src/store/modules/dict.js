import dictState from '@/static/dictState'
import fetch from '@/api'

let optimizeId = 0

class Optimize {
  constructor() {
    this.needDict = []
    this.isChange = false
    this.isFetching = false
    this.responseData = null
    this.isOver = false
  }

  async request() {
    if (this.needDict.length > 0) {
      return fetch.misc.getDict(this.needDict).then((response) => {
        const { body: data } = response

        for (const type in data) {
          data[type] = data[type].dictValueDto
        }

        this.responseData = data
        return 'over'
      })
    } else {
      this.responseData = []
      return 'over'
    }
  }

  inquire(exTypeArr) {
    if (this.isOver) {
      // const newOptimize = new Optimize(optimizeId)
      // newOptimize.inquire(exTypeArr)
      return 'over'
    } else {
      this.isChange = true
      this.needDict = [...this.needDict, ...exTypeArr]
      return this
    }
  }

  async canRequest(callback) {
    if (this.isFetching || this.isChange) {
      this.isChange = false
      await setTimeout(() => {
        return this.canRequest(callback)
      }, 200)
    } else {
      if (this.responseData) {
        const temp = this.responseData
        return callback(temp)
      } else {
        this.isOver = true
        this.isFetching = true
        this.needDict = [...new Set(this.needDict)] // 去除重复数据
        this.needDict = this.needDict.filter((item) => item) // 去除空数组

        return this.request().then(() => {
          callback(this.responseData)
          this.isFetching = false
        })
      }
    }
  }
}

const optimize = {
  [optimizeId]: new Optimize()
}

const state = dictState

const mutations = {
  SET_DICT: (state, valueObj = {}) => {
    for (const type in valueObj) {
      state[type] = valueObj[type]
    }
  },
  SET_AREA: (
    state,
    data = {
      type,
      parentCode,
      callbackData
    }
  ) => {
    const { parentCode, type, callbackData } = data
    if (type === 'province') {
      state[type] = callbackData
    } else {
      if (!state[type]) {
        state[type] = {}
      }
      state[type][parentCode] = callbackData
    }
  }
}

const actions = {
  // 获取选项
  getDict({ commit, state }, typeArr = []) {
    return new Promise(async(resolve) => {
      const exTypeArr = []
      let callbackData = {}

      typeArr.forEach((type) => {
        const value = state[type]
        if (value) {
          callbackData[type] = value
        } else {
          exTypeArr.push(type)
        }
      })

      if (exTypeArr.length > 0) {
        // 缺少type数据时候请求并缓存
        const callback = (response) => {
          callbackData = {
            ...callbackData,
            ...response
          }
          commit('SET_DICT', response)

          resolve(callbackData)
        }

        const checkOver = () => {
          const currentOptimize = optimize[optimizeId].inquire(exTypeArr)

          if (currentOptimize === 'over') {
            optimizeId += 1
            optimize[optimizeId] = new Optimize()
            checkOver()
          } else {
            currentOptimize.canRequest(callback)
          }
        }

        checkOver()
      } else {
        resolve(callbackData)
      }
    })
  },
  getArea(
    { commit, state },
    data = {
      parentCode: null,
      type: 'province'
    }
  ) {
    return new Promise(async(resolve) => {
      const { parentCode, type } = data
      let needFetch = false
      let callbackData = []

      if (type === 'province') {
        callbackData = state[type]
      } else {
        const typeStore = state[type]
        callbackData = typeStore[parentCode]
      }

      if (!callbackData || (type === 'province' && callbackData.length === 0)) {
        needFetch = true
      }
      if (needFetch) {
        await fetch.misc.getArea(data).then((response) => {
          callbackData = response.body.data.list
          commit('SET_AREA', {
            ...data,
            callbackData
          })
        })
      }
      resolve(callbackData)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
