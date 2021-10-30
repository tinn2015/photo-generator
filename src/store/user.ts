import {action, computed, observable} from 'mobx'
import Taro from '@tarojs/taro'


export class UserStore {
  // @observable setting: Record<string, boolean> | {}
  @observable size: string
  @observable info: Record<string, string> | {}
  
  @action getAuthorize (scope: string, callback: Function) {
    Taro.getSetting({
      success: (res) => {
        const {authSetting} = res
        console.log('auchSetting', authSetting)
        if (!authSetting[scope]) {
          Taro.authorize({
            scope: scope,
            success: () => {
              callback()
            }
          })
        }
      }
    })
  }

  @action getUserInfo () {
    // this.getAuthorize('scope.userInfo', () => {
    //   debugger
    //   Taro.getUserInfo({
    //     success: (res) => {
    //       this.info = res.userInfo
    //     },
    //     fail: (err) => {
    //       console.log(err)
    //     }
    //   })
    // })
    // Taro.getUserInfo({
    //   success: (res) => {
    //     console.log('userInfo', res)
    //     this.info = res.userInfo
    //   },
    //   fail: (err) => {
    //     console.log(err)
    //   }
    // })
    Taro.getUserProfile({
      desc: '用于会员信息',
      success: (res) => {
        console.log('userInfo', res)
      }
    })
  }
}


export default new UserStore()