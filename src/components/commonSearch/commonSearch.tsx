import {Component} from 'react'
import {View, Input} from '@tarojs/components'
import Taro from '@tarojs/taro'
// import { debounce } from '@/utils/index'


import './commonSearch.scss'

interface CommonSearch {
  state: {
    searchValue: string
  },
  props: {
    searchTip: string
  }
}

class CommonSearch extends Component {
  constructor (props) {
    super(props)
  }

  routerToSearch = () => {
    Taro.navigateTo({
      url: '/pages/searchResult/searchResult'
    })
  }

  render () {
    const {searchTip} = this.props
    return (
      <View className='common-search bg-fff flex jc-c ai-c' onClick={this.routerToSearch}>
        {/* <Input
          className='search-input'
          placeholder={searchTip || '搜索证件照、尺寸'}
          onClick={this.routerToSearch}
        ></Input> */}
        {searchTip || '搜索证件照、尺寸'}
      </View>
    )
  }
}

export default CommonSearch