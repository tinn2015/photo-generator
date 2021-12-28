import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { inject } from 'mobx-react'
import { queryOrders } from '@/https'
import { User } from '../../../store/user'

import './myOrders.scss'

interface good {
  job_id: string
  amount: number
  state: number
  expired_time: string
  create_time: string
  desc: string
  key:  number
  img: string
}

interface MyOrders {
  props: {
    userStore: User
  },
  state: {
    currentTab: 0,
    needPayList: good[],
    allOrders: good[]
  }
}
@inject('userStore')
class MyOrders extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTab: 0,
      needPayList: [],
      allOrders: []
    }
  }
  componentDidMount () {
    // @ts-ignore
    const {type} = getCurrentInstance().router?.params
    console.log(type)
    const { openId } = this.props.userStore.userInfo
    queryOrders({openid: openId}).then(data => {
        console.log('queryOrders', data)
        this.formatOrders(data.orders, type)
      })
  }

  formatOrders = (orders, type) => {
    let needPayList: good[] = []
    let key = 0
    orders.forEach(i => {
      i.key = key + 1
      // 待支付
      if (i.state === 1) {
        needPayList.push(i)
      }
    })
    this.setState({
      allOrders: orders,
      needPayList,
      currentTab: type === 'all' ? 0 : 1
    })
  }

  handleClick = (value) => {
    this.setState({
      currentTab: value
    })
  }

  formatTime (timeString) {
    const time = new Date(timeString)
    let year: string | number = time.getFullYear()
    let month: string | number = time.getMonth() + 1
    let day: string | number = time.getDate()
    let hour: string | number = time.getHours()
    let minute: string | number = time.getMinutes()
    month = month < 10 ? `0${month}` : month
    day = day < 10 ? `0${day}` : day
    hour = hour < 10 ? `0${hour}` : hour
    minute = minute < 10 ? `0${minute}` : minute
    return `${year}/${month}/${day} ${hour}:${minute}`
  }

  render () {
    const { currentTab, needPayList, allOrders} = this.state
    const tabList = [{ title: '全部' }, { title: '待支付' }]
    return (
      <View className='my-orders'>
        <AtTabs current={currentTab} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={currentTab} index={0} >
          {
              allOrders.length && allOrders.map(order => {
                return (
                  <View className='order' key={order.key}>
                    <View className='start-time'>{this.formatTime(order.create_time)}</View>
                    <View className='flex jc-sb ai-c'>
                      <Image src={order.img} />
                      <View>{order.desc}</View>
                    </View>
                    <View className='flex jc-sb ai-c'>
                      <View>实付款：{order.amount}</View>
                      <View>去付款</View>
                    </View>
                  </View>
                )
              })
            }
          </AtTabsPane>
          <AtTabsPane current={currentTab} index={1}>
            2
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
} 

export default MyOrders