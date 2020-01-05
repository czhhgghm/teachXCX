import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtInput, AtForm, AtButton } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      perPhone: '',
      otherPhone: ''
    }
  };

  config = {
    navigationBarTitleText: '新用户报名'
  }

  componentDidMount () { }

  handleChangeName (value) {
    this.setState({
      name: value
    })
  }

  handleChangePerPhone (value) {
    this.setState({
      perPhone: value
    })
  
  }

  handleChangeOtherPhone (value) {
    this.setState({
      otherPhone: value
    })
  }

  submitHandle() {
    const {name,perPhone,otherPhone} = this.state
    if(name == '') {
      Taro.showToast({
        icon: 'none',
        title: '姓名为空，请重新编辑',
      })
    }
    else if(perPhone == '' && otherPhone == '') {
      Taro.showToast({
        title: '请至少留下一个的手机号码',
        icon: 'none',
      })
    }
    else {
      if(perPhone && !(/^1[3456789]\d{9}$/.test(perPhone))) {
        Taro.showToast({
          icon: 'none',
          title: '学生手机号格式不正确',
        })
      }
      else if(otherPhone && !(/^1[3456789]\d{9}$/.test(otherPhone))) {
        Taro.showToast({
          icon: 'none',
          title: '家长手机号格式不正确',
        })
      }
      else {
        Taro.showToast({
          title: '提交成功'
        },wx.reLaunch({
            url: '../../pages/index/index',
          })
        )
      }
    }
  }

  render () {
    const {name,perPhone,otherPhone} = this.state
    return (
      <View className='index'>
        <AtForm 
          className='form'
          onSubmit={this.submitHandle.bind(this)}
        >
          <AtInput
            name='value1'
            title='姓名'
            type='text'
            placeholder='请输入新用户姓名'
            value={name}
            maxLength='6'
            onChange={this.handleChangeName.bind(this)}
          />
          <AtInput
            name='value2'
            title='学生电话'
            type='phone'
            placeholder='请输入学生手机号码（没有可不填）'
            value={perPhone}
            onChange={this.handleChangePerPhone.bind(this)}
          />
          <AtInput
            name='value3'
            title='家长电话'
            type='phone'
            placeholder='请输入家长手机号码'
            value={otherPhone}
            onChange={this.handleChangeOtherPhone.bind(this)}
          />
          <AtButton type='primary' formType='submit'>提交</AtButton>
        </AtForm>
      </View>
    )
  }
}