import {Component} from 'react'
import {View, Input} from '@tarojs/components'
import Taro from '@tarojs/taro'
// import { debounce } from '@/utils/index'


import './commonSearch.scss'

interface CommonSearch {
  state: {
    searchValue: string
  }
}

class CommonSearch extends Component {

  routerToSearch = () => {
    Taro.navigateTo({
      url: '/pages/searchResult/searchResult'
    })
  }

  render () {
    return (
      <View className='common-search bg-fff flex jc-c ai-c'>
        <Input
          className='search-input'
          placeholder='搜索证件照、尺寸'
          onClick={this.routerToSearch}
        ></Input>
      </View>
    )
  }
}

export default CommonSearch