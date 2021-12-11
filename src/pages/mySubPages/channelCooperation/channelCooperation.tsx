import { Component } from 'react'
import { View } from '@tarojs/components'
import { inject } from 'mobx-react'
import { getCooperation } from '@/https'
import { User } from '../../../store/user'
import './channelCooperation.scss'

interface ChannelCopperation {
  props: {
    userStore: User
  },
  state: {
    title: string,
    context: string
  }
}
@inject('userStore')
class ChannelCopperation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      context: ''
    }
  }
  componentDidMount () {
    const { openId } = this.props.userStore.userInfo
    getCooperation({openid: openId}).then(data => {
        console.log('getCooperation', data)
        this.setState({
          title: data.title,
          context: data.context
        })
      })
  }
  render () {
    const { title, context } = this.state
    return (
      <View className='channel-copperation'>
        <View className='content'>
          <View className='ft28 text-center'>{ title }</View>
          <View className='ft24 pre'>{ context }</View>
        </View>
      </View>
    )
  }
} 

export default ChannelCopperation