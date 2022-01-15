import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getPhotoDetail, upload } from '@/utils/https'
import { AtButton, AtToast } from 'taro-ui'
import { observer, inject } from 'mobx-react'
import { Photo, PreviewInfo, PhotoDetailType } from '../../store/photo'

import './changeBg.scss'

interface ChangeBg {
  state: {
    photoDetail: PhotoDetailType,
    changeIconBg: string,
    loading: boolean
  }
  props: {
    photoStore: Photo
  }
}
@inject('photoStore')
@observer
class ChangeBg extends Component {
  constructor (props) {
    super(props)
    this.state = {
      changeIconBg: require('../../assets/changebg.png'),
      photoDetail: {
        example_show: {
          img: '',
          icon: '',
          desc: []
        },
        title: '',
        desc: [],
        bg_color: [],
        ele_price: 0,
        ele_opt_price: 0,
        obj_price: 0,
        obj_opt_price: 0
      },
      loading: false
    }
  }
  componentDidMount () {
    this.getPhotoDetail()
  }

  getPhotoDetail = () => {
    const photoId = this.props.photoStore.photoInfo.id
    getPhotoDetail({id: photoId}).then((res: PhotoDetailType) => {
      console.log('getPhotoDetail', res)
      const { photoStore } = this.props
      photoStore.setPhotoDetail(res)
      Taro.setNavigationBarTitle({
        title: res.title
      })
      this.setState({
        photoDetail: res
      })
    })
  }

  getPhoto = (type) => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: [type, 'user'],
      success: (res) => {
        this.setState({
          loading: true
        })
        const tempFilePath = res.tempFilePaths[0]
        this.uploadImg(tempFilePath)
        // this.props.photoStore.setPhotoPath(tempFilePath)
        // console.log(this.props.photoStore)
        // Taro.navigateTo({
        //   url: '/pages/generatePhoto/generatePhoto'
        // })
      }
    })
  }

  showLoadingToast = () => {

  }

  uploadImg = (path: string) => {
    // Taro.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
    //   filePath: tempFilePaths[0],
    //   name: 'file',
    //   formData: {
    //     'user': 'test'
    //   },
    //   success (res){
    //     const data = res.data
    //     //do something
    //   }
    // })
    const {id} = this.props.photoStore.photoInfo
    const {bg_color} = this.props.photoStore.photoDetail
    const bgColor = bg_color.map((i) => {
       return i.replace('#', '')
    })
    upload({
      path,
      data: {'bg-color': bgColor.join(','), mid: id}
    }).then((res: PreviewInfo) => {
      // debugger
      console.log('jobCreate', res)
      const { photoStore } = this.props
      photoStore.setPreviewInfo(res)
      Taro.navigateTo({
        url: '/pages/generatePhoto/generatePhoto',
        complete: () => {
          this.setState({
            loading: false
          })
        }
      })
    })
  }

  render () {
    const { photoDetail, loading, changeIconBg } = this.state
    const { example_show:preview, bg_color:colorList } = photoDetail
    return(
      <View className='change-bg flex jc-sb fd-c h-100 bg-gray'>
        <AtToast isOpened={loading} status='loading' duration={0} text='图片处理中' hasMask></AtToast>
        <View className='preview-box flex jc-c ai-c'>
          <Image mode='aspectFit' src={preview.img}></Image>
        </View>
        <View className='change-handles bg-fff'>
          <View className='flex jc-c ai-c'>
            <Image className='generatephoto-icon' mode='scaleToFill' src={changeIconBg} />
            <View className='generatephoto-label'>支持多种背景色</View>
          </View>
          <View className='generatephoto-colors flex jc-ad ai-c'>
            {
              colorList.map(color => {
                return <View className='color-item-box' key={color}>
                  <View className='color-item' style={{background: color}}></View>
                </View>
              })
            }
          </View>
          <View className='common-handles'>
            <AtButton type='secondary' className='button' onClick={() => {this.getPhoto('album')}}>相册选择</AtButton>
            <AtButton type='primary' className='button' onClick={() => {this.getPhoto('camera')}}>开始拍摄</AtButton>
          </View>
        </View>
      </View>
    )
  }
}

export default ChangeBg