import {Component} from 'react'
import {View, Input} from '@tarojs/components'
// import { AtInput }  from 'taro-ui'
import { debounce } from '@/utils/index'

import './search.scss'

interface Search {
  state: {
    searchValue: string
  }
}

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchValue: ''
    }
  }

  handleChange = (e) => {
    console.log(this.state, e)
  }

  render () {
    return (
      <View className='search'>
        <View className='search-input-box bg-fff flex ai-c'>
          {/* <AtInput
            className='search-input'
            name='value'
            title='标准五个字'
            type='text'
            placeholder='标准五个字'
            value={this.state.searchValue}
            onChange={this.handleChange}
          /> */}
          <Input
            className='search-input'
            placeholder='搜索证件照、尺寸'
            onInput={debounce(this.handleChange, 500)}
          ></Input>
        </View>
      </View>
    )
  }
}

export default Search