import Taro from '@tarojs/taro'

export function getMenuButtonBoundingClientRect() {
  const rest = Taro.getMenuButtonBoundingClientRect()
  return rest
}