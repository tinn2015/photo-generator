import {Component} from 'react'
import {View, Input} from '@tarojs/components'
// import { AtInput }  from 'taro-ui'
import { debounce } from '@/utils/index'

import './hotKeys.scss'

interface HotKeys {
  props: {
    hotKeys: Array<string>,
    setKey: (key:string) => void
  }
}

class HotKeys extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hotKeys: []
    }
  }

  componentDidMount () {
  }

  handleChange = (e) => {
    console.log(this.state, e)
  }

  render () {
    const { hotKeys, setKey } = this.props
    return (
      <View className='hot-keys flex'>
        {
          hotKeys.map(key => {
            return <view className='hot-key bg-fff' onClick={() => {setKey(key)}} key={key}>{key}</view>
          })
        }
      </View>
    )
  }
}

export default HotKeys