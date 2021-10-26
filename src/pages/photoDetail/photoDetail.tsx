import { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { observer, inject } from 'mobx-react'
import { SelectPhoto } from '../../store/selectPhoto'

import './photoDetail.scss'

interface PhotoDetail {
  props: {
    selectPhotoStore: SelectPhoto
  }
}
@inject('selectPhotoStore')
@observer
class PhotoDetail extends Component {
  constructor (props) {
    super(props)
  }
  componentDidShow () {
    Taro.setNavigationBarTitle({
      title: '四六级证件照'
    })
  }

  getPhoto = (type) => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: [type, 'user'],
      success: (res) => {
        console.log(res)
        const tempFilePath = res.tempFilePaths[0]
        this.props.selectPhotoStore.setPhotoPath(tempFilePath)
        console.log(this.props.selectPhotoStore)
        Taro.navigateTo({
          url: '/pages/generatePhoto/generatePhoto'
        })
      }
    })
  }

  render () {
    return(
      <View className='photo-detail h-100'>
        <View className='take-pic-tip bg-fff'>
          sss 
        </View>

        <View className='photo-info bg-fff'>
          sss 
        </View>
        <View className='photo-detail-handles flex jc-c ai-c'>
          <AtButton type='secondary' className='button' onClick={() => {this.getPhoto('album')}}>相册选择</AtButton>
          <AtButton type='primary' className='button' onClick={() => {this.getPhoto('camera')}}>开始拍摄</AtButton>
        </View>
      </View>
    )
  }
}

export default PhotoDetail