import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Taro from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { Photo } from '../../store/photo'

import './payResult.scss'

interface PayResult {
  state: {
  }
  props: {
    photoStore: Photo
  }
}

@inject('photoStore')
@observer
class PayResult extends Component {
  constructor (props) {
    super(props)
    // this.state = {

    // }
  }

  routerToMyOrders = () => {
    console.log('photoStore1111', this.props.photoStore)
    const { payResult } = this.props.photoStore
    if (payResult) {
      Taro.navigateTo({
        url: `/pages/mySubPages/myOrders/myOrders?type=all`
      })
    } else {
      Taro.navigateTo({
        url: `/pages/mySubPages/myOrders/myOrders?type=needPay`
      })
    }
  }

  routerToHome = () => {
    Taro.switchTab({
      url: '/pages/home/home'
    })
  }

  render () {
    const { payResult } = this.props.photoStore
    return (
      <View className='pay-result flex fd-c fs-c jc-sb'>
        <View className='result flex jc-c ai-c'>支付{payResult ? '成功' : '失败'}</View>
        {/* <View className='result flex jc-c ai-c c-main'>支付成功</View> */}
        <View className='handles flex jc-c ai-c ft24'>
          <AtButton type='secondary' className='button flex jc-c ai-c' onClick={this.routerToMyOrders}>查看订单</AtButton>
          <AtButton type='primary' className='button flex jc-c ai-c' onClick={this.routerToHome}>回到首页</AtButton>
        </View>
      </View>
    )
  }
}

export default PayResult