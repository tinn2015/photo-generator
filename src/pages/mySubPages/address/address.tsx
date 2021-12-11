import { Component } from 'react'
import { View } from '@tarojs/components'
import { inject } from 'mobx-react'
import { getMyAddress } from '@/https'
import { User } from '../../../store/user'
import './address.scss'

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
    getMyAddress({openid: openId}).then(data => {
        console.log('getMyAddress', data)
        this.setState({
          addressList: data.address
        })
      })
  }
  render () {
    const { addressList } = this.state
    return (
      <View className='my-address'>
        {
          addressList.map(i => {
            const addressInfo = `${i.province}${i.city}${i.area}${i.road}`
            return (
              <View className='content'>
                <View className='ft24'>收件地址：{ addressInfo }</View>
                <View className='ft24'>手机号：{ i.tel }</View>
                <View className='ft24'>收件人：{ i.receiver }</View>
              </View>
            )
          })
        }
      </View>
    )
  }
} 

export default ChannelCopperation