import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
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

  handleChange (event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  render () {
    return (
      <View className='index'>
        <View className='grade'>
          <View className='at-row'>
            <View className='at-col at-col-3 gradeFont'>满意度评分:</View>
            <View className='at-col'>
              <AtRate
                size={18}
                value={this.state.gradeValue}
                onChange={this.handleChangeGrade.bind(this)}
              />
            </View>
          </View>
          
        </View>
        <AtTextarea
            value={this.state.inputValue}
            onChange={this.handleChange.bind(this)}
            maxLength={200}
            placeholder='请留下您对于当天课程的反馈，我们将努力改进~'
          />
        <AtButton type='secondary' className='btn'>提交</AtButton>
      </View>
    )
  }
}
