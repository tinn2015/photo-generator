import {action, computed, observable} from 'mobx'
import { createPayOrder } from '../utils/https'


export interface PhotoInfo {
  id: string,
  title: string,
  img: string,
  desc: Array<string>,
  bg_color: Array<string>
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
  @action requestPayment () {
    createPayOrder({
      job_id: this.previewInfo.job_id
    }).then(payInfo => {
      Taro.requestPayment({
        timeStamp: '',
        nonceStr: '',
        package: payInfo.prepay_id,
        signType: 'MD5',
        paySign: '',
        success: (res) => {
          console.log('paySuccess', res)
        },
        fail: (res) => {
          console.log('payError', res)
        }
      })
    })
  }
  
}

export default new Photo()