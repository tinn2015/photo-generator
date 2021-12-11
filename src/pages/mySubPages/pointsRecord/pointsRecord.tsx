import { Component } from 'react'
import { View } from '@tarojs/components'
import { inject } from 'mobx-react'
import { pointsRecord } from '@/https'
import { User } from '../../../store/user'
import './pointsRecord.scss'

interface Address {
  province: string
  city: string
  area: string
  road: string
  receiver: string
  tel: string
}

interface ChannelCopperation {
  props: {
    userStore: User
  },
  state: {
    addressList: Address[]
  }
}
@inject('userStore')
class ChannelCopperation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addressList: []
    }
  }
  componentDidMount () {
    const { openId } = this.props.userStore.userInfo
    pointsRecord({openid: openId}).then(data => {
        console.log('pointsRecord', data)
        this.setState({
          addressList: data.address
        })
      })
  }
  render () {
    const { addressList } = this.state
    return (
      <View className='points-record'>
      </View>
    )
  }
} 

export default ChannelCopperation