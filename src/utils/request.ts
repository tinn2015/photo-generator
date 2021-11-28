import Taro from '@tarojs/taro'

export interface Options {
  url: string,
  post?: boolean,
  data?: unknown,
  header?: {}
}
const request = function (option: Options, data: Options) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: option.url,
      method: option.post ? 'POST' : 'GET',
      header: option.header || {},
      data: data,
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