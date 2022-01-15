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

export function formatTime (t) {
  const time = new Date(t)
  let year: string | number = time.getFullYear()
  let month: string | number = time.getMonth() + 1
  let day: string | number = time.getDate()
  let hour: string | number = time.getHours()
  let minute: string | number = time.getMinutes()
  month = month < 10 ? `0${month}` : month
  day = day < 10 ? `0${day}` : day
  hour = hour < 10 ? `0${hour}` : hour
  minute = minute < 10 ? `0${minute}` : minute
  return `${year}-${month}-${day} ${hour}:${minute}`
}
