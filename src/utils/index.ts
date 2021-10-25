import Taro from '@tarojs/taro'

export function getMenuButtonBoundingClientRect() {
  const rest = Taro.getMenuButtonBoundingClientRect()
  return rest
}

export function debounce (fn: Function, delay: number) {
  let timer = 0
  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = setTimeout(fn, delay)
    } else {
      timer = setTimeout(fn, delay)
    }
  }
}
