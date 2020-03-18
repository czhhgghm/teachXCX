import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtInput, AtRadio, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ addUsers }) => ({
  ...addUsers
}))

export default class AddUsers extends Component {
  constructor(props) {
    super(props)
    this.state={
      optionValue: '',
      perName: '',
      perPhone: '',
      studentName: '',
      studentPhone: '',
      parentName: '',
      parentPhone: '',
      schoolName: '',
      livePlace: ''
    }
  };

  config = {
    navigationBarTitleText: '添加用户'
  }

  changeStudentName = value => {
    this.setState({
      studentName: value
    })
  }

  changeStudentPhone = value => {
    this.setState({
      studentPhone: value
    })
  }

  changeParentName = value => {
    this.setState({
      parentName: value
    })
  }

  changeParentPhone = value => {
    this.setState({
      parentPhone: value
    })
  }

  changePerName = value => {
    this.setState({
      perName: value
    })
  }

  changePerPhone = value => {
    this.setState({
      perPhone: value
    })
  }

  changeLivePlace = value => {
    this.setState({
      livePlace: value
    })
  }

  handleChangeOption = value => {
    this.setState({
      optionValue: value
    })
  }

  changeSchoolName = value => {
    this.setState({
      schoolName: value
    })
  }

  clearUsers() {
    const {dispatch} = this.props
    dispatch({
      type:'usersManage/clearUsers',
      payload:{
        studentList: [],
        teacherList: [],
        managerList: [],
        familyList: []
      }
    })
  }


  async addNumbers() {
    const {dispatch} = this.props
    const {optionValue,studentName,studentPhone,parentName,parentPhone,perName,perPhone,livePlace,schoolName} = this.state
    const phoneReg = /^(13[0-9]{9})|(15[0-9][0-9]{8})|(18[0-9][0-9]{8})$/

    if(optionValue == 'student') {
      phoneReg.test(studentPhone)?(
        await dispatch({
          type:'addUsers/addStudent',
          payload:{
            name: studentName,
            phone: studentPhone,
            school: schoolName,
            place: livePlace
          }
        },
          Taro.showToast({
            title: '添加成功',
            icon: 'success'
          })
        )
      )
      :Taro.showToast({
        title: '输入手机号码格式不正确',
        icon: 'none'
      })
    }
    else if(optionValue == 'parent') {
      phoneReg.test(parentPhone)?(
        phoneReg.test(studentPhone)?(
          await dispatch({
            type:'addUsers/addFamily',
            payload:{
              childName: studentName,
              childPhone: studentPhone,
              name: parentName,
              phone: parentPhone
            }
          },
            Taro.showToast({
              title: '添加成功',
              icon: 'success'
            })
          )
        )
        :Taro.showToast({
          title: '学生手机号码格式不正确',
          icon: 'none'
        })
      )
      :Taro.showToast({
        title: '家长手机号码格式不正确',
        icon: 'none'
      })
      
    }
    else if(optionValue == 'teacher') {
      phoneReg.test(perPhone)?(
        await dispatch({
          type:'addUsers/addTeacher',
          payload:{
            name: perName,
            phone: perPhone,
          }
        },
          Taro.showToast({
            title: '添加成功',
            icon: 'success'
          })
        )
      )
      :Taro.showToast({
        title: '输入手机号码格式不正确',
        icon: 'none'
      })
    }
    else if(optionValue == 'manager') {
      phoneReg.test(perPhone)?(
        await dispatch({
          type:'addUsers/addManager',
          payload:{
            name: perName,
            phone: perPhone,
          }
        },
          Taro.showToast({
            title: '添加成功',
            icon: 'success'
          })
        )
      )
      :Taro.showToast({
        title: '输入手机号码格式不正确',
        icon: 'none'
      })
    }
    this.clearUsers()
    this.setState({
      optionValue: '',
      perName: '',
      perPhone: '',
      studentName: '',
      studentPhone: '',
      parentName: '',
      parentPhone: '',
      livePlace: ''
    })
  }

