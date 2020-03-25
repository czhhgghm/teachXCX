import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtInput, AtForm, AtButton, AtDrawer } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ usersManage }) => ({
  teacherList: usersManage.teacherList
}))

export default class AddCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courseName: '',
      coursePlace: '',
      weeklyTimeStr: '',
      daysAndTimes: {},
      courseBeginTime:'',
      courseEndTime: '',
      showDrawer: false,
      inputBeginTime: '',
      inputEndTime: '',
      teacherItems: [],
      selectTeacherId: -1,
      selectTeacherName: ''
    }
  }

  config = {
    navigationBarTitleText: '添加课程'
  }

  componentWillMount() {
    this.getTeachersList()
  }

  componentWillUnmount() {
    this.clearView()
  }

  getTeachersList() {
    const { dispatch } = this.props
    dispatch({
      type:'usersManage/getTeachersList',
      payload:{}
    })
  }

  checkCourseName() {
    const { courseName } = this.state
    if(!courseName) {
      wx.showToast({
        title: '该项不能为空,请登记课程名称',
        icon: 'none',
        duration: 2000
      })
    }
  }

  checkCoursePlace() {
    const { coursePlace } = this.state
    if(!coursePlace) {
      wx.showToast({
        title: '该项不能为空,请登记上课地点',
        icon: 'none',
        duration: 2000
      })
    }
  }

  checkBeginTime() {
    const { inputBeginTime } = this.state
    if(!inputBeginTime) {
      wx.showToast({
        title: '开始上课时间为空,请按要求输入',
        icon: 'none',
        duration: 2000
      })
    }
    else {
      let handleCourseBeginTime = inputBeginTime.replace(/\//g,"-")
      let tempArr = handleCourseBeginTime.split('-')
      for(let i=0;i<tempArr.length;i++) {
          if(tempArr[i].length<2) {
              tempArr[i] = '0' + tempArr[i]
          }
      }
      handleCourseBeginTime = tempArr.join('-')
      const res = handleCourseBeginTime.match(/^(\d{4})-(\d{2})-(\d{2})$/)
      if(res == null) {
        wx.showToast({
          title: '输入格式有误,请按要求输入',
          icon: 'none',
          duration: 2000
        })
      }
      else {
        this.setState({
          courseBeginTime: handleCourseBeginTime
        })
      }
    }
  }

  checkEndTime = () => {
    const { inputEndTime } = this.state
    if(!inputEndTime) {
      wx.showToast({
        title: '结束上课时间为空,请按要求输入',
        icon: 'none',
        duration: 2000
      })
    }
    else {
      let handleCourseEndTime = inputEndTime.replace(/\//g,"-")
      let tempArr = handleCourseEndTime.split('-')
      for(let i=0;i<tempArr.length;i++) {
          if(tempArr[i].length<2) {
              tempArr[i] = '0' + tempArr[i]
          }
      }
      handleCourseEndTime = tempArr.join('-')
      const res = handleCourseEndTime.match(/^(\d{4})-(\d{2})-(\d{2})$/)
      if(res == null) {
        wx.showToast({
          title: '输入格式有误,请按要求输入',
          icon: 'none',
          duration: 2000
        })
      }
      else {
        this.setState({
          courseEndTime: handleCourseEndTime
        })
      }
    }
  }

  changeCourseBeginTime = value => {
    this.setState({
      inputBeginTime: value
    })
  }

  changeCourseEndTime = value => {
    this.setState({
      inputEndTime: value
    })
  }

  changeCourseName = value => {
    this.setState({
      courseName: value
    })
  }

  changeCoursePlace = value => {
    this.setState({
      coursePlace: value
    })
  }

  changeWeeklyTime = value => {
    this.setState({
      weeklyTimeStr: value
    })
  }

  checkWeeklyTime() {
    const { weeklyTimeStr } = this.state
    if(!weeklyTimeStr) {
      wx.showToast({
        title: '该项不能为空,请按照规范登记每周上课时间',
        icon: 'none',
        duration: 2000
      })
    }
    else {
      const dateArr = weeklyTimeStr.split('/')
      const week = ['周一','周二','周三','周四','周五','周六','周日']
      const dayTime = ['上午','下午','晚上']
      const res = {}
      for(let i=0;i<dateArr.length;i++) {
        const font = dateArr[i].substring(0,2)
        const end = dateArr[i].substring(2)
        const value = [dayTime.indexOf(end)+1]
        const key = week.indexOf(font)+1
        if(res[key]) {
          res[key] = res[key].concat(value)
        }
        else {
          res[key] = value
        }
      }
      this.setState({
        daysAndTimes: res
      })
    }
  }

  clearView() {
    this.setState({
      courseName: '',
      coursePlace: '',
      weeklyTimeStr: '',
      courseBeginTime: '',
      courseEndTime: ''
    })
  }

  showTeacherDrawer() {
    const { teacherList } = this.props
    const teacherItems = []
    teacherList.forEach((item) => {
      teacherItems.push(item.name)
    })
    this.setState({
      showDrawer: true,
      teacherItems,
    })
  }

  clickItem(e) {
    this.setState({
      selectTeacherId: this.props.teacherList[e].id,
      selectTeacherName: this.props.teacherList[e].name,
      showDrawer: false
    })
  }

  closeDrawer() {
    this.setState({
      showDrawer: false
    })
  }

  async addCourse() {
    const { dispatch } = this.props
    const { courseBeginTime, courseName, daysAndTimes, courseEndTime, coursePlace, selectTeacherId } = this.state
    const { id } = this.$router.params
    if(courseBeginTime && courseName && daysAndTimes && courseEndTime && coursePlace && selectTeacherId !== -1) {
      dispatch({
        type:'common/addCourse',
        payload:{
          begin: courseBeginTime,
          courseName,
          daysAndTimes,
          end: courseEndTime,
          place: coursePlace,
          studentId: Number(id),
          teacherId: selectTeacherId
        }
      })
      await Taro.showToast({
        title: '添加成功'
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '../home/index',
        })
      }, 1500)
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请完善所有信息再提交课表哦~',
        showCancel: false,
        confirmText: '继续输入'
      })
    }
  }

  render () {
    const selectTeacher = this.state.selectTeacherName == '' ? '选择老师' : this.state.selectTeacherName
    const { courseName, coursePlace, weeklyTimeStr, inputBeginTime, inputEndTime, showDrawer, teacherItems } = this.state

    return (
      <View className='index'>
        <AtForm>
          <AtInput
            name='courseName'
            title='课程名称'
            type='text'
            placeholder='请输入课程名称'
            value={courseName}
            onBlur={this.checkCourseName.bind(this)}
            onChange={this.changeCourseName.bind(this)}
          />
          <AtInput
            name='coursePlace'
            title='上课地点'
            type='text'
            placeholder='请输入上课地点'
            value={coursePlace}
            onBlur={this.checkCoursePlace.bind(this)}
            onChange={this.changeCoursePlace.bind(this)}
          />
          <AtInput
            name='weeklyTime'
            title='每周上课时间'
            type='text'
            placeholder='周*上午/周*下午/周*晚上'
            value={weeklyTimeStr}
            onChange={this.changeWeeklyTime.bind(this)}
            onBlur={this.checkWeeklyTime.bind(this)}
          />
          <AtInput
            name='courseBeginTime'
            title='开始上课时间'
            type='text'
            placeholder='例如2020-01-01'
            value={inputBeginTime}
            onBlur={this.checkBeginTime.bind(this)}
            onChange={this.changeCourseBeginTime.bind(this)}
          />
          <AtInput
            name='courseEndTime'
            title='结束上课时间'
            type='text'
            placeholder='例如2020-09-09'
            value={inputEndTime}
            onBlur={this.checkEndTime.bind(this)}
            onChange={this.changeCourseEndTime.bind(this)}
          />
          <AtButton type='secondary' onClick={this.showTeacherDrawer.bind(this)}>{selectTeacher}</AtButton>
          <AtButton type='primary' onClick={this.addCourse.bind(this)}>确认添加</AtButton>
        </AtForm>
        <AtDrawer 
          show={showDrawer} 
          mask
          onItemClick={this.clickItem.bind(this)}
          onClose={this.closeDrawer.bind(this)} 
          items={teacherItems}
        ></AtDrawer>
      </View>
    )
  }
}
