import { Component } from 'react'
import {View} from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import {InjectStores} from '../../types'
import {Demo} from '../../types/store/demo'


interface My {
  props: {
    demoStore: Demo
  }
}

@inject((stores: InjectStores, props) => {
  const {store} = stores
  return {
    demoStore: store.demoStore
  }
})
@observer
class My extends Component {
  test = () => {
    const { demoStore } = this.props
    demoStore.setName('alice')

  }
  
  render () {
    const { demoStore } = this.props
    console.log(demoStore)
    return (
      <View>
        <View>{demoStore.name}</View>
        <View onClick={this.test}>test</View>
      </View>
    )
  }
}

export default My