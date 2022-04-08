import {Component} from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Photo, PhotoInfo } from '../../../../store/photo'

import './hotGoods.scss'

interface HotGoods {
  state: {
    // hotGoods: Array<Record<string, unknown>>
  },
  props: {
    hotGoods: Array<PhotoInfo>,
    photoStore: Photo
  }
}

class HotGoods extends Component {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  selectPhoto = (good: PhotoInfo) => {
    const { photoStore } = this.props
    photoStore.setPhotoInfo(good)
    Taro.navigateTo({
      url: '/pages/photoDetail/photoDetail'
    })
  }

  routerToPhoto = () => {
    Taro.switchTab({
      url: '/pages/photo/photo'
    })
  }

  render () {
    const { hotGoods } = this.props
    return (
      <View className='hot-goods flex fd-c'>
        <View className='hot-goods-header flex jc-sb ai-c'>
          <View className='hot-goods-title'>热门规格</View>
          <View className='hot-goods-more' onClick={this.routerToPhoto}>查看全部</View>
        </View>
        <View className='hot-goods-container flex flex-wrap'>
          {
            hotGoods.map((good) => {
              return (
                <View className='hot-good-item bg-fff flex fd-c jc-c ai-c' key={good.id} onClick={() => {this.selectPhoto(good)}}>
                  <Image
                    className='good-img w-100 h-100'
                    mode='scaleToFill'
                    src={good.img}
                  />
                  <View className='good-title c-333'>{good.title}</View>
                  <View className='c-main ft20'>{good.desc[1]}</View>
                </View>
              )
            })
          }
        </View>
        <View className='hot-goods-endline flex jc-c ai-c ft24'>
          我是底线～
        </View>
      </View>
    )
  }
}

export default HotGoods