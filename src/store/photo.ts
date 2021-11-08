import {action, computed, observable} from 'mobx'


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
  option_service: number
}

export interface PhotoDetailType {
  'example_show': {
    img: string,
    icon: string,
    desc: Array<string>
  },
  'title': string,
  'desc': Array<string>,
  'bg_color': Array<string>
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

  // @computed get fullName () {
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
  }
  
}

export default new Photo()