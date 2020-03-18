import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtRate, AtButton, AtTextarea } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ common }) => ({
  authen: common.authen,
  userId: common.userId
}))

export default class CourseFeedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pointValue: 0,
      inputValue: '',
    }
  };

  config = {
    navigationBarTitleText: '评分反馈'
  }

  componentDidMount() {
    
  }

  handleChangeGrade (pointValue) {
    this.setState({
      pointValue
    })
  }

  handleChangeText (event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  submitHandle() {
    if(this.state.pointValue == 0) {
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
      const { dispatch, userId, authen } = this.props
      const { pointValue, inputValue } = this.state
      const { id } = this.$router.params
      if( authen == '学生' ) {
        dispatch({
          type:'schedule/postStudentFB',
          payload:{
            courseId: Number(id),
            fromUserId: userId,
            idea: inputValue,
            pointValue,
          }
        },
          Taro.showToast({
            title: '提交成功'
          },setTimeout(() => {
            wx.reLaunch({
              url: '../index/index',
            })
          }, 1500)
          )
        )
      }
      else {
        dispatch({
          type:'schedule/postTeacherFB',
          payload:{
            courseId: Number(id),
            fromUserId: userId,
            idea: inputValue,
            pointValue,
          }
        },
          Taro.showToast({
            title: '提交成功'
          },setTimeout(() => {
            wx.reLaunch({
              url: '../index/index',
            })
          }, 1500)
          )
        )
      }
    }
  }

  render () {
    const {pointValue,inputValue} = this.state
    return (
      <View className='index'>
        <View className='grade'>
          <Text className='gradeFont'>满意度评分:</Text>
          <AtRate
            className='stars'
            size={18}
            value={pointValue}
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
