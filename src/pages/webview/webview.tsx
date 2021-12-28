import { Component } from 'react'
import { WebView} from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'

interface MyWebView {
  state: {
    url: string
  }
}

class MyWebView extends Component {

  constructor (props) {
    super(props)
    this.state = {
      url: ''
    }
  }
  
  componentWillMount () {
    console.log(this.$instance)
    const {target} = this.$instance?.router?.params || {}
    this.setState({
      url: target
    })
  }
  
  $instance = getCurrentInstance()
  render () {
    const { url } = this.state
    return (
      <WebView src={url} />
    )
  }
} 

export default MyWebView