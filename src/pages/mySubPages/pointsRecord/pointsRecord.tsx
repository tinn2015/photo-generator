import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { inject } from 'mobx-react'
import { pointsRecord } from '@/https'
import { User } from '../../../store/user'

import './pointsRecord.scss'

interface Record {
  amount: number
  start: string
  expired: string
  desc: string
  img: string
}

interface PointsRecord {
  props: {
    userStore: User
  },
  state: {
    recordList: Record[]
  }
}
@inject('userStore')
class PointsRecord extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recordList: [{
        amount: 10,
        start: '2021/12/11',
        expired: '2021/12/22',
        desc: 'dsdsdsdsds',
        img: 'https://zjz-photos.oss-cn-hangzhou.aliyuncs.com/202111/SDC14331.JPG'
      }]
    }
  }
  componentDidMount () {
    const { openId } = this.props.userStore.userInfo
    pointsRecord({openid: openId}).then(data => {
      console.log('pointsRecord', data)
      this.setState({
        recordList: data.points
      })
    })
  }
  render () {
    const { recordList } = this.state
    return (
      <View className='points-record'>
        {
          recordList.map(record => {
            return (
              <View className='content flex js-sb ai-c'>
                <Image className='img' mode='aspectFit' src={record.img} />
                <View className='desc ft24'>
                  <View className='text-center'>{record.desc}</View>
                  <View className='text-center'>{`${record.start} ~ ${record.expired}`}</View>
                </View>
                <View className='num text-center'>{record.amount}币</View>
              </View>
            )
          })
        }
      </View>
    )
  }
} 

export default PointsRecord