import { Component } from 'react'
import { observer } from 'mobx-react'
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Photo } from '../../../../store/photo'
import { User } from '../../../../store/user'


import './generateorder.scss'

interface GenerateOrder {
  state: {
    optionServiceChecked: boolean
  },
  props: {
    selectBg: string,
    photoStore: Photo
    userStore: User
  }
}

@observer
class GenerateOrder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // activeTab: 1, // 1: 电子照 2: 冲印邮寄到家
      optionServiceChecked: false
    }
  }

  toggleTab = (flag: number) => {
    this.props.photoStore.setOrderType(flag)
  }

  toggleOptionService = () => {
    const { optionServiceChecked } = this.state
    this.setState({
      optionServiceChecked: !optionServiceChecked
    })
  }

  requestOrAddress = () => {
    const {order} = this.props.photoStore
    const {optionServiceChecked} = this.state
    if (order.type === 1) {
      const params = {
        job_id: this.props.photoStore.photoInfo.id,
        openid: this.props.userStore.userInfo.openId,
        amount: optionServiceChecked ? order.price + order.opt_price : order.price,
        opt_service: optionServiceChecked ? 1 : 0
      }
      this.props.photoStore.requestPayment(params)
    } else {
      const { selectBg } = this.props
      const price = (optionServiceChecked ? order.price + order.opt_price : order.price).toFixed(1)
      Taro.navigateTo({
        url: `/pages/postAddress/postAddress?selectBg=${selectBg}&price=${price}&optionServiceChecked=${optionServiceChecked}`
      })
    }
  }

  render () {
    const { optionServiceChecked } = this.state
    const { selectBg } = this.props
    const { photoDetail, previewInfo, order } = this.props.photoStore
    const activeTab = order.type
    return(
      <View className='generate-order bg-fff flex fd-c jc-sb'>
        <View className='tabs flex jc-sb ai-c'>
          <View className='tab-item flex jc-c ai-c' onClick={() => {this.toggleTab(1)}}><View className={activeTab === 1 ? 'label tab-item-active' : 'label'}>电子照</View></View>
          <View className='tab-item flex jc-c ai-c' onClick={() => {this.toggleTab(2)}}><View className={activeTab === 2 ? 'label tab-item-active' : 'label'}>冲印邮寄到家</View></View>
        </View>
        <View className='photo-info flex'>
          <Image className='photo-preview' src={previewInfo.preview[selectBg]} />
          <View className='infos flex fd-c jc-sb'>
            <View>{ photoDetail.title }</View>
            <View className='ft24 c-333'>{ activeTab === 1 ? '电子版 + 相片处理' : '纸质版 + 电子版 + 相片处理' }</View>
            <View className='flex ft24 c-333'>已选底色 <View className='select-bg' style={{background: selectBg}}></View></View>
            <View className='c-ff5722'>¥ {order.price}</View>
          </View>
        </View>
        <View className='more-service'>
          <View>可选服务</View>
          <View className='ft24 c-333 flex ai-c'>
            保存全部底色： <View className='c-ff5722'>¥ {order.opt_price}</View><View onClick={this.toggleOptionService} className={optionServiceChecked ? 'at-icon at-icon-check-circle checked' : 'at-icon at-icon-check-circle check-default'}></View>
          </View>
          
        </View>
        <View className='settlement flex jc-sb ai-fe'>
          <View className='flex'>合计： <View className='c-ff5722'>¥ {(optionServiceChecked ? order.price + order.opt_price : order.price).toFixed(1)}</View></View>
          <AtButton type='primary' size='small' onClick={this.requestOrAddress}>{activeTab === 1 ? '生成电子照' : '提交冲印'}</AtButton>  
        </View>
      </View>
    )
  }
}

export default GenerateOrder