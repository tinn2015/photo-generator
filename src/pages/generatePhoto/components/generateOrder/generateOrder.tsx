import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtButton, AtFloatLayout } from 'taro-ui'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'
// import { SelectPhoto } from '../../store/selectPhoto'

import './generateorder.scss'

interface GenerateOrder {
  state: {
    activeTab: number
  },
  // props: {
  //   selectPhotoStore: SelectPhoto
  // }
}

// @inject('selectPhotoStore')
// @observer
class GenerateOrder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: 1 // 1: 电子照 2: 冲印邮寄到家
    }
  }

  toggleTab = (flag: number) => {
    this.setState({
      activeTab: flag
    })
  }

  render () {
    const { activeTab } = this.state
    return(
      <View className='generate-order bg-fff flex fd-c jc-sb'>
        <View className='tabs flex jc-sb ai-c'>
          <View className='tab-item flex jc-c ai-c' onClick={() => {this.toggleTab(1)}}><View className={activeTab === 1 ? 'label tab-item-active' : 'label'}>电子照</View></View>
          <View className='tab-item flex jc-c ai-c' onClick={() => {this.toggleTab(2)}}><View className={activeTab === 2 ? 'label tab-item-active' : 'label'}>冲印邮寄到家</View></View>
        </View>
        <View className='photo-info flex'>
          <View className='photo-preview'>preview</View>
          <View className='infos flex fd-c jc-sb'>
            <View>英语四六级考试</View>
            <View>电子版相片处理</View>
            <View>已选底色</View>
            <View>¥ 2.9</View>
          </View>
        </View>
        <View className='more-service'>
          可选服务
        </View>
        <View className='settlement flex jc-sb ai-fe'>
          <View>¥ 2.9</View>
          <AtButton type='primary' size='small'>生成电子照</AtButton>  
        </View>
      </View>
    )
  }
}

export default GenerateOrder