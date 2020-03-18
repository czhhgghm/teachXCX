import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtTag, AtList, AtListItem } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ usersManage }) => ({
  studentList: usersManage.studentList,
  teacherList: usersManage.teacherList,
  studentFB: usersManage.studentFB,
  teacherFB: usersManage.teacherFB
}))

export default class ShowCourseFB extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studentActive: false,
      teacherActive: false
    }
  }

  config = {
    navigationBarTitleText: '查看反馈'
  }

  componentWillMount () { }

  componentDidMount () {
    this.studentOnClick()
  }

  studentOnClick() {
    if(this.props.studentList.length < 1) {
      this.getStudentList()
    }
    this.setState({
      studentActive: true,
      teacherActive: false
    })
  }

  teacherOnClick() {
    if(this.props.teacherList.length < 1) {
      this.getTeachersList()
    }
    this.setState({
      studentActive: false,
      teacherActive: true
    })
  }

  getStudentList() {
    const {dispatch} = this.props
    dispatch({
      type:'usersManage/getStudentsList',
      payload:{}
    })
  }

  getTeachersList() {
    const {dispatch} = this.props
    dispatch({
      type:'usersManage/getTeachersList',
      payload:{}
    })
  }
  
  async getStudentClassFB(id) {
    const {dispatch} = this.props
    await dispatch({
      type:'usersManage/getStudentClassFB',
      payload:{
        studentId: id
      }
    })
    await Taro.navigateTo({
      url: '../showFBDetail/index?key=studentGetTeacherFB',      
    })
  }

  async getTeacherClassFB(id) {
    const {dispatch} = this.props
    await dispatch({
      type:'usersManage/getTeacherClassFB',
      payload:{
        teacherId: id
      }
    })
    await Taro.navigateTo({
      url: '../showFBDetail/index?key=teacherGetStudentFB',
    })
  }

  render () {
    const {studentActive,teacherActive} = this.state
    const {studentList,teacherList} = this.props
    return (
      <View>
        <View>
          <AtTag
            className="tagStyle"
            name='student' 
            active={studentActive}
            onClick={this.studentOnClick.bind(this)}
          >
            学生得到反馈
          </AtTag>
          <AtTag
            className="tagStyle"
            name='teacher' 
            active={teacherActive}
            onClick={this.teacherOnClick.bind(this)}
          >
            老师得到反馈
          </AtTag>
        </View>
        <View>
        {
          studentActive?
          <AtList>
            {
              studentList == []?(''):(
                studentList.map((item)=>{
                  return(
                    <AtListItem
                      arrow='right'
                      key={item.id}
                      title={item.name}
                      note={item.phone}
                      onClick={this.getStudentClassFB.bind(this,item.id)}
                    />
                  )
                })
              )
            }
          </AtList>
          :teacherActive?
          <AtList>
            {
              teacherList == []?(''):(
                teacherList.map((item)=>{
                  return(
                    <AtListItem
                      arrow='right'
                      key={item.id}
                      title={item.name}
                      note={item.phone}
                      onClick={this.getTeacherClassFB.bind(this,item.id)}
                    />
                  )
                })
              )
            }
          </AtList>
          :''
        }
        </View>
      </View>
    )
  }
}
