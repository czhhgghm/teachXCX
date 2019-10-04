import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state={
      
    }
  };

  config = {
    navigationBarTitleText: '修改个人信息'
  }

  componentWillMount () {
    console.log(this.$router.params)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>{this.$router.params.key}</Text>
        <Text>{this.$router.params.value}</Text>
      </View>
    )
  }
}
