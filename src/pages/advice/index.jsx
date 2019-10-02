import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtTextarea, AtButton } from 'taro-ui'

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
  render () {
    return (
      <View className='index'>
        <AtTextarea
          value={this.state.inputValue}
          onChange={this.handleChangeText.bind(this)}
          maxLength={200}
          placeholder='请留下您的宝贵意见或者建议，我们将努力改进！'
        />
        <AtButton type='secondary' className='btn'>提交</AtButton>
      </View>
    )
  }
}
