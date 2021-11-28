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
  login: baseUrl + 'weixin/login'
}

export const homeGetData = (data) => {
  const option = {
    url: urls.homeGetData
  }
  return checkMock(option, data, 'homeGetData')
}

export const getHotKeys = (data) => {
  const option = {
    url: urls.getHotKeys
  }
  return checkMock(option, data, 'getHotKeys')
}

export const searchGoods = (data) => {
  const option = {
    url: urls.searchGoods
  }
  return checkMock(option, data, 'searchGoods')
}

export const getPhotoDetail = (data) => {
  const option = {
    url: urls.getPhotoDetail,
    post: true
  }
  return checkMock(option, data, 'getPhotoDetail')
}

export const photoGetData = (data) => {
  const option = {
    url: urls.photoGetData
  }
  return checkMock(option, data, 'photoGetData')
}

export const login = (data) => {
  const option = {
    url: urls.login,
    header: {
      'Content-Type': 'text'
    }
  }
  return checkMock(option, data, 'login')
}

interface uploadOption {
  path: string,
  data: Record<string, unknown>
}

export const upload = function (uploadOption: uploadOption) {
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: urls.photoCreate,
      filePath: uploadOption.path,
      name: 'img_data',
      formData: uploadOption.data,
      success: (res) => {
        resolve(JSON.parse(res.data))
      },
      fail: (err) => {
        reject(err)
      }
    })
    // setTimeout(() => {
    //   resolve(mockData['jobCreate'])
    // }, 200)
  })
}


function checkMock (option, data, type) {
  console.log('process.env.needMock', process.env.needMock)
  if (process.env.needMock) {
    return Promise.resolve(mockData[type])
  } else {
    return request(option, data)
  }
}
