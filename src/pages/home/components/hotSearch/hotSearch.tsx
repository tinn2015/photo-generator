import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { inject } from 'mobx-react'
import { Photo } from '../../../../store/photo'

import './hotSearch.scss'

interface HotSearch {
  props: {
    searchHotKeys: Array<string>,
    photoStore: Photo
  }
}
class HotSearch extends Component {

  routerToSearchResult (key) {
    console.log(this.props)
    const { photoStore } = this.props
    photoStore.setHotKey(key)
    Taro.navigateTo({
      url: '/pages/searchResult/searchResult'
    })
  }

  render () {
    const {searchHotKeys} = this.props
    return (
      <View className='hot-search c-fff flex jc-sb ai-c'>
        <View className='hot-item'>热门搜索：</View>
        {
          searchHotKeys.map(key => {
            return (
              <View className='hot-item' key={key} onClick={() => {this.routerToSearchResult(key)}}>{key}</View>
            )
          })
        }
      </View>
    )
  }
}

export default HotSearch