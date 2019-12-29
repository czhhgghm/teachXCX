import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtInput, AtForm, AtButton, AtDrawer } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ usersManage, common }) => ({
  teacherList: usersManage.teacherList,
  ...common
}))

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state={
      showDrawer: false,
      teacherItems: [],
      selectTeacherId: -1,
      courseDetail: '',
      daysAndTimes: {},
      selectTeacherName: '',
      courseBeginTime:'',
      courseEndTime: '',
      courseName: '',
      coursePlace: '',
    }
  };

  config = {
    navigationBarTitleText: '添加课程'
  }

  componentWillMount () {
    
  }

  componentDidMount () {
    this.getTeacher()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChangeCourseBeginTime = value => {
    this.setState({
      courseBeginTime: value
    })
  }

  handleChangeCourseEndTime = value => {
    this.setState({
      courseEndTime: value
    })
  }

  handleChangeCourseName = value => {
    this.setState({
      courseName: value
    })
  }

  handleChangeCoursePlace = value => {
    this.setState({
      coursePlace: value
    })
  }

  handleChangeCourseDetail = value => {
    this.setState({
      courseDetail: value
    })
  }

  handleCompute() {
    const {courseDetail} = this.state
    const dateArr = courseDetail.split('/')
    const week = ['周一','周二','周三','周四','周五','周六','周日']
    const dayTime = ['上午','下午','晚上']
    const res = {}
    for(let i=0;i<dateArr.length;i++) {
      let font = dateArr[i].substring(0,2)
      let end = dateArr[i].substring(2)
      let value = [dayTime.indexOf(end)+1]
      let key = week.indexOf(font) + 1
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

  addClass() {
    const {dispatch} = this.props
    const { courseBeginTime, courseName, daysAndTimes, courseEndTime, coursePlace, selectTeacherId } = this.state
    const {id} = this.$router.params
    dispatch({
      type:'common/addClass',
      payload:{
        begin: courseBeginTime,
        courseName,
        daysAndTimes,
        end: courseEndTime,
        place: coursePlace,
        studentId: Number(id),
        teacherId: selectTeacherId
      }
    },this.clearView())
  }

  clearView() {
    this.setState({
      courseName: '',
      coursePlace: '',
      courseDetail: '',
      courseBeginTime: '',
      courseEndTime: '',
    })
  }

  getTeacher() {
    const {dispatch} = this.props
    dispatch({
      type:'usersManage/getTeachersList',
      payload:{}
    })
  }

  showTeacher() {
    const {teacherList} = this.props
    const teacherItems = []
    teacherList.forEach((item) => {
      teacherItems.push(item.name)
    });
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



  render () {
    const checkTeacher = this.state.selectTeacherName == '' ? '选择老师' : this.state.selectTeacherName
    return (
      <View className='index'>
        <AtForm>
          <AtInput
            name='courseName'
            title='课程名称'
            type='text'
            placeholder='请输入课程名称'
            value={this.state.courseName}
            onChange={this.handleChangeCourseName.bind(this)}
          />
          <AtInput
            name='coursePlace'
            title='上课地点'
            type='text'
            placeholder='请输入上课地点'
            value={this.state.coursePlace}
            onChange={this.handleChangeCoursePlace.bind(this)}
          />
          <AtInput
            name='coursePlace'
            title='每周上课时间'
            type='number'
            placeholder='周*上午/周*下午/周*晚上'
            value={this.state.courseDetail}
            onChange={this.handleChangeCourseDetail.bind(this)}
            onBlur={this.handleCompute.bind(this)}
          />
          <AtInput
            name='courseBeginTime'
            title='开始上课时间'
            type='text'
            placeholder='例如2019-12-21'
            value={this.state.courseBeginTime}
            onChange={this.handleChangeCourseBeginTime.bind(this)}
          />
          <AtInput
            name='courseEndTime'
            title='结束上课时间'
            type='text'
            placeholder='例如2020-6-21'
            value={this.state.courseEndTime}
            onChange={this.handleChangeCourseEndTime.bind(this)}
          />
          
          <AtButton type='secondary' onClick={this.showTeacher.bind(this)}>{checkTeacher}</AtButton>
          <AtButton type='primary' onClick={this.addClass.bind(this)}>确认添加</AtButton>
        </AtForm>
        <AtDrawer 
          show={this.state.showDrawer} 
          mask
          onItemClick={this.clickItem.bind(this)}
          onClose={this.closeDrawer.bind(this)} 
          items={this.state.teacherItems}
        ></AtDrawer>
      </View>
    )
  }
}
