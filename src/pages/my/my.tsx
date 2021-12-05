import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import LoginModal from '../../components/loginModal/loginModal'
import { User } from '../../store//user'

import './my.scss'

interface My {
  props: {
    userStore: User
  }
}

@inject('userStore')
@observer
class My extends Component {
  constructor (props) {
    super(props)
    this.state = {
      payment: require('../../assets/my/payment-active.png'),
      orders: require('../../assets/my/orders-active.png'),
    }
  }

  routerToCooperation = () => {
    Taro.navigateTo({
      url: '/pages/channelCooperation/channelCooperation'
    })
  }

  routerToProblems = () => {
    Taro.navigateTo({
      url: '/pages/problems/problems'
    })
  }

  render () {
    const paymentIcon = this.state.payment
    const ordersIcon = this.state.orders
    const { userStore } = this.props
    const { userInfo = {
      avatarUrl: '',
      nickName: ''
    } } = userStore
    console.log('my userStore', userStore)
    return (
      <View className='my-container flex fd-c fs-c jc-sb'>
        <View className='my-top-header w-100 flex ai-c'>
          {/* <View className='my-avatar'></View> */}
          <Image className='my-avatar' src={userInfo.avatarUrl} />
          <View className='my-label c-333'>{userInfo.nickName}</View>
        </View>
        <View className='my-content w-100'>
          <View className='my-state bg-fff card flex jc-ad ai-c'>
            <View className='state-item flex fd-c jc-c ai-c'>
              <View className='num'>¥20</View>
              <View className='label ft20 c-333'>余额</View>
            </View>
            <View className='state-item flex fd-c jc-c ai-c'>
              <View className='num'>¥20</View>
              <View className='label flex ft20 c-333'>优惠券（张）</View>
            </View>
            <View className='state-item flex fd-c jc-c ai-c'>
              <View className='num'>¥20</View>
              <View className='label ft20 c-333'>积分</View>
            </View>
          </View>
          <View className='my-orders bg-fff card'>
            <View className='orders-title'>我的订单</View>
            <View className='orders flex jc-ad ai-c'>
              <View className='flex fd-c jc-c ai-c'>
                <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={paymentIcon} /></View>
                <View className='label ft20 c-333'>待支付</View>
              </View>
              <View className='flex fd-c jc-c ai-c'>
                <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={paymentIcon} /></View>
                <View className='label ft20 c-333'>待支付</View>
              </View>
              <View className='flex fd-c jc-c ai-c'>
              <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={ordersIcon} /></View>
                <View className='label ft20 c-333'>待支付</View>
              </View>
            </View>
          </View>
          <View className='other-services bg-fff card'>
            <View className='services-title'>其他服务</View>
            <View className='services flex jc-ad ai-c'>
              <View className='flex fd-c jc-c ai-c'>
                <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={paymentIcon} /></View>
                <View className='label ft20 c-333'>我的优惠券</View>
              </View>
              <View className='flex fd-c jc-c ai-c' onClick={this.routerToProblems}>
                <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={paymentIcon} /></View>
                <View className='label ft20 c-333'>常见问题</View>
              </View>
              <View className='flex fd-c jc-c ai-c' onClick={this.routerToCooperation}>
              <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={ordersIcon} /></View>
                <View className='label ft20 c-333'>渠道合作</View>
              </View>
            </View>
          </View>
        </View>
        <LoginModal userStore={userStore}></LoginModal>
      </View>
    )
  }
}

export default My