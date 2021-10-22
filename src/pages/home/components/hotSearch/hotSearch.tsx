import { Component } from 'react'
import { View } from '@tarojs/components'

import './hotSearch.scss'

interface HotSearch {
  state: {
    hotKeys: Array<string>
  }
}

class HotSearch extends Component {

  constructor (props) {
    super(props)
    this.state = {
      hotKeys: ['aa', 'bbbb', 'cccc', 'erewrewrew']
    }
  }

  render () {
    const {hotKeys} = this.state
    return (
      <View className='hot-search c-fff flex jc-sb ai-c'>
        <View className='hot-item'>热门搜索：</View>
        {
          hotKeys.map(key => {
            return (
              <View className='hot-item' key={key}>{key}</View>
            )
          })
        }
      </View>
    )
  }
}

export default HotSearch