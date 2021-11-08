import { Component } from 'react'
import { View } from '@tarojs/components'
import { getMenuButtonBoundingClientRect } from '@/utils/index'
import Taro from '@tarojs/taro'
import { inject } from 'mobx-react'
import { homeGetData } from '@/utils/https'
import CommonSearch from '../../components/commonSearch/commonSearch'
import { HomeData } from '../../types/'
import Banner from './components/banner/banner'
import HotSearch from './components/hotSearch/hotSearch'
import HotGoods from './components/hotGoods//hotGoods'
import { UserStore } from '../../store/user'
import { PhotoInfo, Photo } from '../../store/photo'

import './home.scss'

interface Home {
  state: {
    menuButtonRect: Record<string, number>,
    bannerBg: Array<Record<string, string>>,
    bannerBtn: Array<Record<string, string>>,
    searchTip: string,
    searchHotKeys: Array<string>,
    goods: Array<PhotoInfo>
  },
  props: {
    userStore: UserStore,
    searchTips: string,
    photoStore: Photo
  }
}

@inject('userStore', 'photoStore')
class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      menuButtonRect: {},
      bannerBg: [],
      bannerBtn: [],
      searchTip: '',
      searchHotKeys: [],
      goods: []
    }
  }

  componentDidMount () {
    const { userStore, photoStore } = this.props
    console.log('store', userStore, photoStore)
    // userStore.getUserInfo()
    homeGetData({}).then((res: HomeData) => {
      console.log('homeGetDatat', res)
      this.setState({
        bannerBtn: res['banner_btn'],
        bannerBg: res['banner_bg'],
        searchTip: res['search_tips'],
        searchHotKeys: res['search_hotkeys'],
        goods: res['goods'],
      })
    })
  }

  componentDidShow () {
    const rect = getMenuButtonBoundingClientRect()
    console.log('show', rect)
    this.setState({
      menuButtonRect: rect
    })
  }

  render () {
    const {menuButtonRect, bannerBg, bannerBtn, searchTip, searchHotKeys, goods} = this.state
    const { photoStore } = this.props
    return (
      <View className='home flex fd-c'>
        <View className='title flex jc-c ai-c' style={{top: menuButtonRect.top}}>一分钟证件照</View>
        <Banner bannerBg={bannerBg} bannerBtn={bannerBtn}></Banner>
        <CommonSearch searchTip={searchTip}></CommonSearch>
        <HotSearch photoStore={photoStore} searchHotKeys={searchHotKeys}></HotSearch>
        <HotGoods photoStore={photoStore} hotGoods={goods}></HotGoods>
      </View>
    )
  }
}

export default Home