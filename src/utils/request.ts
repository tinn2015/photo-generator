import Taro from '@tarojs/taro'

export interface Options {
  url: string
}
const request = function (options: Options) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: options.url,
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export default request