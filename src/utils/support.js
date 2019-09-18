// 检测当前浏览器是否支持，暂时先检测flex
export function canSupportCss(detection = ['msFlex', 'mozFlex', 'webkitFlex', 'flex', 'webkitBox', 'msFlexbox']) {
  const styleCollection = document.documentElement.style

  for (const flexAttr of detection) {
    if (flexAttr in styleCollection) {
      return true
    }
  }

  return false
}
