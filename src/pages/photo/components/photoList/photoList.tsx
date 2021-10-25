import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './photoList.scss'

interface PhotoList {
  state: {
    lists: Array<Record<string, unknown>>
  }
}

class PhotoList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: [{
        id: 1,
        pic: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
        title: '英语四六级考试',
        tip: '支持冲印',
        size: '23x35mm'
      },{
        id: 2,
        pic: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
        title: '英语四六级考试',
        tip: '支持冲印',
        size: '23x35mm'
      }]
    }
  }

  routerToDetail = () => {
    Taro.navigateTo({
      url: '/pages/photoDetail/photoDetail'
    })
  }

  render () {
    const { lists } = this.state
    return(
      <View className='photo-list'>
        <View className='photo-ad-holder flex jc-c ai-c'>ad</View>
        <View className='photo-list-content'>
          {
            lists.map(item => {
              return <View className='photo-list-item flex jc-sb ai-c' key={item.id} onClick={this.routerToDetail}>
                <View className='list-item-pic'>
                  <Image
                    className='w-100 h-100'
                    mode='scaleToFill'
                    src={item.pic}
                  />
                </View>
                <View className='list-item-info flex fd-c jc-ad'>
                  <View className='list-item-title'>{item.title}</View>
                  <View className='list-item-tip'>{item.tip}</View>
                  <View className='list-item-size'>尺寸：{item.size}</View>
                </View>
              </View>
            })
          }
        </View>
      </View>
    )
  }
}

export default PhotoList