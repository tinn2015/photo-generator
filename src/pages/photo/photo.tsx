import { Component } from 'react'
import { View } from '@tarojs/components'
import CommonSearch from '../../components/commonSearch/commonSearch'
import HotNav from './components/hotNav/hotNav'
import PhotoList from './components/photoList/photoList'
import { photoGetData } from '../../utils/https'
import { Good, Ad } from '../../types/'

import './photo.scss'

interface Photo {
  state: {
    photo: {
      search_tips: string,
      search_hotkeys: Array<string>,
      ads: Array<Ad>,
      goods: Array<Good>
    }
  }
}

class Photo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photo: {
        search_tips: '',
        search_hotkeys: [],
        ads: [],
        goods: []
      }
    }
  }

  componentDidMount () {
    photoGetData({}).then(res => {
      console.log('mounted', res)
      this.setState({
        photo: res
      })
    })
  }

  render () {
    const { search_tips,  search_hotkeys, ads, goods} = this.state.photo
    return(
      <View className='photo-container'>
        <CommonSearch searchTip={search_tips}></CommonSearch>
        <View className='photo-content flex jc-sb bg-fff'>
          <View className='photo-content-left'>
            <HotNav searchHotKeys={search_hotkeys}></HotNav>
          </View>
          <View className='photo-content-right'>
            <PhotoList ads={ads} lists={goods}></PhotoList>
          </View>
        </View>
      </View>
    )
  }
}

export default Photo