import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtTextarea, AtButton, AtForm } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ writeCoachingProgram, common }) => ({
  id: common.id,
  //没提交过0    提交未审核1    已提交(通过审核)2    提交没通过审核3
  guidanceResponse: writeCoachingProgram.guidanceResponse
}))

export default class WriteCoachingProgram extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  };

  config = {
    navigationBarTitleText: '编写方案'
  }

  componentWillMount() {
    this.checkGuidance()
  }

  checkGuidance() {
    const { dispatch, id } = this.props
    const { studentId } = this.$router.params
    dispatch({
      type:'writeCoachingProgram/checkGuidance',
      payload:{
        teacherId: id,
        studentId
      }
    })
  }

  handleChangeText (event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  submitHandle() {
    const { dispatch, id } = this.props
    const { studentId } = this.$router.params
    const { inputValue } = this.state
    if(this.state.inputValue == '') {
      Taro.showToast({
        title: '输入内容为空,请留下您的辅导方案',
        icon: 'none',
      })
    }
    else {
      dispatch({
        type:'writeCoachingProgram/addGuidance',
        payload:{
          teacherId: id,
          studentId,
          text: inputValue
        }
      })
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
    const { guidanceResponse } = this.props
    return (
      <View className='index'>
      {
        guidanceResponse == 0 ? (
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
        )
        :<Text>数据请求错误</Text>
      }
        
      </View>
    )
  }
}
