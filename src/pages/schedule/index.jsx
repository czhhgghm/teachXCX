import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props);
  };

  config = {
    navigationBarTitleText: 'schedule'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View className='head'>
          <View className='head-outer'>
            <View className='head-schedule'>我的课表</View>
            <View className='head-time'>2019-09-26</View>
          </View>
        </View>
        <View className='week'>第4周</View>
        <View>下面内容</View>
      </View>
    )
  }
}
