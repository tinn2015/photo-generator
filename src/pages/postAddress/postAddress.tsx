import { Component } from 'react'
import { View, Image, Picker, PickerView, PickerViewColumn, CoverView, ScrollView } from '@tarojs/components'
import { getMenuButtonBoundingClientRect } from '@/utils/index'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { AtForm, AtInput, AtList, AtListItem, AtButton, AtFloatLayout } from 'taro-ui'
import { inject } from 'mobx-react'
import { getRegionAddress, getMyAddress } from '@/https'
import { Photo } from '../../store/photo'
import { User } from '../../store/user'

import './postAddress.scss'

interface Address {
  province: string
  city: string
  area: string
  road: string
  receiver: string
  tel: string
}
interface PostAddress {
  state: {
    checkboxIcon: string
    // region: Array<string>
    selectBg: string,
    price: number,
    value: string
    regionPickerVisible: boolean,
    address: {
      province: Array<string>,
      city: Array<string>,
      area: Array<string>,
      value: Array<number>,
      cityWithArea: Record<string, string[]>
    },
    usedAddress: Address
    // addressForm: {
    //   region: string,
    //   address: string,
    //   name: string,
    //   phone: number,
    // }
  },
  props: {
    photoStore: Photo,
    userStore: User
  }
}

@inject('photoStore', 'userStore')
class PostAddress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checkboxIcon: require('../../assets/checkbox.png'),
      selectBg: '',
      price: 0,
      value: '',
      regionPickerVisible: false,
      address: {
        province: [],
        city: [],
        cityWithArea: {},
        area: [],
        value: [2, 4, 0]
      },
      usedAddress: {}
      // addressForm: {
      //   region: '',
      //   address: '',
      //   name: '',
      //   phone: 0
      // },
    }
  }

  
  componentDidMount () {
    // @ts-ignore
    const {selectBg, price} = getCurrentInstance().router?.params
    this.setState({
      selectBg,
      price
    })
    
    // 获取已有地址
    this.getMyAddress()

    // 获取省市区
    this.getRegion(null)
  }
  
  // 上传地址表单
  addressForm = {
    region: '',
    address: '',
    name: '',
    phone: 0
  }

  componentDidShow () {
  }

  // onSubmit = (event) => {
  //   console.log(this.state.value)
  // }

  // onReset = (event) => {
  //   console.log(this.state.value)
  // }

  getMyAddress = () => {
    const {openId} = this.props.userStore.userInfo
    if (!openId) return
    getMyAddress({openid: openId}).then(res => {
      this.setState({
        usedAddress: res.address[0]
      })
    })
  }

  getRegion = (province) => {
    getRegionAddress({province}).then(res => {
      const city = Object.keys(res.city)
      const area = res.city[city[0]]
      const allProvince = res.others_province
      let obj = {
        province: allProvince,
        city,
        cityWithArea: res.city,
        area
      }
      // if (res.province) {
      //   const index = allProvince.findIndex(i => {return i === res.province})
      //   const {value} = this.state.address
      //   value[0] = index
      //   // @ts-ignore
      //   obj.value = value
      // }
      const address = Object.assign(this.state.address, obj)
      this.setState({
        address
      })
    })
  }

  getPickRegion = (e) => {
    const {detail: {value}} = e
    const {value: currentValue} = this.state.address
    console.log(value, currentValue)
    let provinceChanged = false
    let cityChanged = false
    for (let i = 0; i < currentValue.length; i++) {
      if (value[0] !== currentValue[0]) {
        provinceChanged = true
        break
      }
      if (value[1] !== currentValue[1]) {
        cityChanged = true
        break
      }
    }
    if (provinceChanged) {
      const currentProvince = this.state.address.province[value[0]]
      const {address} = this.state
      this.getRegion(currentProvince)
      const obj = Object.assign(address, {value})
      this.setState({
        address: obj
      })
    }
    if (cityChanged) {
      const {address} = this.state
      let {cityWithArea, city} = address
      let area = cityWithArea[city[value[1]]]
      this.setState({
        address: Object.assign(address, {area, value})
      })
    }
  }

  setAddress = (address) => {
    // const { addressForm } = this.state
    // this.setState({
    //   addressForm: Object.assign(addressForm, {address})
    // })
    // return address
    this.addressForm.address = address
  }

  openFloatLayout = () => {
    this.setState({
      regionPickerVisible: true
    })
  }

  submit = () => {
    console.log(this.addressForm)
    const {photoStore} = this.props
    photoStore.requestPayment()
  }

  render () {
    const {checkboxIcon, selectBg, price, regionPickerVisible, address, usedAddress} = this.state
    // const {region} = this.state
    const { photoDetail, previewInfo, order } = this.props.photoStore
    return (
      <View className='post-address home flex fd-c'>
        <View className='card bg-fff'>
          <View>{photoDetail.title}</View>
          <View>
            <View className='preview-box'>
              {/* <View className='photo-preview'></View> */}
              <Image mode='aspectFit' src={previewInfo.preview[selectBg]} />
            </View>
            <View className='photo-info'>
              {
                photoDetail.desc && photoDetail.desc.length && photoDetail.desc.map(desc => {
                  return (
                    <View className='photo-info-item flex jc-fs ai-c' key={desc}>
                      <Image className='photo-info-icon' src={checkboxIcon} />
                      <View className='photo-info-label c-333 ft24'>{desc}</View>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </View>
        <View className='pay-express card bg-fff'>
          <View className='ft28'>支付方式</View>
          <View className='ft28'>配送方式</View>
        </View>
        <View className='card bg-fff'>
          <View className='ft28'>收件地址</View>
          <View className='address-form'>
            <AtInput
              name='region'
              title='地区'
              type='text'
              required
              value={usedAddress.province}
              placeholder='选择地区'
              onFocus={this.openFloatLayout}
              onChange={(v) => {console.log(v)}}
            />
            <AtInput
              name='address'
              title='地址'
              type='phone'
              required
              placeholder='输入详细地址'
              onChange={(e) => this.setAddress(e)}
            />
            <AtInput
              name='name'
              title='收货人'
              type='text'
              required
              placeholder='输入收货人姓名'
              onChange={(v) => {this.addressForm.name = v}}
            />
            <AtInput
              name='phone'
              title='手机号'
              required
              type='phone'
              error
              placeholder='输入手机号码'
              onChange={(v) => {this.addressForm.phone = v;}}
            />
          </View>
        </View>
        <View className='bottom-bar w-100 flex jc-sb ai-c bg-fff card'>
          <View>合计：¥{price}</View>
          <AtButton type='primary' size='small' onClick={this.submit}>提交订单</AtButton>
        </View>
        <CoverView style='position: relative;z-index: 100; overflow: hidden'>
          <AtFloatLayout isOpened={regionPickerVisible} title='地区选择' >
            <PickerView onChange={e => {this.getPickRegion(e)}} value={address.value} style='height: 250px; text-align: center; overflow: hidden' indicatorClass='picker-view-indicator' mask-style='overflow: hidden'>
              <PickerViewColumn className='picker-column'>
                {
                  address.province.map(province => {
                    return (
                      <View key={province}>{province}</View>
                    )
                  })
                }
              </PickerViewColumn>
              <PickerViewColumn className='picker-column'>
                {
                  address.city.map(city => {
                    return (
                      <View key={city}>{city}</View>
                    )
                  })
                }
              </PickerViewColumn>
              <PickerViewColumn className='picker-column'>
                {
                  address.area.map(area => {
                    return (
                      <View key={area}>{area}</View>
                    )
                  })
                }
              </PickerViewColumn>
            </PickerView>
          </AtFloatLayout>
        </CoverView>
      </View>
    )
  }
}

export default PostAddress