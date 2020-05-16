import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtFab, AtTag, AtList, AtListItem, AtPagination, AtSearchBar } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ usersManage }) => ({
  studentList: usersManage.studentList,
  familyList: usersManage.familyList,
  teacherList: usersManage.teacherList,
  managerList: usersManage.managerList,
  studentPage: usersManage.studentPage,
  familyPage: usersManage.familyPage,
  teacherPage: usersManage.teacherPage,
  managerPage: usersManage.managerPage,
  managerTotal: usersManage.managerTotal,
  studentTotal: usersManage.studentTotal,
  familyTotal: usersManage.familyTotal,
  teacherTotal: usersManage.teacherTotal,
  managerCurrent: usersManage.managerCurrent,
  studentCurrent: usersManage.studentCurrent,
  familyCurrent: usersManage.familyCurrent,
  teacherCurrent: usersManage.teacherCurrent
}))

export default class UsersManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      select: '',
      searchValue: '',
      searchResult: false,
      searchArr: []
    }
  };

  config = {
    navigationBarTitleText: '用户管理'
  }

  componentWillMount() {
    //进入这个页面时判断,如果之前没有相关的身份状态,就将这个状态值设置为管理员
    if(this.state.select == '') {
      this.managerOnClick()
    }
  }

  onButtonClick() {
    Taro.navigateTo({
      url: '../../pages/addUsers/index',
    })
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
    const { searchValue, select } = this.state
    if(select == '管理员') {
      const { managerList } = this.props
      managerList.forEach(item => {
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
    if(select == '学生') {
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
    if(select == '家长') {
      const { familyList } = this.props
      familyList.forEach(item => {
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
    if(select == '老师') {
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

  //每次切换身份的时候,得到这类用户的所有信息
  studentOnClick() {
    //保证有一个切换的过程,而不是在每次点击的时候都做一次判断
    if(this.state.select !== '学生') {
      const { studentList, studentPage } = this.props
      if(!studentList.length) {
        this.getStudentList()
      }
      if(!studentPage.length) {
        this.getStudentsListPage(0)
      }
      this.clearSearchArr()
      this.setState({
        select: '学生'
      })
    }
  }

  familyOnClick = async() => {
    if(this.state.select !== '家长') {
      const { familyList, familyPage } = this.props
      if(!familyList.length) {
        this.getFamilyList()
      }
      if(!familyPage.length) {
        this.getFamilyListPage(0)
      }
      this.clearSearchArr()
      this.setState({
        select: '家长'
      })
    }
  }

  teacherOnClick() {
    if(this.state.select !== '老师') {
      const { teacherList, teacherPage } = this.props
      if(!teacherList.length) {
        this.getTeachersList()
      }
      if(!teacherPage.length) {
        this.getTeachersListPage(0)
      }
      this.clearSearchArr()
      this.setState({
        select: '老师'
      })
    }
  }

  managerOnClick() {
    if(this.state.select !== '管理员') {
      const { managerList, managerPage } = this.props
      if(!managerList.length) {
        this.getManagersList()
      }
      if(!managerPage.length) {
        this.getManagersListPage(0)
      }
      this.clearSearchArr()
      this.setState({
        select: '管理员'
      })
    }
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

  getFamilyList() {
    const { dispatch } = this.props
    dispatch({
      type:'usersManage/getFamilyList',
      payload:{}
    })
  }

  getManagersList() {
    const { dispatch } = this.props
    dispatch({
      type:'usersManage/getManagersList',
      payload:{}
    })
  }

  handleChangeUser(e) {
    Taro.navigateTo({
      url: e
    })
  }

  getManagersListPage(page) {
    const { dispatch } = this.props
    dispatch({
      type:'usersManage/getManagersListPage',
      payload:{
        page: page
      }
    })
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

  getFamilyListPage(page) {
    const { dispatch } = this.props
    dispatch({
      type:'usersManage/getFamilyListPage',
      payload:{
        page: page
      }
    })
  }

  handleChangePage(e) {
    const { select } = this.state
    const { dispatch } = this.props
    const current = e.current
    if(select == '学生') {
      this.getStudentsListPage(e.current-1)
      dispatch({
        type:'usersManage/changeStudentCurrent',
        payload:{
          studentCurrent: current
        }
      })
    }
    else if(select == '管理员') {
      this.getManagersListPage(e.current-1)
      dispatch({
        type:'usersManage/changeManagerCurrent',
        payload:{
          managerCurrent: current
        }
      })
    }
    else if(select == '家长') {
      this.getFamilyListPage(e.current-1)
      dispatch({
        type:'usersManage/changeFamilyCurrent',
        payload:{
          familyCurrent: current
        }
      })
    }
    else if(select == '老师') {
      this.getTeachersListPage(e.current-1)
      dispatch({
        type:'usersManage/changeTeacherCurrent',
        payload:{
          teacherCurrent: current
        }
      })
    }
  }
  
  render() {
    const { select, searchValue, searchArr, searchResult } = this.state
    const { studentPage, familyPage, teacherPage, managerPage, managerTotal, studentTotal, familyTotal, teacherTotal, managerCurrent, studentCurrent, familyCurrent, teacherCurrent } = this.props
    const page = select == '管理员' ? managerPage : select == '学生' ? studentPage : select == '老师' ? teacherPage : select == '家长' ? familyPage : []
    const pageSize = 8
    return (
      <View className='index'>
        <View>
          <AtTag
            className="tagStyle"
            name='manager' 
            active={select=='管理员'?true:false}
            onClick={this.managerOnClick.bind(this)}
          >
            管理员
          </AtTag>
          <AtTag
            className="tagStyle"
            name='student' 
            active={select=='学生'?true:false}
            onClick={this.studentOnClick.bind(this)}
          >
            学生
          </AtTag>
          <AtTag
            className="tagStyle"
            name='family' 
            active={select=='家长'?true:false}
            onClick={this.familyOnClick.bind(this)}
          >
            家长
          </AtTag>
          <AtTag
            className="tagStyle"
            name='teacher' 
            active={select=='老师'?true:false}
            onClick={this.teacherOnClick.bind(this)}
          >
            老师
          </AtTag>
        </View>
        <View>
          <AtList>
            <AtSearchBar
              actionName='搜名字'
              value={searchValue}
              onChange={this.changeSearchValue.bind(this)}
              onActionClick={this.onActionClick.bind(this)}
            />
            {
              searchResult ? (
                searchArr.map((item)=>{
                  return(
                    <AtListItem
                      arrow='right'
                      key={item.id}
                      title={item.name}
                      note={item.phone}
                      onClick={this.handleChangeUser.bind(this,`/pages/usersManDetail/index?select=${select}&id=${item.id}`)}
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
                        onClick={this.handleChangeUser.bind(this,`/pages/usersManDetail/index?select=${select}&id=${item.id}`)}
                      />
                    )
                  })
                )
              )
            }
            {
              !searchResult && select == '管理员'?(
                <AtPagination 
                  icon 
                  total={managerTotal}
                  pageSize={pageSize}
                  current={managerCurrent}
                  onPageChange={this.handleChangePage.bind(this)}
                >
                </AtPagination>
              )
              :!searchResult && select == '学生'?(
                <AtPagination 
                  icon 
                  total={studentTotal}
                  pageSize={pageSize}
                  current={studentCurrent}
                  onPageChange={this.handleChangePage.bind(this)}
                >
                </AtPagination>
              )
              :!searchResult && select == '家长'?(
                <AtPagination 
                  icon 
                  total={familyTotal}
                  pageSize={pageSize}
                  current={familyCurrent}
                  onPageChange={this.handleChangePage.bind(this)}
                >
                </AtPagination>
              )
              :!searchResult && select == '老师'?(
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
          </AtList>
        </View>
        <AtFab onClick={this.onButtonClick.bind(this)}>
          <Text className='at-fab__icon at-icon at-icon-add' ></Text>
        </AtFab>
      </View>
    )
  }
}
