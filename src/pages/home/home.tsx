import { Component } from 'react'
import { View } from '@tarojs/components'
import { getMenuButtonBoundingClientRect } from '@/utils/index'
import Taro from '@tarojs/taro'
import { inject } from 'mobx-react'
import CommonSearch from '@/components/commonSearch/commonSearch'
import Banner from './components/banner/banner'
import HotSearch from './components/hotSearch/hotSearch'
import HotGoods from './components/hotGoods//hotGoods'
import { UserStore } from '../../store/user'

import './home.scss'

interface Home {
  state: {
    menuButtonRect: Record<string, number>
  },
  props: {
    userStore: UserStore
  }
}

@inject('userStore')
class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      menuButtonRect: {}
    }
  }

  componentDidMount () {
    const { userStore } = this.props
    console.log(this.props.userStore)
    // userStore.getUserInfo()
  }

  componentDidShow () {
    const rect = getMenuButtonBoundingClientRect()
    console.log('show', rect)
    this.setState({
      menuButtonRect: rect
    })
  }

  openSetting () {
    // Taro.openSetting()
    console.log(this)
    const { userStore } = this.props
    console.log(this.props.userStore)
    userStore.getUserInfo()
  }

  render () {
    const {menuButtonRect} = this.state
    return (
      <View className='home flex fd-c'>
        <View className='title flex jc-c ai-c' style={{top: menuButtonRect.top}} onClick={() => {this.openSetting()}}>一分钟证件照</View>
        <Banner></Banner>
        <CommonSearch></CommonSearch>
        <HotSearch></HotSearch>
        <HotGoods></HotGoods>
      </View>
    )
  }
}

export default Home