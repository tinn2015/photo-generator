import { Component } from 'react'
import { inject } from 'mobx-react'
import { View } from '@tarojs/components'
import CommonSearch from '../../components/commonSearch/commonSearch'
import { Photo } from '../../store/photo'
import HotNav from './components/hotNav/hotNav'
import PhotoList from './components/photoList/photoList'
import { photoGetData, searchGoods } from '../../utils/https'
import { Good, Ad } from '../../types/'

import './photo.scss'

interface AllPhoto {
  state: {
    photo: {
      search_tips: string,
      search_hotkeys: Array<string>,
      ads: Array<Ad>,
      goods: Array<Good>
    }
  },
  props: {
    photoStore: Photo
  }
}

@inject('photoStore')
class AllPhoto extends Component {
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

  searchGoods = (key) => {
    searchGoods({'search_hotkey': key}).then(res => {
      let {photo} = this.state
      photo.ads = res.ads
      photo.goods = res.goods
      this.setState({
        photo
      })
    })
  }

  render () {
    const { search_tips,  search_hotkeys, ads, goods} = this.state.photo
    const { photoStore } = this.props
    return(
      <View className='photo-container'>
        <CommonSearch searchTip={search_tips} photoStore={photoStore}></CommonSearch>
        <View className='photo-content flex jc-sb bg-fff'>
          <View className='photo-content-left'>
            <HotNav searchHotKeys={search_hotkeys} searchGoods={(key) => {this.searchGoods(key)}}></HotNav>
          </View>
          <View className='photo-content-right'>
            <PhotoList ads={ads} lists={goods}></PhotoList>
          </View>
        </View>
      </View>
    )
  }
}

export default AllPhoto