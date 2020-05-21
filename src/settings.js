const http = 'http://xxx'

const { NODE_ENV, VUE_APP_BASE_API } = process.env

const lastHttp = NODE_ENV === 'development' ? http : VUE_APP_BASE_API
module.exports = {
  title: 'vue-template',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {String}
   * @description 请求基本地址
   */
  http: lastHttp,
  /**
   * @type {Number}  ms
   * @description 请求超时时间
   */
  httpTimeout: 10000
}
