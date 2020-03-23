import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import '@tarojs/async-await'

@connect(({ signUp, common }) => ({
  loginCode: common.loginCode,
  addRecommandCode: signUp.addRecommandCode
}))

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studentName: '',
      studentPhone: '',
      parentPhone: '',
      studentNamePass: false,
      studentPhonePass: false,
      parentPhonePass: false
    }
  }

  config = {
    navigationBarTitleText: '新用户报名'
  }

  handleChangeName(value) {
    this.setState({
      studentName: value
    })
  }

  handleChangeStudentPhone(value) {
    this.setState({
      studentPhone: value
    })
  }

  handleChangeParentPhone(value) {
    this.setState({
      parentPhone: value
    })
  }

  checkStudentName() {
    const { studentName } = this.state
    if(!studentName) {
      wx.showModal({
        title: '提示',
        content: '该项不能为空,请登记学生姓名',
        showCancel: false,
        confirmText: '重新输入'
      })
      this.setState({
        studentNamePass: false
      })
    }else {
      this.setState({
        studentNamePass: true
      })
    }
  }

  checkStudentPhone() {
    const { studentPhone } = this.state
    if(!studentPhone) {
      wx.showModal({
        title: '提示',
        content: '该项不能为空,若学生没有电话,可登记家长电话',
        showCancel: false,
        confirmText: '重新输入'
      })
      this.setState({
        studentPhonePass: false
      })
    }
    else {
      if(!(/^1[3456789]\d{9}$/.test(studentPhone))){ 
        wx.showModal({
          title: '提示',
          content: '您输入的电话号码不符合规范,请重新输入',
          showCancel: false,
          confirmText: '重新输入'
        })
        this.setState({
          studentPhonePass: false
        })
      }
      else {
        this.setState({
          studentPhonePass: true
        })
      }
    }
  }
  
  checkParentPhone() {
    const { parentPhone } = this.state
    if(!parentPhone) {
      wx.showModal({
        title: '提示',
        content: '该项不能为空,请登记家长电话',
        showCancel: false,
        confirmText: '重新输入'
      })
      this.setState({
        parentPhonePass: false
      })
    }
    else {
      if(!(/^1[3456789]\d{9}$/.test(parentPhone))){ 
        wx.showModal({
          title: '提示',
          content: '您输入的电话号码不符合规范,请重新输入',
          showCancel: false,
          confirmText: '重新输入'
        })
        this.setState({
          parentPhonePass: false
        })
      }
      else {
        this.setState({
          parentPhonePass: true
        })
      }
    }
  }

  submitHandle = () => {
    const { studentNamePass, studentPhonePass, parentPhonePass, studentName, studentPhone, parentPhone } = this.state
    const { dispatch } = this.props
    if(studentNamePass && studentPhonePass && parentPhonePass) {
      dispatch({
        type:'signUp/addRecommand',
        payload:{
          name: studentName,
          studentPhone,
          parentPhone
        }
      })
      Taro.showToast({
        title: '提交中'
      },setTimeout(() => {
        wx.showModal({
          title: '提交成功'
        })
        if(this.props.loginCode !== 11) {
          wx.reLaunch({
            url: '../home/index'
          })
        }
        else {
          this.setState({
            studentPhone: '',
            studentPhone: '',
            parentPhone: ''
          })
        }
      }, 1500))
    }
    else {
      if(!studentNamePass) {
        wx.showModal({
          title: '提示',
          content: '提交失败,请登记姓名',
          showCancel: false,
          confirmText: '重新输入'
        })
        return
      }
      if(!studentPhonePass) {
        wx.showModal({
          title: '提示',
          content: '您输入的学生电话号码未通过检查,请重新输入',
          showCancel: false,
          confirmText: '重新输入'
        })
        return
      }
      if(!parentPhonePass) {
        wx.showModal({
          title: '提示',
          content: '您输入的家长电话号码未通过检查,请重新输入',
          showCancel: false,
          confirmText: '重新输入'
        })
        return
      }
    }
  }

  render () {
    const { studentName, studentPhone, parentPhone } = this.state
    return (
      <View className='index'>
        <AtForm 
          className='form'
          onSubmit={this.submitHandle.bind(this)}
        >
          <AtInput
            title='姓名'
            type='text'
            placeholder='请输入新用户姓名'
            value={studentName}
            maxLength='8'
            onBlur={this.checkStudentName.bind(this)}
            onChange={this.handleChangeName.bind(this)}
          />
          <AtInput
            title='学生电话'
            type='phone'
            placeholder='请输入学生手机号码'
            value={studentPhone}
            onBlur={this.checkStudentPhone.bind(this)}
            onChange={this.handleChangeStudentPhone.bind(this)}
          />
          <AtInput
            title='家长电话'
            type='phone'
            placeholder='请输入家长手机号码'
            value={parentPhone}
            onBlur={this.checkParentPhone.bind(this)}
            onChange={this.handleChangeParentPhone.bind(this)}
          />
          <AtButton type='primary' formType='submit'>提交</AtButton>
        </AtForm>
      </View>
    )
  }
}