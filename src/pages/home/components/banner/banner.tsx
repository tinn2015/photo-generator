import { Component } from 'react'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'


import './banner.scss'

class Banner extends Component {

  render () {
    return (
      <View className='banner p-r'>
        <Swiper
          className='banner-swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem className='flex jc-c ai-c'>
            <Image
              className='w-100 h-100'
              mode='scaleToFill'
              src='https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
            />
          </SwiperItem>
          <SwiperItem className='flex jc-c ai-c'>
            <View className='demo-text-2'>2</View>
          </SwiperItem>
          <SwiperItem className='flex jc-c ai-c'>
            <View className='demo-text-3'>3</View>
          </SwiperItem>
        </Swiper>
        <View className='tab-box p-a w-100 flex jc-c jc-sb'>
          <View className='tab-item flex jc-c ai-c'>
            制作证件照
          </View>
          <View className='tab-item flex jc-c ai-c'>
            换底色
          </View>
          <View className='tab-item flex jc-c ai-c'>
            自定义
          </View>
          <View className='tab-item flex jc-c ai-c'>
            热门
          </View>
        </View>
      </View>
    )
  }
}

export default Banner