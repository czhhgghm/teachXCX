import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  };

  config = {
    navigationBarTitleText: 'review Profile'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onChangeCheck (value) {
    this.setState({
      value: value
    })
  }

  onActionClick () {
    console.log(this.state.value)
  }
  render () {
    return (
      <View className='index'>
        审核辅导方案
      </View>
    )
  }
}
