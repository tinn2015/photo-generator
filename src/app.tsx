import { Component } from 'react'
import { Provider } from 'mobx-react'
import 'taro-ui/dist/style/index.scss'

import counterStore from './store/counter'
import demoStore from './store/demo'

import './app.scss'

const store = {
  counterStore,
  demoStore
}

console.log(store)
class App extends Component {
  componentDidMount () {}

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
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
