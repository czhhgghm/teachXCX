import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtTextarea, AtButton, AtForm } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ common }) => ({
  userId: common.userId
}))


export default class Advice extends Component {
  constructor(props) {
    super(props)
    this.state={
      inputValue: ''
    }
  };

  config = {
    navigationBarTitleText: '意见反馈'
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
      const {dispatch,userId} = this.props
      dispatch({
        type:'common/submitAdvice',
        payload:{
          userId,
          opinion: this.state.inputValue
        }
      },
        Taro.showToast({
          title: '提交成功'
        },setTimeout(() => {
          wx.reLaunch({
            url: '../../pages/index/index',
          })
        }, 1500)
        )
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
