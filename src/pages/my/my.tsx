import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Taro from '@tarojs/taro'
import { AtBadge } from 'taro-ui'
import { getMyData } from '@/https'
import { View, Image, Button } from '@tarojs/components'
import LoginModal from '../../components/loginModal/loginModal'
import { User } from '../../store/user'

import './my.scss'

interface My {
  state: {
    // 余额
    balance: number,
    // 优惠券
    couponCount: number,
    // 积分
    points: number,
    // 待支付
    toBePaid: number
  }
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
      balance: 0,
      couponCount: 0,
      points: 0,
      toBePaid: 0
    }
  }

  componentDidMount () {
    this.getMyData()
  }

  getMyData = () => {
    const { openId } = this.props.userStore.userInfo
    getMyData({openid: openId}).then(data => {
      console.log('myData', data)
      this.setState({
        balance: data.goods.amount,
        couponCount: data.goods.count,
        points: data.points.amount,
        toBePaid: data.to_be_paid.count
      })
    })
  }

  routerToCooperation = () => {
    Taro.navigateTo({
      url: '/pages/mySubPages/channelCooperation/channelCooperation'
    })
  }

  routerToProblems = () => {
    Taro.navigateTo({
      url: '/pages/mySubPages/problems/problems'
    })
  }
  
  routerToMyBalance = () => {
    Taro.navigateTo({
      url: '/pages/mySubPages/myBalance/myBalance'
    })
  }

  routerToAddress = () => {
    Taro.navigateTo({
      url: '/pages/mySubPages/address/address'
    })
  }

  routerToPointRecord = () => {
    Taro.navigateTo({
      url: '/pages/mySubPages/pointsRecord/pointsRecord'
    })
  }

  render () {
    const paymentIcon = this.state.payment
    const { balance, couponCount, points, toBePaid } = this.state
    const ordersIcon = this.state.orders
    const { userStore } = this.props
    const { userInfo = {
      avatarUrl: '',
      nickName: ''
    } } = userStore
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
              <View className='num ft30'>¥{balance}</View>
              <View className='label ft20 c-333'>余额</View>
            </View>
            <View className='state-item flex fd-c jc-c ai-c'>
              <View className='num ft30'>{couponCount}</View>
              <View className='label ft20 c-333 text-center'>优惠券（张）</View>
            </View>
            <View className='state-item flex fd-c jc-c ai-c'>
              <View className='num ft30'>{points}</View>
              <View className='label ft20 c-333'>积分</View>
            </View>
          </View>
          <View className='my-orders bg-fff card'>
            <View className='orders-title'>我的订单</View>
            <View className='orders flex jc-ad ai-c'>
              <AtBadge value={toBePaid || undefined} maxValue={99}>
                <View className='flex fd-c jc-c ai-c'>
                  <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={paymentIcon} /></View>
                  <View className='label ft20 c-333'>待支付</View>
                </View>
              </AtBadge>
              <AtBadge value={toBePaid || undefined} maxValue={99}>
                <View className='flex fd-c jc-c ai-c'>
                  <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={ordersIcon} /></View>
                  <View className='label ft20 c-333'>全部订单</View>
                </View>
              </AtBadge>
            </View>
          </View>
          <View className='other-services bg-fff card'>
            <View className='services-title'>其他服务</View>
            <View className='services flex jc-ad ai-c'>
              <View className='flex fd-c jc-c ai-c' onClick={this.routerToMyBalance}>
                <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={paymentIcon} /></View>
                <View className='label ft20 c-333'>我的优惠券</View>
              </View>
              <View className='flex fd-c jc-c ai-c' onClick={this.routerToPointRecord}>
                <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={paymentIcon} /></View>
                <View className='label ft20 c-333'>积分记录</View>
              </View>
              <View className='flex fd-c jc-c ai-c' onClick={this.routerToCooperation}>
                <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={ordersIcon} /></View>
                <View className='label ft20 c-333'>渠道合作</View>
              </View>
            </View>
            <View className='services mt20 flex jc-ad ai-c'>
              <View className='flex fd-c jc-c ai-c' onClick={this.routerToAddress}>
                <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={paymentIcon} /></View>
                <View className='label ft20 c-333'>收货地址</View>
              </View>
              <View className='flex fd-c jc-c ai-c' onClick={this.routerToProblems}>
                <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={paymentIcon} /></View>
                <View className='label ft20 c-333'>常见问题</View>
              </View>
              <Button openType='contact' className='open-contact flex fd-c jc-c ai-c' onClick={this.feedBack}>
                <View className='icon flex jc-c ai-c'><Image className='icon' mode='scaleToFill' src={paymentIcon} /></View>
                <View className='label ft20 c-333'>意见反馈</View>
              </Button>
            </View>
          </View>
        </View>
        <LoginModal userStore={userStore}></LoginModal>
      </View>
    )
  }
}

export default My