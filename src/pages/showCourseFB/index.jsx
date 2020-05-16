import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtTag, AtList, AtListItem, AtSearchBar, AtPagination } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ usersManage }) => ({
  studentList: usersManage.studentList,
  teacherList: usersManage.teacherList,
  studentPage: usersManage.studentPage,
  teacherPage: usersManage.teacherPage,
  studentTotal: usersManage.studentTotal,
  teacherTotal: usersManage.teacherTotal,
  studentCurrent: usersManage.studentCurrent,
  teacherCurrent: usersManage.teacherCurrent
}))

export default class ShowCourseFB extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studentActive: false,
      teacherActive: false,
      searchValue: '',
      searchResult: false,
      searchArr: []
    }
  }

  config = {
    navigationBarTitleText: '查看反馈'
  }

  componentDidMount() {
    const {studentList, studentPage } = this.props
    this.studentOnClick()
    console.log('studentList',studentList)
    console.log('studentPage',studentPage)
  }

  handleChangePage(e) {
    const { studentActive, teacherActive } = this.state
    const { dispatch } = this.props
    const current = e.current
    if(studentActive) {
      this.getStudentsListPage(e.current-1)
      dispatch({
        type:'usersManage/changeStudentCurrent',
        payload:{
          studentCurrent: current
        }
      })
    }
    else if(teacherActive) {
      this.getTeachersListPage(e.current-1)
      dispatch({
        type:'usersManage/changeTeacherCurrent',
        payload:{
          teacherCurrent: current
        }
      })
    }
  }

  clearSearchArr() {
    this.setState({
      searchArr: [],
      searchResult: false
    })
  }

  changeSearchValue(value) {
    this.setState({
      searchValue: value
    })
    this.clearSearchArr()
  }

  onActionClick() {
    const { searchValue, studentActive, teacherActive } = this.state
    if(studentActive) {
      const { studentList } = this.props
      studentList.forEach(item => {
        if(searchValue == item.name) {
          let res = []
          res.push(item)
          this.setState({
            searchArr: res,
            searchResult: true
          })
        }
        return
      });
    }
    if(teacherActive) {
      const { teacherList } = this.props
      teacherList.forEach(item => {
        if(searchValue == item.name) {
          let res = []
          res.push(item)
          this.setState({
            searchArr: res,
            searchResult: true
          })
        }
        return
      });
    }
    setTimeout(() => {
      const { searchArr } = this.state
      if(searchArr.length == 0) {
        Taro.showToast({
          title: '搜索的用户不存在,请重新输入',
          icon: 'none'
        })
      }
    }, 1000)
  }

  studentOnClick() {
    if(this.state.studentActive !== true) {
      const { studentList, studentPage } = this.props
      if(!studentList.length) {
        this.getStudentList()
      }
      if(!studentPage.length) {
        this.getStudentsListPage(0)
      }
      this.clearSearchArr()
      this.setState({
        studentActive: true,
        teacherActive: false
      })
    }
  }

  teacherOnClick() {
    if(this.state.teacherActive !== true) {
      const { teacherList, teacherPage } = this.props
      if(!teacherList.length) {
        this.getTeachersList()
      }
      if(!teacherPage.length) {
        this.getTeachersListPage(0)
      }
      this.clearSearchArr()
      this.setState({
        studentActive: false,
        teacherActive: true
      })
    }
  }

  getStudentsListPage(page) {
    const { dispatch } = this.props
    dispatch({
      type:'usersManage/getStudentsListPage',
      payload:{
        page: page
      }
    })
  }

  getTeachersListPage(page) {
    const { dispatch } = this.props
    dispatch({
      type:'usersManage/getTeachersListPage',
      payload:{
        page: page
      }
    })
  }

  getStudentList() {
    const { dispatch } = this.props
    dispatch({
      type:'usersManage/getStudentsList',
      payload:{}
    })
  }

  getTeachersList() {
    const { dispatch } = this.props
    dispatch({
      type:'usersManage/getTeachersList',
      payload:{}
    })
  }

  getClassFeedback(id) {
    const { studentActive, teacherActive } = this.state
    if(studentActive) {
      this.getStudentClassFB(id)
    }
    if(teacherActive) {
      this.getTeacherClassFB(id)
    }
  }
  
  async getStudentClassFB(id) {
    const { dispatch } = this.props
    await dispatch({
      type:'classFeedback/getStudentClassFB',
      payload:{
        studentId: id
      }
    })
    await Taro.navigateTo({
      url: '../showFBDetail/index?key=studentGetTeacherFB',      
    })
  }

  async getTeacherClassFB(id) {
    const { dispatch } = this.props
    await dispatch({
      type:'classFeedback/getTeacherClassFB',
      payload:{
        teacherId: id
      }
    })
    await Taro.navigateTo({
      url: '../showFBDetail/index?key=teacherGetStudentFB',
    })
  }

  render() {
    const { studentActive, teacherActive, searchValue, searchArr, searchResult } = this.state
    const { studentPage, teacherPage, studentTotal, teacherTotal, studentCurrent, teacherCurrent } = this.props
    const page = studentActive ? studentPage : teacherActive ? teacherPage : []
    const pageSize = 8
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
        <AtSearchBar
          actionName='搜名字'
          value={searchValue}
          onChange={this.changeSearchValue.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
        <AtList>
          {
            searchResult ? (
              searchArr.map((item)=>{
                return(
                  <AtListItem
                    arrow='right'
                    key={item.id}
                    title={item.name}
                    note={item.phone}
                    onClick={this.getClassFeedback.bind(this,item.id)}
                  />
                )
              })
            ) : (
              page == []?(
                <AtListItem
                  title='暂无用户'
                />
              ):(
                page.map((item)=>{
                  return(
                    <AtListItem
                      arrow='right'
                      key={item.id}
                      title={item.name}
                      note={item.phone}
                      onClick={this.getClassFeedback.bind(this,item.id)}
                    />
                  )
                })
              )
            )
          }
        </AtList>
        {
          !searchResult && studentActive ?(
            <AtPagination 
              icon 
              total={studentTotal}
              pageSize={pageSize}
              current={studentCurrent}
              onPageChange={this.handleChangePage.bind(this)}
            >
            </AtPagination>
          )
          :!searchResult && teacherActive ?(
            <AtPagination 
              icon 
              total={teacherTotal}
              pageSize={pageSize}
              current={teacherCurrent}
              onPageChange={this.handleChangePage.bind(this)}
            >
            </AtPagination>
          )
          :''
        }
        </View>
      </View>
    )
  }
}
