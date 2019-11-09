import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtTextarea, AtButton, AtForm } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state={
      inputValue: ''
    }
  };

  config = {
    navigationBarTitleText: '用户建议'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChangeText (event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  submitHandle() {
    if(this.state.inputValue == '') {
      Taro.showToast({
        title: '输入内容为空,请留下您的宝贵建议',
        icon: 'none',
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

  render () {
    return (
      <View className='index'>
        <AtForm
            onSubmit={this.submitHandle.bind(this)}
        >
          <AtTextarea
            height='200'            
            value={this.state.inputValue}
            onChange={this.handleChangeText.bind(this)}
            maxLength={200}
            placeholder='请留下您的宝贵意见或者建议，我们将努力改进！'
          />
          <AtButton type='secondary' className='btn' formType='submit'>提交</AtButton>
        </AtForm>
      </View>
    )
  }
}
