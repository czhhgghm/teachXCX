import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtTabs, AtTabsPane, AtDivider, AtNoticebar  } from 'taro-ui'
import { connect } from '@tarojs/redux'
import {getCurrentTime} from '../../utils/api'

@connect(({ common, schedule }) => ({
  id: common.id,
  studentsCourse: schedule.studentsCourse,
  teachersCourse: schedule.teachersCourse,
  showCourse: schedule.showCourse
}))

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: '',
      currentNum: 0,
      atNoticebarSpeed: 50,
      showatNoticebar: true,
    }
  };

  config = {
    navigationBarTitleText: '我的课表'
  }

  componentWillMount () {
    this.getTime()
    this.closeAtNoticebar()
  }

  componentDidMount () {
    this.getCurrentSchedule()
  }

  async getCurrentSchedule() {
    const {key} = this.$router.params
    key == '学生' ? (
        this.getStudentsCourse()
    ) : (
        this.getTeachersCourse()
    )
  }

  getStudentsCourse() {
    const { studentsCourse } = this.props
    if(!studentsCourse.length) {
      const { dispatch, id } = this.props
      dispatch({
        type:'schedule/getStudentsCourse',
        payload:{
          id: id
        }
      })
    }
  }

  getTeachersCourse() {
    const { teachersCourse } = this.props
    if(!teachersCourse.length) {
      const { dispatch, id } = this.props
      dispatch({
        type:'schedule/getTeachersCourse',
        payload:{
          id: id
        }
      })
    }
  }

  closeAtNoticebar() {
    setTimeout(() => {
      this.setState({
        showatNoticebar: false
      })
    }, 20000);
  }

  //得到当天的时间
  getTime() {
    let res = getCurrentTime();
    this.setState({
      currentDay: res.currentDay,
      currentNum: res.day
    })
  }

  clickChangeDays = value => {
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
    const {currentNum,currentDay,atNoticebarSpeed,showatNoticebar} = this.state
    const {studentsCourse,teachersCourse,showCourse} = this.props
    const {key} = this.$router.params
    const tabList = [
      { title: '日' },
      { title: '一' },
      { title: '二' },
      { title: '三' },
      { title: '四' },
      { title: '五' },
      { title: '六' }
    ]

    return (
      <View className='index'>
        <View className='head'>
          <View className='head-outer'>
            <View className='head-schedule'>我的课表</View>
            <View className='head-time'>{currentDay}</View>
          </View>
        </View>
        {
          showatNoticebar?(
            <AtNoticebar marquee icon='volume-plus' speed={atNoticebarSpeed}>
              继续点击下列课程,可以留下对课堂反馈哟~~
            </AtNoticebar>
          ):''
        }
        <View className='week'>本周课表</View>
        <AtTabs
          className='main-schedule'
          animated={false}
          current={currentNum}
          tabList={tabList}
          onClick={this.clickChangeDays.bind(this)}>
          {
            key == '学生' && studentsCourse.map((item,index)=>{
              return (
                <AtTabsPane current={currentNum} index={index}>
                {
                  showCourse[index]?(
                    <View>
                      <View 
                        className='current-schedule at-row current-schedule-title' 
                      >
                        <View className='at-col  at-col-3'>科目</View>
                        <View className='at-col  at-col-2'>时间</View>
                        <View className='at-col  at-col-3'>教师</View>
                        <View className='at-col  at-col-4'>上课地点</View>
                      </View>
                      {
                        item.map((ele)=>{
                          return (
                            ele == null?'':
                            <View 
                              className='current-schedule at-row' 
                              onClick={this.navigateToPage.bind(
                                  this,
                                  `/pages/courseFeedback/index?id=${ele.id}`
                            )}>
                              <View className='at-col  at-col-3'>{ele.courseName}</View>
                              <View className='at-col  at-col-2'>{ele.timeDes}</View>
                              <View className='at-col  at-col-3'>{ele.teacherName}</View>
                              <View className='at-col  at-col-4'>{ele.place}</View>
                            </View>
                          )
                        })
                      }
                    </View>
                  ):(
                    <AtTabsPane current={currentNum} index={index}>
                      <AtDivider content='今日无课' fontColor='#999' lineColor='#e5e5e5' />
                    </AtTabsPane>
                  )
                }
                </AtTabsPane>
              )
            })
          }
          {
            key == '老师' && teachersCourse.map((item,index)=>{
              return (
                <AtTabsPane current={currentNum} index={index}>
                {
                  showCourse[index]?(
                    <View>
                      <View 
                        className='current-schedule at-row current-schedule-title' 
                      >
                        <View className='at-col  at-col-3'>科目</View>
                        <View className='at-col  at-col-2'>时间</View>
                        <View className='at-col  at-col-3'>教师</View>
                        <View className='at-col  at-col-4'>上课地点</View>
                      </View>
                      {
                        item.map((ele)=>{
                          return (
                            ele == null?'':
                            <View 
                              className='current-schedule at-row' 
                              onClick={this.navigateToPage.bind(
                                  this,
                                  `/pages/courseFeedback/index?id=${ele.id}`
                            )}>
                              <View className='at-col  at-col-3'>{ele.courseName}</View>
                              <View className='at-col  at-col-2'>{ele.timeDes}</View>
                              <View className='at-col  at-col-3'>{ele.teacherName}</View>
                              <View className='at-col  at-col-4'>{ele.place}</View>
                            </View>
                          )
                        })
                      }
                    </View>
                  ):(
                    <AtTabsPane current={currentNum} index={index}>
                      <AtDivider content='今日无课' fontColor='#999' lineColor='#e5e5e5' />
                    </AtTabsPane>
                  )
                }
                </AtTabsPane>
              )
            })
          }
        </AtTabs>
      </View>
    )
  }
}
