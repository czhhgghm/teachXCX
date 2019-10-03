import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtInput, AtForm, AtButton } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      name: '',
      perPhone: '',
      otherPhone: ''
    }
  };

  config = {
    navigationBarTitleText: '新用户报名'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChange (value) {
    this.setState({
      value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }

  render () {
    return (
      <View className='index'>
        <AtForm className='form'>
          <AtInput
            name='value1'
            title='姓名'
            type='text'
            border={false}
            placeholder='请输入新用户姓名'
            value={this.state.name}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='value2'
            border={false}
            title='手机号码'
            type='phone'
            placeholder='请输入学生手机号码（没有可不填）'
            value={this.state.perPhone}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='value3'
            border={false}
            title='手机号码'
            type='phone'
            placeholder='请输入家长手机号码'
            value={this.state.otherPhone}
            onChange={this.handleChange.bind(this)}
          />
          <AtButton type='secondary'>提交</AtButton>
        </AtForm>
      </View>
    )
  }
}