import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtAccordion, AtList, AtListItem } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toView: false,
      viewed: false,
    }
  };

  config = {
    navigationBarTitleText: '查看建议'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  toViewHandleClick (value) {
    this.setState({
      toView: value
    })
  }

  viewedHandleClick (value) {
    this.setState({
      viewed: value
    })
  }
  
  render () {
    return (
      <View className='index'>
        <AtAccordion
        open={this.state.toView}
        onClick={this.toViewHandleClick.bind(this)}
        title='待查看'
        >
          <AtList hasBorder={false}>
            <AtListItem
              title='王明'
              extraText='2019/10/31'
              arrow='right'
            />
            <AtListItem
              title='李东'
              extraText='2019/10/25'
              arrow='right'
            />
            <AtListItem
              title='李琳'
              extraText='2019/10/24'
              arrow='right'
            />
          </AtList>
        </AtAccordion>
        <AtAccordion
        open={this.state.viewed}
        onClick={this.viewedHandleClick.bind(this)}
        title='已查看'
        >
          <AtList hasBorder={false}>
            <AtListItem
              title='王明'
              extraText='2019/10/31'
              arrow='right'
            />
            <AtListItem
              title='李东'
              extraText='2019/10/30'
              arrow='right'
            />
            <AtListItem
              title='李琳'
              extraText='2019/10/28'
              arrow='right'
            />
          </AtList>
        </AtAccordion>
      </View>
    )
  }
}