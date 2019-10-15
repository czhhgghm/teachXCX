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
    navigationBarTitleText: '用户管理'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  
  render () {
    return (
      <View className='index'>
        用户管理
      </View>
    )
  }
}
