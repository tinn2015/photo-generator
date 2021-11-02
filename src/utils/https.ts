import request from './request'
import mockData from './mock'

const baseUrl = '/'

const urls:Record<string, string> = {
  homeGetData: baseUrl + 'home/get_data'
}

export const homeGetData = (options) => {
  options.url = urls.homeGetData
  return checkMock(options, 'homeGetData')
}

function checkMock (options, type) {
  if (process.env.needMock) {
    return Promise.resolve(mockData[type])
  } else {
    return request(options)
  }
}
