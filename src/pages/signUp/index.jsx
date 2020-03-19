import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ signUp }) => ({
  ...signUp
}))

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      studentPhone: '',
      parentPhone: ''
    }
  };

  config = {
    navigationBarTitleText: '新用户报名'
  }

  handleChangeName (value) {
    this.setState({
      name: value
    })
  }

  handleChangeStudentPhone (value) {
    this.setState({
      studentPhone: value
    })
  }

  handleChangeParentPhone (value) {
    this.setState({
      parentPhone: value
    })
  }

  submitHandle() {
    const {name,studentPhone,parentPhone} = this.state
    if(name == '') {
      Taro.showToast({
        icon: 'none',
        title: '姓名为空，请重新编辑',
      })
    }
    else if(studentPhone == '' && parentPhone == '') {
      Taro.showToast({
        title: '请至少留下一个的手机号码',
        icon: 'none',
      })
    }
    else {
      if(studentPhone && !(/^1[3456789]\d{9}$/.test(studentPhone))) {
        Taro.showToast({
          icon: 'none',
          title: '学生手机号格式不正确',
        })
      }
      else if(parentPhone && !(/^1[3456789]\d{9}$/.test(parentPhone))) {
        Taro.showToast({
          icon: 'none',
          title: '家长手机号格式不正确',
        })
      }
      else {
        const {dispatch} = this.props
        dispatch({
          type:'signUp/addRecommand',
          payload:{
            name,
            studentPhone,
            parentPhone
          }
        },
          Taro.showToast({
            title: '提交成功'
          },setTimeout(() => {
            wx.reLaunch({
              url: '../home/index',
            })
          }, 1500)
          )
        )
      }
    }
  }

  render () {
    const {name,studentPhone,parentPhone} = this.state
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
            value={name}
            maxLength='6'
            onChange={this.handleChangeName.bind(this)}
          />
          <AtInput
            title='学生电话'
            type='phone'
            placeholder='请输入学生手机号码（没有可不填）'
            value={studentPhone}
            onChange={this.handleChangeStudentPhone.bind(this)}
          />
          <AtInput
            title='家长电话'
            type='phone'
            placeholder='请输入家长手机号码'
            value={parentPhone}
            onChange={this.handleChangeParentPhone.bind(this)}
          />
          <AtButton type='primary' formType='submit'>提交</AtButton>
        </AtForm>
      </View>
    )
  }
}