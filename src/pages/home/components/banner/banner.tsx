import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { Photo } from '../../../../store/photo'


import './banner.scss'

interface Banner {
  props: {
    photoStore: Photo
    bannerBg: Array<Record<string, string>>
    bannerBtn: Array<Record<string, string>>
  }
}
class Banner extends Component {

  componentDidMount () {}

  bannerTab = (url: string) => {
    window.open(url)
  }

  tabBtn = (item) => {
    const { photoStore } = this.props
    switch (item.type) {
      case 'create_photos':
        console.log('制作证件照');
        Taro.switchTab({
          url: '/pages/photo/photo'
        })
        break;
      case 'hots_size':
        Taro.navigateTo({
          url: '/pages/searchResult/searchResult'
        })
        break
      case 'change_colors':
        photoStore.setPhotoInfo({
          title: item.name,
          id: item.goods_id
        })
        Taro.navigateTo({
          url: '/pages/changeBg/changeBg'
        })
        break
      case 'custom_size':
        photoStore.setCustomSize('isCustom', true)
        photoStore.setPhotoInfo({
          title: item.name,
          id: item.goods_id
        })
        Taro.navigateTo({
          url: '/pages/customSize/customSize'
        })
        break
      default:
        console.log(item)
    }
  }

  render () {
    const {bannerBg, bannerBtn} = this.props
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
          {
            bannerBg.map(item => {
              return (
                <SwiperItem className='flex jc-c ai-c' key={item.img} onClick={() => {this.bannerTab(item.url)}}>
                  <Image
                    className='w-100 h-100'
                    mode='scaleToFill'
                    src={item.img}
                  />
                </SwiperItem>
              )
            })
          }
        </Swiper>
        <View className='tab-box p-a w-100 flex jc-c jc-ad'>
          {
            bannerBtn.map(item => {
              return (
                <View className='tab-item flex fd-c jc-c ai-c' key={item.icon} onClick={() => {this.tabBtn(item)}}>
                  <Image
                    className='tab-icon w-100 h-100'
                    mode='scaleToFill'
                    src={item.icon}
                  />
                  <View className='tab-label'>{item.name}</View>
                </View>
              )
            })
          }
          {/* <View className='tab-item flex jc-c ai-c'>
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
          </View> */}
        </View>
      </View>
    )
  }
}

export default Banner