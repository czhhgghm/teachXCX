import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  };

  config = {
    navigationBarTitleText: 'class Feedback'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  
  render () {
    return (
      <View className='index'>
        查看课堂反馈
      </View>
    )
  }
}
