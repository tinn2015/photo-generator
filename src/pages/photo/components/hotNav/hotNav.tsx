import { Component, useMemo } from 'react'
import { View } from '@tarojs/components'

import './hotNav.scss'

interface HotNav {
  state: {
    currentSelected: string | null,
  },
  props: {
    searchHotKeys: Array<string>,
    searchGoods: (key: string | null) => void
  }
}

class HotNav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentSelected: ''
    }
  }

  componentDidMount () {
    // const searchHotKeys = this.props
    // const currentSelected = useMemo(this.navSelected, [searchHotKeys])
    // this.setState({
    //   currentSelected
    // })
  }

  componentDidShow () {
    const { searchHotKeys } = this.props
    console.log('componentDidShow')
    this.setState({
      currentSelected: searchHotKeys[0]
    })
  }


  onShow = () => {
    console.log('onShow')
  }

  navSelected = (key: string | null) => {
    this.props.searchGoods(key)
    this.setState({
      currentSelected: key
    })
  }

  render () {
    const {currentSelected} = this.state
    const { searchHotKeys } = this.props
    const selected = currentSelected || searchHotKeys[0]
    return(
      <View className='hot-nav'>
        {
          searchHotKeys.length && searchHotKeys.map(item => {
            return (
              <View className='nav-item flex jc-sb ai-c' key={item} onClick={() => {this.navSelected(item)}}>
                <View className={selected === item ? 'nav-default-box nav-selected-bg' : 'bg-fff nav-default-box'}></View>
                <View className={selected === item ? 'nav-label nav-label-selected' : 'nav-label'}>{item}</View>
              </View>
            )
          })
        }
      </View>
    )
  }
}

export default HotNav