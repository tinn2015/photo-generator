import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtButton, AtFloatLayout } from 'taro-ui'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'
import { Photo } from '../../store/photo'
import { User } from '../../store/user'
import GenerateOrder from './components/generateOrder/generateOrder'

import './generatePhoto.scss'

interface GeneratePhoto {
  state: {
    changeIconBg: string,
    openPopup: boolean,
    selectedBg: string,
    colorList: Array<string>
  },
  props: {
    photoStore: Photo,
    userStore: User
  }
}

@inject('photoStore', 'userStore')
@observer
class GeneratePhoto extends Component {
  constructor (props) {
    super(props)
    this.state = {
      changeIconBg: require('../../assets/changeBg.png'),
      openPopup: false,
      selectedBg: '',
      colorList: []
    }
  }

  componentDidMount () {
    const {photoStore: {previewInfo: { preview }}} = this.props
    const colorList = Object.keys(preview)
    this.setState({
      colorList,
      selectedBg: colorList[0]
    })
  }

  changeBg = (color: string) => {
    this.setState({
      selectedBg: color
    })
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
    const {changeIconBg, openPopup, selectedBg, colorList} = this.state
    const { photoStore, userStore } = this.props
    const {photoStore: {previewInfo: {preview }, photoDetail: {desc}}} = this.props
    return(
      <View className='generatePhoto-container flex fd-c jc-sb'>
        <View className='preview-box flex jc-c ai-c'>
          <Image mode='aspectFit' src={preview[selectedBg]}></Image>
        </View>
        <View className='photo-size flex jc-c ai-c'>
          <View className='flex fd-c'>
          {
            desc && desc.map(item => {
              return <View className='ft24 c-333' key={item}>{item}</View>
            })
          }
          </View>
        </View>
        <View className='change-handles bg-fff'>
          <View className='flex jc-c ai-c'>
            <Image className='generatephoto-icon' mode='scaleToFill' src={changeIconBg} />
            <View className='generatephoto-label'>换底色</View>
          </View>
          <View className='generatephoto-colors flex jc-ad ai-c'>
            {
              colorList.map(color => {
                return <View className='color-item-box' key={color} style={{'borderBottom': selectedBg === color ? `3px solid ${selectedBg}` : 'none'}}>
                  <View className='color-item' style={{background: color}} onClick={() => {this.changeBg(color)}}></View>
                </View>
              })
            }
          </View>
          <View className='change-handles-btn flex jc-c ai-c'>
            <AtButton type='secondary' size='small' className='button' onClick={this.reGetPhoto}>重新拍摄</AtButton>
            <AtButton type='primary' size='small' className='button' onClick={this.togglePopup}>下载证件照</AtButton>
          </View>
        </View>
        <AtFloatLayout isOpened={openPopup} onClose={this.togglePopup}>
          <GenerateOrder photoStore={photoStore} userStore={userStore} selectBg={selectedBg}></GenerateOrder>
        </AtFloatLayout>
      </View>
    )
  }
}

export default GeneratePhoto