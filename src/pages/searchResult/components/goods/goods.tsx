import { Component } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import { inject } from 'mobx-react'
import Taro from '@tarojs/taro'
import { Photo, PhotoInfo} from '../../../../store/photo'

import './goods.scss'

interface Goods {
  props: {
    ads: Array<Record<string, string>>,
    goods: Array<PhotoInfo>,
    photoStore: Photo
  }
}

@inject('photoStore')
class Goods extends Component {

  selectPhoto = (good: PhotoInfo) => {
    const { photoStore } = this.props
    photoStore.setPhotoInfo(good)
    Taro.navigateTo({
      url: '/pages/photoDetail/photoDetail'
    })
  }

  render () {
    const ad = this.props.ads[0]
    const {goods} = this.props
    console.log('ad', ad)
    return (
      <ScrollView scrollY className='search-goods flex fd-c jc-c ai-c'>
        <View className='ads'>
          <Image className='ad-img' mode='scaleToFill' src={ad.img} />
          <View className='ad-label c-fff ft24'>{ad.desc}</View>
        </View>
        <View className='goods w-100'>
          {
            goods.map(good => {
              return(
                <View key={good.id} className='good bg-fff w-100 flex' onClick={() => {this.selectPhoto(good)}}>
                  <Image className='img' mode='scaleToFill' src={good.img} />
                  <View className='good-info flex fd-c jc-ad ai-fs'>
                    <View>{good.title}</View>
                    <View className='ft24 tip c-fff'>{good.desc[0]}</View>
                    <View className='ft24 size'>{good.desc[1]}</View>
                  </View>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    )
  }
}

export default Goods