import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import { login } from '../../utils/https'

import './loginModal.scss';

interface LoginModal {
  state: {
    weChatLogo: string,
    isOpened: boolean,
    canIUseGetUserProfile: boolean
  }
}

class LoginModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      weChatLogo: require('../../assets/wechat.png'),
      isOpened: true,
      canIUseGetUserProfile: false
    }
  }

  componentDidMount () {
    // @ts-ignore
    if (Taro.getUserProfile) {
      this.setState({
        canIUseGetUserProfile: true
      })
    }
  }

  getUserInfo = () => {
    Taro.getUserInfo({
      success: (res) => {
        var userInfo = res.userInfo
        this.setStorage('userInfo', userInfo)
      }
    })
  }

  getUserInfoProfile = () => {
    Taro.login({
      success: (res) => {
        console.log('login', res)
        login({code: res.code}).then(loginRes => {
          console.log(loginRes)
        })
      }
    })
    Taro.getUserProfile({
      desc: '完善会员资料',
      success: (res) => {
        console.log(res)
        const userInfo = res.userInfo
        this.setStorage('userInfo', userInfo)
      }
    })
  }

  setStorage = (key, data) => {
    Taro.setStorage({
      key,
      data
    })
  }

  render () {
    const { weChatLogo, isOpened, canIUseGetUserProfile } = this.state
    return (
      <View className='login-modal'>
        <AtModal isOpened={isOpened}>
          <AtModalContent>
            <View className='flex fd-c jc-c'>
              <Image className='logo' src={weChatLogo} />
              <View className='flex jc-c label'>登录后可提供更好服务</View>
              {
                canIUseGetUserProfile 
                ?<Button className='login-btn' type='primary' size='mini' onClick={this.getUserInfoProfile}>立即登录</Button>
                :<Button className='login-btn' type='primary' size='mini' openType='getUserInfo' onGetUserInfo={this.getUserInfo}>立即登录</Button>
              }
            </View>
          </AtModalContent>
        </AtModal>
      </View>
    )
  }
}
export default LoginModal