import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtRate, AtButton, AtTextarea } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gradeValue: 0,
      inputValue: '',
    }
  };

  config = {
    navigationBarTitleText: '评分反馈'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChangeGrade (gradeValue) {
    this.setState({
      gradeValue
    })
  }

  handleChangeText (event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  submitHandle() {
    if(this.state.gradeValue == 0) {
      Taro.showToast({
        title: '请先进行满意度评分',
        icon: 'none',
      })
    }
    else if(this.state.inputValue == '') {
      Taro.showToast({
        title: '请留下您的反馈意见',
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
    const {gradeValue,inputValue} = this.state
    return (
      <View className='index'>
        <View className='grade'>
          <Text className='gradeFont'>满意度评分:</Text>
          <AtRate
            className='stars'
            size={18}
            value={gradeValue}
            onChange={this.handleChangeGrade.bind(this)}
          />
        </View>
        <AtTextarea
          value={inputValue}
          height='200'
          onChange={this.handleChangeText.bind(this)}
          maxLength={200}
          placeholder='请留下您对本堂课程的反馈，我们将努力改进~'
        />
        <AtButton
          type='secondary' 
          className='btn'
          onClick={this.submitHandle.bind(this)}
        >
          提交
        </AtButton>
      </View>
    )
  }
}
