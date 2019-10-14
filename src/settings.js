const http = 'http://xxx'

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
  sidebarLogo: false,

  /**
   * @type {String}
   * @description 请求基本地址
   */
  http: http,
  /**
   * @type {Number}  ms
   * @description 请求超时时间
   */
  httpTimeout: 10000
}
