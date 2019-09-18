import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import defaultSettings from '@/settings'
import optimizeRequest from './optimizeRequest'

const downloadFile = (res) => {
  if (res.data.type === 'application/json') {
    Message({
      message: res.msg || '下载出错，请重试',
      type: 'error',
      duration: 5 * 1000
    })
  } else {
    const fileNameInfo = decodeURI(res.headers['content-disposition']) || 'filename=下载文件.xlsx'
    let fileName
    fileNameInfo.replace(/filename=(.*?)$/, (a, name) => {
      fileName = name.replace(/[\"\']/g, '')
    })

    const blob = new Blob([res.data])
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName)
    } else {
      const link = document.createElement('a')
      const evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', false, false)
      link.href = URL.createObjectURL(blob)
      link.download = fileName
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(link.href)
    }
  }
}

// create an axios instance
const service = axios.create({
  baseURL: defaultSettings.http, // url = base url + request url
  timeout: 10000, // request timeout
  headers: {
    common: {
      'Cache-Control': 'no-cache'
    },
    get: {
      'If-Modified-Since': '0'
    }
  } // 去缓存
})

const CancelToken = axios.CancelToken

// request interceptor
service.interceptors.request.use(
  (config) => {
    // 每个创建cancel 函数
    config.cancelToken = new CancelToken(function executor(c) {
      config.cancel = c
    })
    optimizeRequest.replaceRequest(config)

    if (config.type === 'download') {
      config['responseType'] = 'blob'
    }
    // do something before request is sent
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    optimizeRequest.fetchedRequest(response.config)

    if (response.config.type === 'download') {
      downloadFile(response)
      return response
    }

    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    const code = Number(res.code)

    if (code !== 200) {
      Message({
        message: res.msg || '后台请求错误',
        type: 'error',
        duration: 5 * 1000
      })
      // 没有权限登录code
      if ([30001, 30002].includes(code)) {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }
      return Promise.reject(new Error(res.msg || '后台请求错误'))
    } else {
      return res
    }
  },
  (error) => {
    const config = error.config
    if (config) {
      optimizeRequest.fetchedRequest(error.config)
    }

    if (error.response) {
      // 请求返回的错误
      const errorInfo = error.response.data

      const code = Number(errorInfo.code)

      if ([30001, 30002].includes(code)) {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }
      Message({
        message: errorInfo.msg || '后台请求错误',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      if (!error.message || !error.message.isCancel) {
        // 不属于主动取消的错误，一般为超时
        Message({
          message: '请求超时，请稍后重试!',
          type: 'error',
          duration: 5 * 1000
        })
      }
    }

    return Promise.reject(error)
  }
)

export default service
