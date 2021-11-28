import Taro from '@tarojs/taro'

console.log(Taro)

export function getMenuButtonBoundingClientRect() {
  const rest = Taro.getMenuButtonBoundingClientRect()
  return rest
}

export function debounce (fn: Function, delay: number) {
  let timer
  console.log('dddd', timer)
  return function (params?:unknown) {
    if (timer) {
      clearTimeout(timer)
      timer = setTimeout(() => {fn(params)}, delay)
    } else {
      timer = setTimeout(() => {fn(params)}, delay)
    }
  }
}

export function getLoginInfoFromStroage () {
  const openid = Taro.getStorageSync('openid')
  const sessionKey = Taro.getStorageSync('sessionKey')
  return {
    openid,
    sessionKey
  }
}

export function setLoginInfoFromStroage (loginInfo) {
  Taro.setStorage({key: 'loginInfo', data: loginInfo})
}
