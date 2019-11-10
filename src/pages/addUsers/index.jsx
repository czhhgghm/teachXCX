import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtInput, AtRadio, AtButton } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state={
      inputValue: '',
      optionValue: ''
    }
  };

  config = {
    navigationBarTitleText: '添加用户'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChangeName = value => {
    this.setState({
      inputValue: value
    })
  }

  handleChangeOption = value => {
    this.setState({
      optionValue: value
    })
  }

  addNumbers() {
    Taro.showToast({
      title: '添加成功'
    },wx.reLaunch({
        url: '../../pages/index/index',
      })
    )
  }

  render () {
    const {optionValue,inputValue} = this.state
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
                name='value'
                title='姓名'
                type='text'
                placeholder='请输入新管理员姓名'
                value={this.state.inputValue}
                onChange={this.handleChangeName.bind(this)}
              />
              <AtInput
                name='value'
                title='手机号码'
                type='text'
                placeholder='请输入手机号码'
                value={this.state.inputValue}
                onChange={this.handleChangeName.bind(this)}
              />
              <AtButton type='primary' onClick={this.addNumbers.bind(this)}>确认添加</AtButton>
            </View>
            :optionValue == 'student'?
            <View>
              <AtInput
                name='value'
                title='姓名'
                type='text'
                placeholder='请输入学生姓名'
                value={this.state.inputValue}
                onChange={this.handleChangeName.bind(this)}
              />
              <AtInput
                name='value'
                title='手机号码'
                type='text'
                placeholder='请输入学生手机号码'
                value={this.state.inputValue}
                onChange={this.handleChangeName.bind(this)}
              />
              <AtInput
                name='value'
                title='家长姓名'
                type='text'
                placeholder='请输入家长姓名'
                value={this.state.inputValue}
                onChange={this.handleChangeName.bind(this)}
              />
              <AtInput
                name='value'
                title='家长手机号码'
                type='text'
                placeholder='请输入家长手机号码'
                value={this.state.inputValue}
                onChange={this.handleChangeName.bind(this)}
              />
              <AtButton type='primary' onClick={this.addNumbers.bind(this)}>确认添加</AtButton>
            </View>
            :optionValue == 'parent'?
            <View>
              <AtInput
                name='value'
                title='姓名'
                type='text'
                placeholder='请输入姓名'
                value={this.state.inputValue}
                onChange={this.handleChangeName.bind(this)}
              />
              <AtInput
                name='value'
                title='手机号码'
                type='text'
                placeholder='请输入手机号码'
                value={this.state.inputValue}
                onChange={this.handleChangeName.bind(this)}
              />
              <AtInput
                name='value'
                title='孩子姓名'
                type='text'
                placeholder='请输入孩子姓名'
                value={this.state.inputValue}
                onChange={this.handleChangeName.bind(this)}
              />
              <AtInput
                name='value'
                title='孩子手机号码'
                type='text'
                placeholder='请输入孩子手机号码'
                value={this.state.inputValue}
                onChange={this.handleChangeName.bind(this)}
              />
              <AtButton type='primary' onClick={this.addNumbers.bind(this)}>确认添加</AtButton>
            </View>
            :optionValue == 'teacher'?
            <View>
              <AtInput
                name='value'
                title='姓名'
                type='text'
                placeholder='请输入新老师的姓名'
                value={this.state.inputValue}
                onChange={this.handleChangeName.bind(this)}
              />
              <AtInput
                name='value'
                title='手机号码'
                type='text'
                placeholder='请输入手机号码'
                value={this.state.inputValue}
                onChange={this.handleChangeName.bind(this)}
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
