import {Component} from 'react'
import {View, Input} from '@tarojs/components'
import { debounce } from '@/utils/index'
// import Taro from '@tarojs/taro'
import {inject} from 'mobx-react'
import { Photo } from '../../store/photo'
import Hotkeys from './components/hotKeys/hotKeys'
import Goods from './components/goods/goods'
import { searchGoods, getHotKeys } from '../../utils/https'


import './searchResult.scss'

interface SearchResult {
  state: {
    searchKey: string,
    hotKeys: Array<string>
    searchTip: string,
    searchResultAds: Array<Record<string, string>>,
    searchResultGoods: Array<Record<string, string>>,
  },
  props: {
    photoStore: Photo
  }
}

@inject('photoStore')
class SearchResult extends Component {

  constructor (props) {
    super(props)
    this.state = {
      searchKey: '',
      hotKeys: [],
      searchTip: '',
      searchResultAds: [{}],
      searchResultGoods: [],
    }
  }

  componentDidMount () {
    this.getHotKeys()
  }

  componentDidShow () {
    console.log('didshow')
    const {photoStore} = this.props
    if (photoStore.hotkey) {
      this.setState({
        searchKey: photoStore.hotkey
      })
      this.searchGoods(photoStore.hotkey)
    }
  }

  getHotKeys = () => {
    getHotKeys({}).then(res => {
      console.log('gethotkeys', res)
      this.setState({
        hotKeys: res['search_hotkeys'],
        searchTip: res['search_tips']
      })
    })
  }

  doSearch = (e:unknown) => {
    this.setState({
      searchKey: e.detail.value
    })
    debounce(this.searchGoods, 500)(e)
  }

  searchGoods = (value: string) => {
    searchGoods({
      search_hotkey: value
    }).then(res => {
      console.log('searchgoods', res)
      this.setState({
        searchResultAds: res['ads'],
        searchResultGoods: res['goods'],
      })
    })
  }

  setKey = (key: string) => {
    this.setState({
      searchKey: key
    })
    this.searchGoods(key)
  }

  render () {
    const { searchKey, searchTip, hotKeys, searchResultAds, searchResultGoods } = this.state
    return (
      <View className='search-result flex fd-c jc-c ai-c'>
        <View className='search bg-fff'>
          <Input
            className='search-input c-333'
            placeholder={searchTip || '搜索证件照、尺寸'}
            value={searchKey}
            onInput={this.doSearch}
          ></Input>
        </View>
        <View className='content w-100'>
        {
          searchKey ? <Goods ads={searchResultAds} goods={searchResultGoods}></Goods> : <Hotkeys setKey={this.setKey} hotKeys={hotKeys}></Hotkeys>
        }
        </View>
      </View>
    )
  }
}

export default SearchResult