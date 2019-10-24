import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  };

  config = {
    navigationBarTitleText: 'Coaching program'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  changeDetail = url => {
    Taro.navigateTo({
      url,
    })
  }



  render () {
    return (
      <AtList>
        <AtListItem
          arrow='right'
          title='张三'
          extraText='语文'
          onClick={this.changeDetail.bind(this,`/pages/writeCoachingProgram/index?key=姓名`)}
        />
        <AtListItem
          arrow='right'
          title='李四'
          extraText='数学'
          onClick={this.changeDetail.bind(this,`/pages/writeCoachingProgram/index?key=姓名`)}
        />
        <AtListItem
          arrow='right'
          title='王五'
          extraText='英语'
          onClick={this.changeDetail.bind(this,`/pages/writeCoachingProgram/index?key=姓名`)}
        />
      </AtList>
    )
  }
}
