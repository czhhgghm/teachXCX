import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtTextarea, AtButton, AtForm } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ writeCoachingProgram, common }) => ({
  id: common.id,
  guidanceResponse: writeCoachingProgram.guidanceResponse
}))

export default class WriteCoachingProgram extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      changeGuidance: true
    }
  };

  config = {
    navigationBarTitleText: '编写方案'
  }

  componentWillMount() {
    this.checkGuidance()
  }

  async checkGuidance() {
    const { dispatch, id, guidanceResponse } = this.props;
    const { studentId } = this.$router.params;
    dispatch({
      type:'writeCoachingProgram/checkGuidance',
      payload:{
        teacherId: id,
        studentId
      }
    })
  }

  handleChangeText(event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  changeState() {
    this.setState({
      changeGuidance: false
    })
  }

  submitHandle() {
    const { dispatch, id } = this.props;
    const { studentId } = this.$router.params;
    const { inputValue } = this.state;
    if(this.state.inputValue == '') {
      Taro.showToast({
        title: '输入内容为空,请留下您的辅导方案',
        icon: 'none'
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
          url: '../home/index'
        })
      }, 1500)
      )
    }
  }

  submitChange() {
    const { dispatch, guidanceResponse } = this.props;
    const { inputValue } = this.state;
    if(this.state.inputValue == '') {
      Taro.showToast({
        title: '输入内容为空,请留下您的辅导方案',
        icon: 'none'
      })
    }
    else {
      dispatch({
        type:'writeCoachingProgram/updateGuidance',
        payload:{
          guidanceID: guidanceResponse.guidanceID,
          text: inputValue
        }
      })
      Taro.showToast({
        title: '提交成功'
      },setTimeout(() => {
        wx.reLaunch({
          url: '../home/index'
        })
      }, 1500)
      )
    }
  }
  
  render () {
    const { state, text } = this.props.guidanceResponse;
    const { changeGuidance } = this.state;
    return (
      <View className='index'>
      {
        state == 0 ? (
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
        :state == 1 ? (
          <AtForm>
            <AtTextarea
              height='200'
              value={text}
              disabled
            />
            <AtButton type='primary' className='btn' disabled>等待审核</AtButton>
          </AtForm>
        )
        :state == 2 ? (
          <AtForm
              onSubmit={this.submitChange.bind(this)}
          >
            <AtTextarea
              height='200'
              value={text}
              onChange={this.handleChangeText.bind(this)}
              maxLength={200}
              disabled={changeGuidance}
              placeholder='请修改您对于该学生的辅导方案'
            />
            <AtButton type='secondary' className='btn' disabled={changeGuidance} formType='submit'>{changeGuidance == false ? '提交审核' : '审核已通过'}</AtButton>
            <AtButton type='primary' className='btn' disabled={!changeGuidance} onClick={this.changeState.bind(this)}>修改方案</AtButton>
          </AtForm>
        )
        :state == 3 ? (
          <AtForm
              onSubmit={this.submitChange.bind(this)}
          >
            <AtTextarea
              height='200'
              value={text}
              onChange={this.handleChangeText.bind(this)}
              maxLength={200}
              disabled={changeGuidance}
              placeholder='请修改您对于该学生的辅导方案'
            />
            <AtButton type='secondary' className='btn' disabled={changeGuidance} formType='submit'>{changeGuidance == false ? '提交审核' : '审核未通过'}</AtButton>
            <AtButton type='primary' className='btn' disabled={!changeGuidance} onClick={this.changeState.bind(this)}>重新编写方案</AtButton>
          </AtForm>
        )
        :<Text>等待数据请求结果{state}</Text>
      }
        {/* <AtModal
          isOpened={this.state.showModaled}
          title='审核未通过'
          confirmText='确定'
          onClose={ this.handleCloseModaled.bind(this) }
          onConfirm={ this.handleConfirmModaled.bind(this) }
          content={'内容:'+text}
        /> */}
      </View>
    )
  }
}
