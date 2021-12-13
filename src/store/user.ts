import {action, computed, observable} from 'mobx'
import Taro from '@tarojs/taro'

interface UserInfo {
  avatarUrl: string,
  nickName: string,
  openId: string
}

export class User {
  @observable userInfo: UserInfo = {
    avatarUrl: '',
    nickName: '',
    openId: ''
  }
  @action setUserInfo (info) {
    this.userInfo = Object.assign({}, this.userInfo, info)
    Taro.setStorageSync('userInfo', this.userInfo)
  }
  @action getUserInfoFromStorage () {
    this.userInfo = Taro.getStorageSync('userInfo')
  }
}


export default new User()