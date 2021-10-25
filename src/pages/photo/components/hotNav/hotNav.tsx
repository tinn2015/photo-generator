import { Component } from 'react'
import { View } from '@tarojs/components'

import './hotNav.scss'

interface HotNav {
  state: {
    navs: Array<Record<string, unknown>>,
    currentSelected: number | null,
    navSelected: () => void
  }
}

class HotNav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navs: [
        {
          id: 1,
          label: '寸照'
        },
        {
          id: 2,
          label: '考试'
        },
        {
          id: 3,
          label: '职业资格'
        },
        {
          id: 4,
          label: '签证'
        }
      ],
      currentSelected: 1
    }
  }

  navSelected = (navId: number | null) => {
    this.setState({
      currentSelected: navId
    })
  }

  render () {
    const {navs, currentSelected} = this.state
    return(
      <View className='hot-nav'>
        {
          navs.map(item => {
            return (
              <View className='nav-item flex jc-sb ai-c' key={item.id} onClick={() => {this.navSelected(item.id)}}>
                <View className={currentSelected === item.id ? 'nav-default-box nav-selected-bg' : 'bg-fff nav-default-box'}></View>
                <View className={currentSelected === item.id ? 'nav-label nav-label-selected' : 'nav-label'}>{item.label}</View>
              </View>
            )
          })
        }
      </View>
    )
  }
}

export default HotNav