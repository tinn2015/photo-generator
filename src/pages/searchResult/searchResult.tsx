import {Component} from 'react'
import {View, Input} from '@tarojs/components'
import Taro from '@tarojs/taro'
import Search from './components/search/search'
// import { debounce } from '@/utils/index'


import './searchResult.scss'

interface CommonSearch {
  state: {
    searchValue: string
  }
}

class CommonSearch extends Component {

  constructor (props) {
    super(props)
    this.state = {
      searchValue: ''
    }
  }

  searchChange = (e) => {
    this.setState({
      searchValue: e.details.value
    })
  }

  render () {
    return (
      <View className='search-result'>
        <View className='search-input-box bg-fff flex ai-c'>
         <Search></Search>
        </View>
      </View>
    )
  }
}

export default CommonSearch