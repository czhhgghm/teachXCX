import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtSearchBar } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  };

  config = {
    navigationBarTitleText: '个人档案'
  }

  componentWillMount () { }

  //按照时间顺序,返回给我这个学生的 课程和授课老师列表
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
        <AtSearchBar
          value={this.state.value}
          placeholder='请输入查询科目'
          onChange={this.onChangeCheck.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
      </View>
    )
  }
}
