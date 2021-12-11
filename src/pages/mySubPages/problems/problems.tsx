import { Component } from 'react'
import { View } from '@tarojs/components'
import { inject } from 'mobx-react'
import { normalQuestion } from '@/https'
import { User } from '../../../store/user'

import './problems.scss'

interface questions {
  title: string
  context: string
}

interface ChannelCopperation {
  props: {
    userStore: User
  },
  state: {
    questions: questions[]
  }
}
@inject('userStore')
class ChannelCopperation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      questions: []
    }
  }
  componentDidMount () {
    const { openId } = this.props.userStore.userInfo
    normalQuestion({openid: openId}).then(data => {
        console.log('normalQuestion', data)
        this.setState({
          questions: data.questions
        })
      })
  }
  render () {
    const { questions } = this.state
    return (
      <View className='problems'>
        {
          questions.map(i => {
            return (
            <View className='content'>
              <View className='text-center ft28'>{ i.title }</View>
              <View className='pre ft24'>{ i.context }</View>
            </View>
            )
          })
        }
      </View>
    )
  }
} 

export default ChannelCopperation