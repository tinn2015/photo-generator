import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { inject } from 'mobx-react'
import { queryOrders } from '@/https'
import { formatTime } from '@/utils'
import { User } from '../../../store/user'

import './myOrders.scss'

interface good {
  job_id: string
  amount: number
  state: number // 0完成，1等待付款，2超时，其他
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

  render () {
    const { currentTab, needPayList, allOrders} = this.state
    const tabList = [{ title: '全部' }, { title: '待支付' }]
    return (
      <View className='my-orders'>
        <AtTabs current={currentTab} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={currentTab} index={0} >
          {
              allOrders.length ? allOrders.map(order => {
                return (
                  <View className='order' key={order.key}>
                    <View className='start-time c-333 ft28'>{formatTime(order.create_time)}</View>
                    <View className='flex jc-fa ai-c good-info'>
                      <Image className='good-img' mode='aspectFit' src={order.img} />
                      <View className='good-desc c-333 ft28'>{order.desc}</View>
                    </View>
                    <View className='flex jc-sb ai-c'>
                      <View className='ft24 c-333 flex jc-c ai-c'>实付款：<View className='c-ff5722 ft28'>￥{order.amount}</View></View>
                      {
                        order.state === 1 ? <View className='c-fff btn ft24'>去付款</View> : <View className='c-fff done-btn ft24'>已完成</View>
                      }
                    </View>
                  </View>
                )
              }) : ''
            }
          </AtTabsPane>
          <AtTabsPane current={currentTab} index={1}>
          {
              needPayList.length && allOrders.map(order => {
                return (
                  <View className='order' key={order.key}>
                    <View className='start-time c-333 ft28'>{formatTime(order.create_time)}</View>
                    <View className='flex jc-fa ai-c good-info'>
                      <Image className='good-img' mode='aspectFit' src={order.img} />
                      <View className='good-desc'>{order.desc}</View>
                    </View>
                    <View className='flex jc-sb ai-c'>
                      <View className='ft24 c-333 flex jc-c ai-c'>实付款：<View className='c-ff5722 ft28'>￥{order.amount}</View></View>
                      <View className='c-fff btn ft24'>去付款</View>
                    </View>
                  </View>
                )
              })
            }
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
} 

export default MyOrders