import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtFab, AtTag, AtSearchBar, AtList, AtListItem } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ usersManage }) => ({
  studentList: usersManage.studentList,
  familyList: usersManage.familyList,
  teacherList: usersManage.teacherList,
  managerList: usersManage.managerList,
}))

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      select: 'managerActive',
      searchValue: ''
    }
  };

  config = {
    navigationBarTitleText: '用户管理'
  }

  componentWillMount () { }

  componentDidMount () {
    const {dispatch} = this.props
    dispatch({
      type:'usersManage/getManagersList',
      payload:{}
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onButtonClick() {
    Taro.navigateTo({
      url: '../../pages/addUsers/index',
    })
  }

  async studentOnClick() {
    const {dispatch} = this.props
    await dispatch({
      type:'usersManage/getStudentsList',
      payload:{}
    })
    this.setState({
      select: 'studentActive'
    })
  }

  familyOnClick = async() => {
    const {dispatch} = this.props
    await dispatch({
      type:'usersManage/getFamilyList',
      payload:{}
    })
    this.setState({
      select: 'familyActive'
    })
  }

  async teacherOnClick() {
    const {dispatch} = this.props
    await dispatch({
      type:'usersManage/getTeachersList',
      payload:{}
    })
    this.setState({
      select: 'teacherActive'
    })
  }

  async managerOnClick() {
    const {dispatch} = this.props
    await dispatch({
      type:'usersManage/getManagersList',
      payload:{}
    })
    this.setState({
      select: 'managerActive'
    })
  }

  onChange (value) {
    this.setState({
      searchValue: value
    })
    console.log(value)
  }

  onActionClick() {
    console.log('点击搜索')
  }

  handleChangeUser(e) {
    console.log(e)
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
            active={select=='managerActive'?true:false}
            onClick={this.managerOnClick.bind(this)}
          >
            管理员
          </AtTag>
          <AtTag
            className="tagStyle"
            name='student' 
            active={select=='studentActive'?true:false}
            onClick={this.studentOnClick.bind(this)}
          >
            学生
          </AtTag>
          <AtTag
            className="tagStyle"
            name='family' 
            active={select=='familyActive'?true:false}
            onClick={this.familyOnClick.bind(this)}
          >
            家长
          </AtTag>
          <AtTag
            className="tagStyle"
            name='teacher' 
            active={select=='teacherActive'?true:false}
            onClick={this.teacherOnClick.bind(this)}
          >
            老师
          </AtTag>
        </View>
        <AtSearchBar
          value={this.state.searchValue}
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
        
        <View>
          <AtList>
          {
            select == 'managerActive'?(
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
                      onClick={this.handleChangeUser.bind(this,`/pages/profileHistory/index?key=${item.id}`)}
                    />
                  )
                })
              )
            )
            :select == 'studentActive'?(
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
                      onClick={this.handleChangeUser.bind(this,`/pages/profileHistory/index?key=${item.id}`)}
                    />
                  )
                })
              )
            )
            :select == 'teacherActive'?(
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
                      onClick={this.handleChangeUser.bind(this,`/pages/profileHistory/index?key=${item.id}`)}
                    />
                  )
                })
              )
            )
            :select == 'familyActive'?(
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
                      onClick={this.handleChangeUser.bind(this,`/pages/profileHistory/index?key=${item.id}`)}
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
