import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getPhotoDetail, upload } from '@/utils/https'
import { AtButton, AtToast } from 'taro-ui'
import { observer, inject } from 'mobx-react'
import photo, { Photo, PreviewInfo, PhotoDetailType } from '../../store/photo'

import './photoDetail.scss'

interface PhotoDetail {
  state: {
    photoDetail: PhotoDetailType,
    loading: boolean
  }
  props: {
    photoStore: Photo
  }
}
@inject('photoStore')
@observer
class PhotoDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photoDetail: {
        example_show: {
          img: '',
          icon: '',
          desc: []
        },
        title: '',
        desc: [],
        bg_color: []
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
    const { photoDetail, loading } = this.state
    const { example_show:preview } = photoDetail
    return(
      <View className='photo-detail h-100'>
        <View className='take-pic-tip bg-fff flex jc-sb ai-c'>
          <Image className='preview' src={preview.img || ''} />
          <View className='take-pic-desc flex fd-c jc-ad ai-fs'>
            {
              preview.desc && preview.desc.length && preview.desc.map(item => {
                return (
                  <View className='desc-item flex jc-c ai-c' key={item}>
                    <Image className='icon' src={preview.icon} />
                    <View className='item ft24 c-333'>{item}</View>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View className='photo-info bg-fff'>
          <View className='photo-title'>{photoDetail.title}</View>
          <View className='desc'>
          {
            photoDetail.desc && photoDetail.desc.length && photoDetail.desc.map(desc => {
              return (
                <View key={desc} className='ft24 c-333 item'>{desc}</View>
              )
            })
          }
            <View className='ft24 c-333 item flex ai-c'>
              背景色：{
                photoDetail.bg_color && photoDetail.bg_color.length && photoDetail.bg_color.map(color => {
                  return <View key={color} className='color' style={{"background": color}}></View>
                })
              }
            </View>
          </View>
        </View>
        <View className='photo-detail-handles flex jc-c ai-c'>
          <AtButton type='secondary' className='button' onClick={() => {this.getPhoto('album')}}>相册选择</AtButton>
          <AtButton type='primary' className='button' onClick={() => {this.getPhoto('camera')}}>开始拍摄</AtButton>
        </View>
        <AtToast isOpened={loading} status='loading' duration={0} text='图片处理中' hasMask></AtToast>
      </View>
    )
  }
}

export default PhotoDetail