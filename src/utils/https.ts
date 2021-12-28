import Taro from '@tarojs/taro'
import request from './request'
import mockData from './mock'

const baseUrl = 'https://api.itso123.com/v2/wxmp/'

const urls:Record<string, string> = {
  homeGetData: baseUrl + 'home/get_data',
  getHotKeys: baseUrl + 'search/get_hotkeys',
  searchGoods: baseUrl + 'photos/search_goods',
  getPhotoDetail: baseUrl + 'photos/get_photo_detail',
  photoCreate: baseUrl + 'photos/job_create',
  photoGetData: baseUrl + 'photos/get_data',
  login: baseUrl + 'weixin/login',
  createPayOrder: baseUrl + 'photos/pay_order_create',
  getRegionAddress: baseUrl + 'me/get_address_pcarea',
  getMyData: baseUrl + 'me/get_data',
  getCooperation: baseUrl + 'me/get_cooperation_contact',
  normalQuestion: baseUrl + 'me/get_normal_question',
  getMyBalance: baseUrl + 'me/get_goods_detail',
  getMyAddress: baseUrl + 'me/get_my_address',
  pointsRecord: baseUrl + 'me/get_points_detail',
  queryOrders: baseUrl + 'me/query_pay_order',
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

export const createPayOrder = (data) => {
  const option = {
    url: urls.createPayOrder,
    post: true
  }
  return checkMock(option, data, 'createPayOrder')
}

export const getRegionAddress = (data) => {
  const option = {
    url: urls.getRegionAddress,
    post: true
  }
  return checkMock(option, data, 'getRegionAddress')
}

export const getMyData = (data) => {
  const option = {
    url: urls.getMyData,
    post: true
  }
  return checkMock(option, data, 'getMyData')
}

/** 渠道合作
 * 
 * @param data 
 * @returns 
 */
export const getCooperation = (data) => {
  const option = {
    url: urls.getCooperation,
    post: true
  }
  return checkMock(option, data, 'getCooperation')
}

/** 常见问题
 * 
 * @param data 
 * @returns 
 */
export const normalQuestion = (data) => {
  const option = {
    url: urls.normalQuestion,
    post: true
  }
  return checkMock(option, data, 'normalQuestion')
}

/** 我的优惠券
 * 
 * @param data 
 * @returns 
 */
export const getMyBalance = (data) => {
  const option = {
    url: urls.getMyBalance,
    post: true
  }
  return checkMock(option, data, 'getMyBalance')
}

/** 我的收货地址
 * 
 * @param data 
 * @returns 
 */
export const getMyAddress = (data) => {
  const option = {
    url: urls.getMyAddress,
    post: true
  }
  return checkMock(option, data, 'getMyAddress')
}

/** 积分记录
 * 
 * @param data 
 * @returns 
 */
export const pointsRecord = (data) => {
  const option = {
    url: urls.pointsRecord,
    post: true
  }
  return checkMock(option, data, 'pointsRecord')
}

/** 订单查询
 * 
 * @param data 
 * @returns 
 */
export const queryOrders = (data) => {
  const option = {
    url: urls.queryOrders,
    post: true
  }
  return checkMock(option, data, 'queryOrders')
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
