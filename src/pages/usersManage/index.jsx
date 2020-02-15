import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtFab, AtTag, AtList, AtListItem } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ usersManage }) => ({
  studentList: usersManage.studentList,
  familyList: usersManage.familyList,
  teacherList: usersManage.teacherList,
  managerList: usersManage.managerList,
}))

export default class UsersManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      select: ''
    }
  };

  config = {
    navigationBarTitleText: '用户管理'
  }

  componentWillMount() {
    this.judgePage()
  }

  componentDidShow() {
    const {studentList,familyList,teacherList,managerList} = this.props
    const {select} = this.state
    if(select == '管理员' && managerList.length == 0) {
      this.getManagersList()
    }
    if(select == '学生' && studentList.length == 0) {
      this.getStudentList()
    }
    if(select == '老师' && teacherList.length == 0) {
      this.getTeachersList()
    }
    if(select == '家长' && familyList.length == 0) {
      this.getFamilyList()
    }
  }

  judgePage() {
    let pageHistory = getCurrentPages()
    let pageLength = pageHistory.length
    if(pageHistory[pageLength-1].route == "pages/usersManage/index") {
      //优化点,当添加用户以后,判断页面,重新进行数据请求!!
      this.managerOnClick() 
    }
  }

  onButtonClick() {
    Taro.navigateTo({
      url: '../../pages/addUsers/index',
    })
  }

  studentOnClick() {
    if(this.state.select !== '学生') {
      if(!this.props.studentList.length) {
        this.getStudentList()
      }
      this.setState({
        select: '学生'
      })
    }
  }

  familyOnClick = async() => {
    if(this.state.select !== '家长') {
      if(!this.props.familyList.length) {
        this.getFamilyList()
      }
      this.setState({
        select: '家长'
      })
    }
  }

  teacherOnClick() {
    if(this.state.select !== '老师') {
      if(!this.props.teacherList.length) {
        this.getTeachersList()
      }
      this.setState({
        select: '老师'
      })
    }
  }

  managerOnClick() {
    if(this.state.select !== '管理员') {
      if(!this.props.managerList.length) {
        this.getManagersList()
      }
      this.setState({
        select: '管理员'
      })
    }
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

  getFamilyList() {
    const {dispatch} = this.props
    dispatch({
      type:'usersManage/getFamilyList',
      payload:{}
    })
  }

  getManagersList() {
    const {dispatch} = this.props
    dispatch({
      type:'usersManage/getManagersList',
      payload:{}
    })
  }

  handleChangeUser(e) {
    Taro.navigateTo({
      url: e,
    })
  }
  
  render () {
    const {select} = this.state
    const {studentList,familyList,teacherList,managerList} = this.props
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
          {
            select == '管理员'?(
              managerList == []?(
                <AtListItem
                  arrow='right'
                  title='管理员用例'
                  note='123456789'
                />
              )
              :(
                managerList.map((item)=>{
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
            :select == '学生'?(
              studentList == []?(
                <AtListItem
                  arrow='right'
                  title='学生用例'
                  note='123456789'
                />
              )
              :(
                studentList.map((item)=>{
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
            :select == '老师'?(
              teacherList == []?(
                <AtListItem
                  arrow='right'
                  title='老师用例'
                  note='123456789'
                />
              )
              :(
                teacherList.map((item)=>{
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
            :select == '家长'?(
              familyList == []?(
                <AtListItem
                  arrow='right'
                  title='家长用例'
                  note='123456789'
                />
              )
              :(
                familyList.map((item)=>{
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
            :<Text>获取数据异常</Text>
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
