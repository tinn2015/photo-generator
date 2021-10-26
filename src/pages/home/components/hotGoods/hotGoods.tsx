import {Component} from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './hotGoods.scss'

interface HotGoods {
  state: {
    hotGoods: Array<Record<string, unknown>>
  }
}

class HotGoods extends Component {

  constructor (props) {
    super(props)
    this.state = {
      hotGoods: [{
        id: 1,
        label: '公务员考试',
        size: '25 x 25'
      },{
        id: 2,
        label: '公务员考试',
        size: '25 x 25'
      },{
        id: 3,
        label: '公务员考试',
        size: '25 x 25'
      },{
        id: 4,
        label: '公务员考试',
        size: '25 x 25'
      },{
        id: 5,
        label: '公务员考试',
        size: '25 x 25'
      },{
        id: 6,
        label: '公务员考试',
        size: '25 x 25'
      },{
        id: 7,
        label: '公务员考试',
        size: '25 x 25'
      },{
        id: 8,
        label: '公务员考试',
        size: '25 x 25'
      },{
        id: 9,
        label: '公务员考试',
        size: '25 x 25'
      }]
    }
  }

  selectPhoto = () => {
    Taro.navigateTo({
      url: '/pages/photoDetail/photoDetail'
    })
  }

  render () {
    const { hotGoods } = this.state
    return (
      <View className='hot-goods'>
        <View className='hot-goods-header flex jc-sb ai-c'>
          <View className='hot-goods-title'>热门规格</View>
          <View className='hot-goods-more'>查看全部</View>
        </View>
        <View className='hot-goods-container flex jc-ad flex-wrap'>
          {
            hotGoods.map((good) => {
              return (
                <View className='hot-good-item bg-fff flex jc-c ai-c' key={good.id} onClick={this.selectPhoto}>
                  {good.label}
                </View>
              )
            })
          }
        </View>
        <View className='hot-goods-endline flex jc-c ai-c'>
          我是底线～
        </View>
      </View>
    )
  }
}

export default HotGoods