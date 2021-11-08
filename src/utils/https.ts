import Taro from '@tarojs/taro'
import request from './request'
import mockData from './mock'

const baseUrl = 'https://api.itso123.com/v2/wxmp/'

const urls:Record<string, string> = {
  homeGetData: baseUrl + 'home/get_data',
  getHotKeys: baseUrl + 'home/get_hotkeys',
  searchGoods: baseUrl + 'photos/search_goods',
  getPhotoDetail: baseUrl + 'photos/get_photo_detail',
  photoCreate: baseUrl + 'photos/job_create',
  photoGetData: baseUrl + 'photos/get_data',

}

export const homeGetData = (options) => {
  options.url = urls.homeGetData
  return checkMock(options, 'homeGetData')
}

export const getHotKeys = (options) => {
  options.url = urls.getHotKeys
  return checkMock(options, 'getHotKeys')
}

export const searchGoods = (options) => {
  options.url = urls.searchGoods
  return checkMock(options, 'searchGoods')
}

export const getPhotoDetail = (options) => {
  options.url = urls.getPhotoDetail
  return checkMock(options, 'getPhotoDetail')
}

export const photoGetData = (options) => {
  options.url = urls.photoGetData
  return checkMock(options, 'photoGetData')
}

interface uploadOption {
  path: string,
  data: Record<string, unknown>
}

export const upload = function (uploadOption: uploadOption) {
  return new Promise((resolve, reject) => {
    // Taro.uploadFile({
    //   url: urls.photoCreate,
    //   filePath: uploadOption.path,
    //   name: 'img_data',
    //   formData: uploadOption.data,
    //   success: (res) => {
    //     resolve(res)
    //   },
    //   fail: (err) => {
    //     reject(err)
    //   }
    // })
    setTimeout(() => {
      resolve(mockData['jobCreate'])
    }, 200)
  })
}


function checkMock (options, type) {
  console.log('process.env.needMock', process.env.needMock)
  if (process.env.needMock) {
    return Promise.resolve(mockData[type])
  } else {
    return request(options)
  }
}
