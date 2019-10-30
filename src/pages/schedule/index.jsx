import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtTabs, AtTabsPane, AtDivider } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: '',
      currentNum: 0,
    }
  };

  config = {
    navigationBarTitleText: 'schedule'
  }

  componentWillMount () {
    this.getCurrentTime()
  }

  componentDidMount () {}

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
      currentNum: value
    })
  }

  navigateToPage = url => {
    Taro.navigateTo({
      url,
    })
  }

  render () {
    const {currentNum,currentDay} = this.state
    return (
      <View className='index'>
        <View className='head'>
          <View className='head-outer'>
            <View className='head-schedule'>我的课表</View>
            <View className='head-time'>{currentDay}</View>
          </View>
        </View>
        <View className='week'>本周课表</View>
        <AtTabs
          className='main-schedule'
          animated={false}
          current={currentNum}
          tabList={[
            { title: '一' },
            { title: '二' },
            { title: '三' },
            { title: '四' },
            { title: '五' },
            { title: '六' },
            { title: '日' },
          ]}
          onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={currentNum} index={0}>
            <View 
              className='current-schedule at-row current-schedule-title' 
            >
              <View className='at-col  at-col-3'>科目</View>
              <View className='at-col  at-col-2'>时间</View>
              <View className='at-col  at-col-3'>教师</View>
              <View className='at-col  at-col-4'>上课地点</View>
            </View>
            <View 
              className='current-schedule at-row' 
              onClick={this.navigateToPage.bind(
                  this,
                  '/pages/classFeedback/index'
            )}>
              <View className='at-col  at-col-3'>语文</View>
              <View className='at-col  at-col-2'>上午</View>
              <View className='at-col  at-col-3'>易中天</View>
              <View className='at-col  at-col-4'>广东省白云区</View>
            </View>
            <View 
              className='current-schedule at-row' 
              onClick={this.navigateToPage.bind(
                  this,
                  '/pages/classFeedback/index'
            )}>
              <View className='at-col  at-col-3'>数学</View>
              <View className='at-col  at-col-2'>下午</View>
              <View className='at-col  at-col-3'>毛不易</View>
              <View className='at-col  at-col-4'>广东省天河区</View>
            </View>
            <View 
              className='current-schedule at-row' 
              onClick={this.navigateToPage.bind(
                  this,
                  '/pages/classFeedback/index'
            )}>
              <View className='at-col  at-col-3'>英语</View>
              <View className='at-col  at-col-2'>晚上</View>
              <View className='at-col  at-col-3'>草匠中</View>
              <View className='at-col  at-col-4'>广东省番禺区</View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentNum} index={1}>
            <AtDivider content='暂无课表' fontColor='#999' lineColor='#e5e5e5' />
          </AtTabsPane>
          <AtTabsPane current={currentNum} index={2}>
            <AtDivider content='暂无课表' fontColor='#999' lineColor='#e5e5e5' />
          </AtTabsPane>
          <AtTabsPane current={currentNum} index={3}>
            <AtDivider content='暂无课表' fontColor='#999' lineColor='#e5e5e5' />
          </AtTabsPane>
          <AtTabsPane current={currentNum} index={4}>
            <AtDivider content='暂无课表' fontColor='#999' lineColor='#e5e5e5' />
          </AtTabsPane>
          <AtTabsPane current={currentNum} index={5}>
            <AtDivider content='暂无课表' fontColor='#999' lineColor='#e5e5e5' />
          </AtTabsPane>
          <AtTabsPane current={currentNum} index={6}>
            <AtDivider content='暂无课表' fontColor='#999' lineColor='#e5e5e5' />
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
