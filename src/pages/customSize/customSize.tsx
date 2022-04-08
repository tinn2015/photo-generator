import { Component } from 'react'
import { View, Image, RadioGroup, Radio } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getPhotoDetail, upload } from '@/utils/https'
import { AtButton, AtToast, AtInput, AtRadio } from 'taro-ui'
import { observer, inject } from 'mobx-react'
import { Photo, PreviewInfo, PhotoDetailType } from '../../store/photo'

import './customSize.scss'

interface customSize {
  state: {
    photoDetail: PhotoDetailType,
    loading: boolean,
    height: string | undefined,
    width: string | undefined,
    unit: string
  }
  props: {
    photoStore: Photo
  }
}
@inject('photoStore')
@observer
class customSize extends Component {
  constructor (props) {
    super(props)
    this.state = {
      unit: 'mm',
      height: undefined,
      width: undefined,
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
    const {width, height} = this.state
    if (!width && !height ) {
      Taro.showToast({
        icon: 'none',
        title: '请输入照片尺寸'
      })
      return
    }
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
    const { unit, height, width } = this.state

    const bgColor = bg_color.map((i) => {
       return i.replace('#', '')
    })

    const key = `size_${unit}`

    upload({
      path,
      data: {'bg-color': bgColor.join(','), mid: id, [key]: `${width}x${height}`}
    }).then((res: PreviewInfo) => {
      // debugger
      console.log('jobCreate', res)
      this.getPhotoDetail()
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

  unitChange = (e) => {
    const {photoStore} = this.props
    photoStore.setCustomSize('unit', e)
    this.setState({
      unit: e
    })
  }

  getPhotoHeight = (e) => {
    console.log('height', e, typeof e)
    const {photoStore} = this.props
    photoStore.setCustomSize('height', e)
    this.setState({
      height: e
    })
    return e
  }

  getPhotoWidth = (e) => {
    const {photoStore} = this.props
    photoStore.setCustomSize('width', e)
    this.setState({
      width: e
    })
    return e
  }

  render () {
    const { photoDetail, loading, unit } = this.state
    const { example_show:preview } = photoDetail
    return(
      <View className='custom-size h-100 bg-gray'>
        <View>
          {/* 请上传照片（这里样式后面补齐） */}
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
            <View className='photo-title ft28 c-333'>{photoDetail.title}</View>
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
          <View className='size-info bg-fff'>
            <View className='ft28 c-333'>选择单位</View>
            <View className='size-input'>
              <RadioGroup className='radio-group'>
                <Radio value='mm' checked={unit === 'mm'} className='ft24' onClick={() => this.unitChange('mm')}>mm</Radio>
                <Radio value='px' checked={unit === 'px'} className='ft24' style='margin-left: 20px' onClick={() => this.unitChange('px')}>px</Radio>
              </RadioGroup>
              <View className='flex jc-c ai-c'>
                <AtInput
                  name='width'
                  required
                  type='number'
                  onChange={this.getPhotoWidth.bind(this)}
                  className='text-center input c-333 ft24'
                  value={this.state.width}
                  placeholder='请输入照片宽'
                />
                X
                <AtInput
                  name='height'
                  required
                  type='number'
                  value={this.state.height}
                  className='text-center input c-333 ft24'
                  onChange={this.getPhotoHeight}
                  placeholder='请输入照片长'
                />
            </View>
            </View>
          </View>
        </View>
        <View className='common-handles photo-detail-handles flex jc-ad ai-c'>
          <AtButton type='secondary' className='button' onClick={() => {this.getPhoto('album')}}>相册选择</AtButton>
          <AtButton type='primary' className='button' onClick={() => {this.getPhoto('camera')}}>开始拍摄</AtButton>
        </View>
        <AtToast isOpened={loading} status='loading' duration={0} text='图片处理中' hasMask></AtToast>
      </View>
    )
  }
}

export default customSize