  render () {
    const {optionValue} = this.state
    return (
      <View className='index'>
        <View className='formStyle'>
          <View className='formTitle'>填写用户信息</View>
          <AtRadio
            options={[
              { label: '学生', value: 'student'},
              { label: '家长', value: 'parent'},
              { label: '老师', value: 'teacher'},
              { label: '管理员', value: 'manager'}
            ]}
            value={optionValue}
            onClick={this.handleChangeOption.bind(this)}
          />
          {
            optionValue == 'manager'?
            <View>
              <AtInput
                name='perName'
                title='姓名'
                maxLength='10'
                type='text'
                placeholder='请输入新管理员姓名'
                value={this.state.perName}
                onChange={this.changePerName.bind(this)}
              />
              <AtInput
                name='perPhone'
                title='手机号码'
                type='phone'
                maxLength='11'
                placeholder='请输入手机号码'
                value={this.state.perPhone}
                onChange={this.changePerPhone.bind(this)}
              />
              <AtButton type='primary' onClick={this.addNumbers.bind(this)}>确认添加</AtButton>
            </View>
            :optionValue == 'student'?
            <View>
              <AtInput
                name='studentName'
                title='姓名'
                maxLength='10'
                type='text'
                placeholder='请输入学生姓名'
                value={this.state.studentName}
                onChange={this.changeStudentName.bind(this)}
              />
              <AtInput
                name='studentPhone'
                title='手机号码'
                type='phone'
                placeholder='请输入学生手机号码'
                maxLength='11'
                value={this.state.studentPhone}
                onChange={this.changeStudentPhone.bind(this)}
              />
              <AtInput
                name='studentName'
                title='住址'
                maxLength='10'
                type='text'
                placeholder='请输入学生常住地址'
                value={this.state.livePlace}
                onChange={this.changeLivePlace.bind(this)}
              />
              <AtInput
                name='schoolName'
                title='学校'
                maxLength='10'
                type='text'
                placeholder='请输入学生所在学校名称'
                value={this.state.schoolName}
                onChange={this.changeSchoolName.bind(this)}
              />
              <AtButton type='primary' onClick={this.addNumbers.bind(this)}>确认添加</AtButton>
            </View>
            :optionValue == 'parent'?
            <View>
              <AtInput
                name='parentName'
                title='家长姓名'
                maxLength='10'
                type='text'
                placeholder='请输入家长姓名'
                value={this.state.parentName}
                onChange={this.changeParentName.bind(this)}
              />
              <AtInput
                name='parentPhone'
                title='手机号码'
                type='phone'
                placeholder='请输入手机号码'
                maxLength='11'
                value={this.state.parentPhone}
                onChange={this.changeParentPhone.bind(this)}
              />
              <AtInput
                name='studentName'
                title='孩子姓名'
                maxLength='10'
                type='text'
                placeholder='请输入孩子姓名'
                value={this.state.studentName}
                onChange={this.changeStudentName.bind(this)}
              />
              <AtInput
                name='studentPhone'
                title='孩子手机号码'
                type='phone'
                maxLength='11'
                placeholder='请输入孩子手机号码'
                value={this.state.studentPhone}
                onChange={this.changeStudentPhone.bind(this)}
              />
              <AtButton type='primary' onClick={this.addNumbers.bind(this)}>确认添加</AtButton>
            </View>
            :optionValue == 'teacher'?
            <View>
              <AtInput
                name='perName'
                title='姓名'
                maxLength='10'
                type='text'
                placeholder='请输入新老师的姓名'
                value={this.state.perName}
                onChange={this.changePerName.bind(this)}
              />
              <AtInput
                name='perPhone'
                title='手机号码'
                maxLength='11'
                type='phone'
                placeholder='请输入手机号码'
                value={this.state.perPhone}
                onChange={this.changePerPhone.bind(this)}
              />
              <AtButton type='primary' onClick={this.addNumbers.bind(this)}>确认添加</AtButton>
            </View>
            :''
          }
        </View>
      </View>
    )
  }
}
