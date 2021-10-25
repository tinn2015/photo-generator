import { Component } from 'react'
import { View } from '@tarojs/components'
import { getMenuButtonBoundingClientRect } from '@/utils/index'
import Banner from './components/banner/banner'
import CommonSearch from '@/components/commonSearch/commonSearch'
import HotSearch from './components/hotSearch/hotSearch'
import HotGoods from './components/hotGoods//hotGoods'

import './home.scss'

class Home extends Component {

  componentDidShow () {
    const rect = getMenuButtonBoundingClientRect()
    console.log('show', rect)
  }

  render () {
    return (
      <View className='home'>
        <View className='title flex jc-c ai-c'>一分钟证件照</View>
        <Banner></Banner>
        <CommonSearch></CommonSearch>
        <HotSearch></HotSearch>
        <HotGoods></HotGoods>
      </View>
    )
  }
}

export default Home