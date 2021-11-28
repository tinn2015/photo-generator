import { Component } from 'react'
import { Provider, inject } from 'mobx-react'
import Taro from '@tarojs/taro'

import counterStore from './store/counter'
import demoStore from './store/demo'
import photoStore from './store/photo'
import userStore from './store/user'

import './app.scss'

const store = {
  counterStore,
  demoStore,
  photoStore,
  userStore
}

class App extends Component {

  componentDidMount () {
    console.log('userStore', userStore)
  }

  componentDidShow () {
    console.log('didshow')
  }

  componentDidHide () {}

  componentDidCatchError () {}

  onLaunch () {
    console.log('onLaunch')
  }

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider {...store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
