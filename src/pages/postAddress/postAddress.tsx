import { Component } from 'react'
import { View, Image, Picker } from '@tarojs/components'
import { getMenuButtonBoundingClientRect } from '@/utils/index'
import Taro from '@tarojs/taro'
import { AtForm, AtInput, AtList, AtListItem, AtButton } from 'taro-ui'
import { inject } from 'mobx-react'

import './postAddress.scss'

interface Home {
  state: {
    menuButtonRect: Record<string, number>
    region: Array<string>
  },
  props: {
    userStore: UserStore
  }
}

// @inject('userStore')
class PostAddress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checkboxIcon: require('../../assets/checkbox.png'),
      addressForm: {
        address: ''
      },
      region: [['美国'], ['中国'], ['巴西'], ['日本']],
      selectorChecked: '美国',
    }
  }

  componentDidMount () {
    const { userStore } = this.props
    console.log(this.props.userStore)
    // userStore.getUserInfo()
  }

  componentDidShow () {
  }

  // openSetting () {
  //   // Taro.openSetting()
  //   console.log(this)
  //   const { userStore } = this.props
  //   console.log(this.props.userStore)
  //   userStore.getUserInfo()
  // }

  onSubmit = (event) => {
    console.log(this.state.value)
  }

  onReset = (event) => {
    console.log(this.state.value)
  }

  getRegion = () => {}

  render () {
    const {checkboxIcon} = this.state
    const {region} = this.state
    return (
      <View className='post-address home flex fd-c'>
        <View className='card bg-fff'>
          <View>英语四六级考试</View>
          <View>
            <View className='preview-box'>
              <View className='photo-preview'></View>
            </View>
            <View className='photo-info'>
              <View className='photo-info-item flex jc-fs ai-c'>
                <Image className='photo-info-icon' src={checkboxIcon} />
                <View className='photo-info-label c-333 ft24'>保存两种底色</View>
              </View>
              <View className='photo-info-item flex jc-fs ai-c'>
                <Image className='photo-info-icon' src={checkboxIcon} />
                <View className='photo-info-label c-333 ft24'>纸质版 + 电子版</View>
              </View>
              <View className='photo-info-item flex jc-fs ai-c'>
                <Image className='photo-info-icon' src={checkboxIcon} />
                <View className='photo-info-label c-333 ft24'>打印尺寸： 25x35mm</View>
              </View>
            </View>
          </View>
        </View>
        <View className='pay-express card bg-fff'>
          <View>支付方式</View>
          <View>配送方式</View>
        </View>
        <View className='card bg-fff'>
          <View>收件地址</View>
          <View className='address-form'>
            <AtForm
              onSubmit={this.onSubmit.bind(this)}
              onReset={this.onReset.bind(this)}
            >
              <Picker mode='selector' range={region} onChange={this.getRegion}>
                <AtList className='ft24'>
                  <AtListItem
                    title='国家地区'
                    className='ft24'
                    extraText={this.state.selectorChecked}
                  />
                </AtList>
              </Picker> 
              <AtInput 
                name='value' 
                title='详细地址' 
                type='text' 
                placeholder='单行文本' 
                className='ft24'
                value={this.state.addressForm.address} 
              />
              <AtInput 
                name='value' 
                title='收货人' 
                type='text' 
                placeholder='单行文本' 
                className='ft24'
                value={this.state.addressForm.address} 
              />
              <AtInput 
                name='value' 
                title='手机号码' 
                type='text' 
                placeholder='单行文本' 
                className='ft24'
                value={this.state.addressForm.address} 
              />
            </AtForm>
          </View>
        </View>
        <View className='bottom-bar w-100 flex jc-sb ai-c bg-fff'>
          <View>合计：¥12.9</View>
          <AtButton type='primary' size='small'>提交订单</AtButton>
        </View>
      </View>
    )
  }
}

export default PostAddress