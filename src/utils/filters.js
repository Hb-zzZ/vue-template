// 此为全局过滤器，不要在此放单独过滤器
import common from './common'

// 展示值是否为空 通常用于表格
export const isNillFilter = (val) => {
  return common.lodash.isNil(val) ? '-' : val
}
