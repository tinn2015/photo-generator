import { Component } from 'react'
import { View } from '@tarojs/components'
import CommonSearch from '../../components/commonSearch/commonSearch'
import HotNav from './components/hotNav/hotNav'
import PhotoList from './components/photoList/photoList'

import './photo.scss'

class Photo extends Component {
  render () {
    return(
      <View className='photo-container'>
        <CommonSearch></CommonSearch>
        <View className='photo-content flex jc-sb bg-fff'>
          <View className='photo-content-left'>
            <HotNav></HotNav>
          </View>
          <View className='photo-content-right'>
            <PhotoList></PhotoList>
          </View>
        </View>
      </View>
    )
  }
}

export default Photo