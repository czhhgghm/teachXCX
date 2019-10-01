import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: ''
    }
  };

  config = {
    navigationBarTitleText: 'schedule'
  }

  componentWillMount () {}

  componentDidMount () {
    this.getCurrentTime()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () {}

  //得到当天的时间
  getCurrentTime() {
    let now = new Date();
    let year = now.getFullYear();
	  let month = now.getMonth()+1;
	  let date = now.getDate();
    let currentDay = year + '-' + month + '-' + date
    this.setState({
      currentDay:currentDay
    })
  }

  render () {
    return (
      <View className='index'>
        <View className='head'>
          <View className='head-outer'>
            <View className='head-schedule'>我的课表</View>
            <View className='head-time'>{this.state.currentDay}</View>
          </View>
        </View>
        <View className='week'>本周课表</View>
        <View>下面内容</View>
      </View>
    )
  }
}
