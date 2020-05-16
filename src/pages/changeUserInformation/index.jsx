import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import { AtInput, AtButton } from "taro-ui"

@connect(({ usersManDetail }) => ({
  studentDetail: usersManDetail.studentDetail,
  teacherDetail: usersManDetail.teacherDetail,
  managerDetail: usersManDetail.managerDetail,
  familyDetail: usersManDetail.familyDetail
}))

export default class ChangeUserInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
      school: '',
      place: '',
      identity: '',
      id: '',
      disabled: false
    }
  };

  config = {
    navigationBarTitleText: '修改信息'
  }

  componentWillMount() {
    this.initializeState()
  }

  initializeState() {
    const { select, id } = this.$router.params
    this.setState({
      identity: select,
      id
    })
    if(select == '管理员') {
      const { managerDetail } = this.props
      this.setState({
        name: managerDetail.name,
        phone: managerDetail.phone
      })
    }
    else if(select == '老师') {
      const { teacherDetail } = this.props
      this.setState({
        name: teacherDetail.name,
        phone: teacherDetail.phone
      })
    }
    else if(select == '学生') {
      const { studentDetail } = this.props
      this.setState({
        name: studentDetail.name,
        phone: studentDetail.phone,
        school: studentDetail.school,
        place: studentDetail.place
      })
    }
    else if(select == '家长') {
      const { familyDetail } = this.props
      this.setState({
        name: familyDetail.name,
        phone: familyDetail.phone,
        childName: familyDetail.children[0].name,
        childPhone: familyDetail.children[0].phone
      })
    }
  }

  changeName = value => {
    this.setState({
      name: value
    })
  }

  changePhone = value => {
    this.setState({
      phone: value
    })
  }

  changeSchool = value => {
    this.setState({
      school: value
    })
  }

  changePlace = value => {
    this.setState({
      place: value
    })
  }

  checkPhone(value) {
    const phoneReg = /^(13[0-9]{9})|(15[0-9][0-9]{8})|(18[0-9][0-9]{8})$/
    const res = phoneReg.test(value)
    if(!res) {
      this.setState({
        disabled: true
      })
      Taro.showToast({
        title: '手机号码格式不正确,请重新输入',
        icon: 'none'
      })
    }
    else {
      this.setState({
        disabled: false
      })
    }
  }

  submitChange() {
    const { identity, id, name, phone } = this.state
    const { dispatch } = this.props
    if(identity == '管理员') {
      dispatch({
        type:'changeUserInformation/updateManager',
        payload:{
          id,
          name,
          phone
        }
      })
      dispatch({
        type:'usersManage/clearManagersList',
        payload:{
          managerList: [],
          managerPage: []
        }
      })
    }
    else if(identity == '老师') {
      dispatch({
        type:'changeUserInformation/updateTeacher',
        payload:{
          id,
          name,
          phone,
        }
      })
      dispatch({
        type:'usersManage/clearTeachersList',
        payload:{
          teacherList: [],
          teacherPage: []
        }
      })
    }
    else if(identity == '学生') {
      const { school, place } = this.state
      dispatch({
        type:'changeUserInformation/updateStudent',
        payload:{
          id,
          name,
          phone,
          school,
          place
        }
      })
      dispatch({
        type:'usersManage/clearStudentsList',
        payload:{
          studentList: [],
          studentPage: []
        }
      })
    }
    else if(identity == '家长') {
      dispatch({
        type:'changeUserInformation/updateFamily',
        payload:{
          id,
          name,
          phone
        }
      })
      dispatch({
        type:'usersManage/clearFamilyList',
        payload:{
          familyList: [],
          familyPage: []
        }
      })
    }
    Taro.showToast({
      title: '处理成功'
    },setTimeout(() => {
      wx.reLaunch({
        url: '../home/index',
      })
    }, 500)
    )
  }

  render() {
    const { identity, name, phone, school, place, disabled } = this.state
    return (
      <View className='index'>
        {
          identity == '管理员' && (
            <View>
              <AtInput
                title='姓名'
                maxLength='10'
                type='text'
                placeholder='请修改管理员姓名'
                value={name}
                onChange={this.changeName.bind(this)}
              />
              <AtInput
                title='电话'
                type='phone'
                maxLength='11'
                placeholder='请修改管理员电话'
                value={phone}
                onBlur={this.checkPhone.bind(this)}
                onChange={this.changePhone.bind(this)}
              />
            </View>
          )
        }
        {
          identity == '老师' && (
            <View>
              <AtInput
                title='姓名'
                maxLength='10'
                type='text'
                placeholder='请修改老师姓名'
                value={name}
                onChange={this.changeName.bind(this)}
              />
              <AtInput
                title='电话'
                type='phone'
                maxLength='11'
                placeholder='请修改老师电话'
                value={phone}
                onBlur={this.checkPhone.bind(this)}
                onChange={this.changePhone.bind(this)}
              />
            </View>
          )
        }
        {
          identity == '学生' && (
            <View>
              <AtInput
                title='姓名'
                maxLength='10'
                type='text'
                placeholder='请修改学生姓名'
                value={name}
                onChange={this.changeName.bind(this)}
              />
              <AtInput
                title='电话'
                type='phone'
                maxLength='11'
                placeholder='请修改学生电话'
                value={phone}
                onBlur={this.checkPhone.bind(this)}
                onChange={this.changePhone.bind(this)}
              />
              <AtInput
                title='学校'
                maxLength='10'
                type='text'
                placeholder='请修改学生学校'
                value={school}
                onChange={this.changeSchool.bind(this)}
              />
              <AtInput
                title='住址'
                maxLength='10'
                type='text'
                placeholder='请修改学生住址'
                value={place}
                onChange={this.changePlace.bind(this)}
              />
            </View>
          )
        }
        {
          identity == '家长' && (
            <View>
              <AtInput
                title='姓名'
                maxLength='10'
                type='text'
                placeholder='请修改家长姓名'
                value={name}
                onChange={this.changeName.bind(this)}
              />
              <AtInput
                title='电话'
                type='phone'
                maxLength='11'
                placeholder='请修改家长电话'
                value={phone}
                onBlur={this.checkPhone.bind(this)}
                onChange={this.changePhone.bind(this)}
              />
            </View>
          )
        }
        <AtButton type='primary' onClick={this.submitChange.bind(this)} disabled={disabled}>提交修改</AtButton>
      </View>
    )
  }
}
