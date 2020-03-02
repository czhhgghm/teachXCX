import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtTextarea, AtButton, AtForm } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  };

  config = {
    navigationBarTitleText: '编写方案'
  }

  handleChangeText (event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  submitHandle() {
    if(this.state.inputValue == '') {
      Taro.showToast({
        title: '输入内容为空,请留下您的辅导方案',
        icon: 'none',
      })
    }
    else {
      Taro.showToast({
        title: '提交成功'
      },setTimeout(() => {
        wx.reLaunch({
          url: '../index/index',
        })
      }, 1500)
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
            placeholder='请填写您对于该学生的辅导方案'
          />
          <AtButton type='secondary' className='btn' formType='submit'>提交审核</AtButton>
        </AtForm>
      </View>
    )
  }
}
