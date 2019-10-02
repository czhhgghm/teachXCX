import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtTabs, AtTabsPane } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: '',
      current: 0,
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

  handleClick = value => {
    this.setState({
      current: value
    })
  }

  navigateToPage = url => {
    Taro.navigateTo({
      url,
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
        <AtTabs
          className='main-schedule'
          animated={false}
          current={this.state.current}
          tabList={[
            { title: '一' },
            { title: '二' },
            { title: '三' },
            { title: '四' },
            { title: '五' },
            { title: '六' },
            { title: '日' }
          ]}
          onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0}>
            <View 
              className='current-schedule at-row' 
              onClick={this.navigateToPage.bind(
                  this,
                  '/pages/studentFeedback/index'
            )}>
                <View className='at-col  at-col-2'>语文</View>
                <View className='at-col  at-col-4'>13:00-15:00期间</View>
                <View className='at-col  at-col-3'>易中天</View>
                <View className='at-col  at-col-3'>广东省白云区</View>
            </View>
            <View 
              className='current-schedule at-row' 
              onClick={this.navigateToPage.bind(
                  this,
                  '/pages/studentFeedback/index'
            )}>
                <View className='at-col  at-col-2'>数学</View>
                <View className='at-col  at-col-4'>15:30-17:30期间</View>
                <View className='at-col  at-col-3'>毛不易</View>
                <View className='at-col  at-col-3'>广东省天河区</View>
            </View>
            <View 
              className='current-schedule at-row' 
              onClick={this.navigateToPage.bind(
                  this,
                  '/pages/studentFeedback/index'
            )}>
                <View className='at-col  at-col-2'>英语</View>
                <View className='at-col  at-col-4'>18:00-20:00期间</View>
                <View className='at-col  at-col-3'>草匠中</View>
                <View className='at-col  at-col-3'>广东省番禺区</View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View className='current-schedule'>星期二的课程</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View className='current-schedule'>星期三的课程</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <View className='current-schedule'>星期四的课程</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={4}>
            <View className='current-schedule'>星期五的课程</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={5}>
            <View className='current-schedule'>星期六的课程</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={6}>
            <View className='current-schedule'>星期日的课程</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
