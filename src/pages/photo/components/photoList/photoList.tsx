import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {Good, Ad} from '../../../../types'

import './photoList.scss'

interface PhotoList {
  props: {
    ads: Array<Ad>
    lists: Array<Good>
  }
}

class PhotoList extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  routerToDetail = () => {
    Taro.navigateTo({
      url: '/pages/photoDetail/photoDetail'
    })
  }

  render () {
    const { lists, ads } = this.props
    const ad = ads[0]
    return(
      <View className='photo-list'>
        {
          ad && <View className='photo-ad-holder flex jc-c ai-c'>
            <Image className='image' src={ad.img} />
            <View className='title c-fff'>{ad.title}</View>
            <View className='desc c-fff ft24'>{ad.desc}</View>
          </View>
        }
        <View className='photo-list-content'>
          {
            lists.length && lists.map(item => {
              return <View className='photo-list-item flex jc-sb ai-c' key={item.id} onClick={this.routerToDetail}>
                <View className='list-item-pic'>
                  <Image
                    className='w-100 h-100'
                    mode='scaleToFill'
                    src={item.img}
                  />
                </View>
                <View className='list-item-info flex fd-c jc-ad'>
                  <View className='list-item-title'>{item.title}</View>
                  {/* <View className='list-item-tip'>{item.tip}</View>
                  <View className='list-item-size'>尺寸：{item.size}</View> */}
                </View>
              </View>
            })
          }
        </View>
      </View>
    )
  }
}

export default PhotoList