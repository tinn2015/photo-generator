import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { inject } from 'mobx-react'
import { getMyBalance } from '@/https'
import { formatTime } from '@/utils/index'
import { User } from '../../../store/user'

import './myBalance.scss'

interface balance {
  key: number
  amount: number
  state: number
  expired: string
  start: string
  desc: string
}

interface MyBalance {
  props: {
    userStore: User
  },
  state: {
    currentTab: 0,
    expiredList: balance[],
    notUsedList: balance[],
    usedList: balance[]
  }
}
@inject('userStore')
class MyBalance extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTab: 0,
      expiredList: [],
      notUsedList: [],
      usedList: []
    }
  }
  componentDidMount () {
    const { openId } = this.props.userStore.userInfo
    getMyBalance({openid: openId}).then(data => {
        console.log('getMyBalance', data)
        this.formatBalance(data.goods)
      })
  }

  formatBalance = (balances) => {
    let expiredList: balance[] = []
    let notUsedList: balance[] = []
    let usedList: balance[] = []
    let key = 0
    balances.forEach(i => {
      i.key = key + 1
      // 未使用
      if (i.state === 0) {
        notUsedList.push(i)
      } else if (i.state === 1) {
        usedList.push(i)
      } else if (i.state === 2) {
        expiredList.push(i)
      } else {
        console.warn('未知的优惠券类型:', JSON.stringify(i))
      }
    })
    this.setState({
      expiredList,
      notUsedList,
      usedList
    })
  }

  handleClick = (value) => {
    this.setState({
      currentTab: value
    })
  }

  getItemView = (i) => {
    return (
      <View key={i.key} className='balance-item flex jc-c ai-c'>
        <View className='c-fff balance-item-left text-center'>￥{i.amount}</View>
        <View className='c-fff balance-item-right text-center'>
          <View className='ft24'>{i.desc}</View>
          <View className='ft24'>{`${formatTime(i.start)} ~ ${formatTime(i.expired)}`}</View>
        </View>
      </View>
    )
  }

  render () {
    const { currentTab, notUsedList, usedList, expiredList } = this.state
    const tabList = [{ title: '未使用' }, { title: '已使用' }, { title: '已过期' }]
    return (
      <View className='balance'>
        <AtTabs current={currentTab} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={currentTab} index={0} >
            {
              notUsedList.map(i => {
                return this.getItemView(i)
              })
            }
          </AtTabsPane>
          <AtTabsPane current={currentTab} index={1}>
            {
                usedList.map(i => {
                  return this.getItemView(i)
                })
              }
          </AtTabsPane>
          <AtTabsPane current={currentTab} index={2}>
            {
                expiredList.map(i => {
                  return this.getItemView(i)
                })
              }
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
} 

export default MyBalance