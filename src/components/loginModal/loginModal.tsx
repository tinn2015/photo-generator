import { Component } from 'react'
import { inject } from 'mobx-react/'
import Taro from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import {User} from '../../store/user'
import { login } from '../../utils/https'

import './loginModal.scss';

interface LoginModal {
  state: {
    weChatLogo: string,
    isOpened: boolean,
    canIUseGetUserProfile: boolean
  }
  props: {
    userStore: User
  }
}

@inject('userStore')
class LoginModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      weChatLogo: require('../../assets/wechat.png'),
      isOpened: false,
      canIUseGetUserProfile: false
    }
  }

  componentDidMount () {
    Taro.checkSession({
      success: () => {
        this.props.userStore.getUserInfoFromStorage()
        this.setState({
          isOpened: false
        })
      },
      fail: () => {
        this.setState({
          isOpened: true
        })
      }
    })
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
        const userInfo = res.userInfo
        this.props.userStore.setUserInfo(userInfo)
      }
    })
  }

  getUserInfoProfile = () => {
    Taro.login({
      success: (res) => {
        console.log('login', res)
        login({code: res.code}).then(loginRes => {
          console.log('登录成功', loginRes)
          this.props.userStore.setUserInfo({openId: loginRes.openid})
        })
      }
    })
    Taro.getUserProfile({
      desc: '完善会员资料',
      success: (res) => {
        console.log(res)
        const userInfo = res.userInfo
        this.props.userStore.setUserInfo(userInfo)
        this.setState({
          isOpened: false
        })
      }
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