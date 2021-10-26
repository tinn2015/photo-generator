import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtButton, AtFloatLayout } from 'taro-ui'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'
import { SelectPhoto } from '../../store/selectPhoto'
import GenerateOrder from './components/generateOrder/generateOrder'

import './generatePhoto.scss'

interface GeneratePhoto {
  state: {
    changeIconBg: string,
    colorList: Array<string>,
    openPopup: boolean
  },
  props: {
    selectPhotoStore:SelectPhoto
  }
}

@inject('selectPhotoStore')
@observer
class GeneratePhoto extends Component {
  constructor (props) {
    super(props)
    this.state = {
      changeIconBg: require('../../assets/changeBg.png'),
      colorList: ['#ffffff', '#4ca3e2', '#0064d2'],
      openPopup: true
    }
  }

  reGetPhoto = () => {
    Taro.navigateTo({
      url: '/pages/photoDetail/photoDetail'
    })
  }

  togglePopup = () => {
    const { openPopup } = this.state
    this.setState({
      openPopup: !openPopup
    })
  }

  render () {
    const {changeIconBg, colorList, openPopup} = this.state
    const {photoPath} = this.props.selectPhotoStore
    return(
      <View className='generatePhoto-container flex fd-c jc-sb'>
        <View className='preview-box'>
          <Image src={photoPath}></Image>
        </View>
        <View className='change-handles bg-fff'>
          <View className='flex jc-c ai-c'>
            <Image className='generatephoto-icon' mode='scaleToFill' src={changeIconBg} />
            <View className='generatephoto-label'>换底色</View>
          </View>
          <View className='generatephoto-colors flex jc-ad ai-c'>
            {
              colorList.map(color => {
                return <View className='color-item' style={{background: color}} key={color}></View>
              })
            }
          </View>
          <View className='change-handles-btn flex jc-c ai-c'>
            <AtButton type='secondary' size='small' className='button' onClick={this.reGetPhoto}>重新拍摄</AtButton>
            <AtButton type='primary' size='small' className='button' onClick={this.togglePopup}>下载证件照</AtButton>
          </View>
        </View>
        <AtFloatLayout isOpened={openPopup} onClose={this.togglePopup}>
          <GenerateOrder></GenerateOrder>
        </AtFloatLayout>
      </View>
    )
  }
}

export default GeneratePhoto