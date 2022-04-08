import {action, computed, observable} from 'mobx'
import Taro from '@tarojs/taro'
import { createPayOrder } from '../utils/https'


export interface PhotoInfo {
  id: string,
  title: string,
  img?: string,
  desc?: Array<string>,
  bg_color?: Array<string>
}

export interface PreviewInfo {
  preview: Record<string, string>,
  price: number,
  option_service: number,
  job_id: string
}

export interface PhotoDetailType {
  'example_show': {
    img: string,
    icon: string,
    desc: Array<string>
  },
  'title': string,
  'desc': Array<string>,
  'bg_color': Array<string>,
  'ele_price': number,
  'ele_opt_price': number,
  'obj_price': number,
  'obj_opt_price': number,
}

export interface Order {
  type: number,
  price: number,
  opt_price: number
}
export interface CustomSize {
  isCustom: boolean
  unit: string,
  width: string,
  height: string
}

export class Photo {
  @observable photoPath: string
  @observable size: string
  @observable hotkey: string
  /* 首页或者搜索结果页选中的photo 类型 */
  @observable photoInfo: PhotoInfo
  /* 处理完用于预览 */
  @observable previewInfo: PreviewInfo

  @observable photoDetail: PhotoDetailType

  @observable order: Order

  @observable payResult: boolean = true

  @observable customSize: CustomSize = {
    isCustom: false,
    unit: 'mm',
    width: '',
    height: ''
  }

  // @computed get name () {
  //   if (this.name) {}
  //   return this.name + '这是一个fullname'
  // }

  @action setPhotoPath (path: string) {
    this.photoPath = path
  }

  @action setHotKey (key: string) {
    this.hotkey = key
  }

  @action setPhotoInfo (obj: PhotoInfo) {
    this.photoInfo = obj
  }

  @action setPreviewInfo (obj: PreviewInfo) {
    this.previewInfo = obj
  }

  @action setPhotoDetail (obj: PhotoDetailType) {
    this.photoDetail = obj
    this.order = {
      type: 1,
      price: obj.ele_price,
      opt_price: obj.ele_opt_price
    }
  }

  @action setCustomSize (key, value: string | boolean) {
    console.log(key, value)
    this.customSize[key] = value
  }

  // 设置订单类型 1->电子照  2->冲印包邮到家
  @action setOrderType (type: number) {
    if (type === 1) {
      this.order = {
        type,
        price: this.photoDetail.ele_price,
        opt_price: this.photoDetail.ele_opt_price
      }
    } else {
      this.order = {
        type,
        price: this.photoDetail.obj_price,
        opt_price: this.photoDetail.obj_opt_price
      }
    }
  }

  // 发起支付
  @action requestPayment (params) {
    createPayOrder(params).then(payInfo => {
      console.log("payInfo", payInfo)
      if (payInfo.result === -1) {
        console.log(payInfo.reason)
        return
      }
      Taro.requestPayment({
        timeStamp: payInfo.timeStamp,
        nonceStr: payInfo.nonceStr,
        package: payInfo.package,
        signType: payInfo.signType,
        paySign: payInfo.paySign,
        success: (res) => {
          console.log('paySuccess', res)
          this.payResult = true
          Taro.switchTab({
            url: 'pages/payResult/payResult'
          })
        },
        fail: (res) => {
          console.log('payError', res)
          this.payResult = false
          Taro.switchTab({
            url: 'pages/payResult/payResult'
          })
        }
      })
    })
  }
  
}

export default new Photo()