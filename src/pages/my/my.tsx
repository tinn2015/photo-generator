import { Component } from 'react'
import { View, Image } from '@tarojs/components'

import './my.scss'

class My extends Component {
  constructor (props) {
    super(props)
    this.state = {
      payment: require('../../assets/my/payment-active.png'),
      orders: require('../../assets/my/orders-active.png'),
    }
  }
  render () {
    const paymentIcon = this.state.payment
    const ordersIcon = this.state.orders
    return (
      <View className='my-container flex fd-c fs-c jc-sb'>
        <View className='my-top-header w-100 flex ai-c'>
          <View className='my-avatar'></View>
          <View className='my-label c-333'>这是昵称</View>
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
              <View className='flex fd-c jc-c ai-c'>
                <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={paymentIcon} /></View>
                <View className='label ft20 c-333'>积分管理</View>
              </View>
              <View className='flex fd-c jc-c ai-c'>
              <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={ordersIcon} /></View>
                <View className='label ft20 c-333'>渠道合作</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default My