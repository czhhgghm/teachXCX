import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtAccordion, AtList, AtListItem, AtPagination, AtSearchBar } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toView: false,
      viewed: false,
      searchValue: ''
    }
  };

  config = {
    navigationBarTitleText: '查看新用户'
  }

  componentWillMount () {}

  showPrompt() {
    wx.showToast({
      title: '有3份新用户报名表单待处理',
      icon: 'none',
      duration: 2000
    })
  }

  componentDidMount () {
    this.showPrompt()
  }

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

  changePage = e => {
    console.log(e)
  }

  changeInputValue (value) {
    this.setState({
      searchValue: value
    })
    console.log(value)
  }

  onActionClick() {
    console.log('点击搜索')
  }
  
  render () {
    return (
      <View className='index'>
        <AtAccordion
          open={this.state.toView}
          onClick={this.toViewHandleClick.bind(this)}
          title='待处理'
        >
          <AtList hasBorder={false}>
            <AtListItem
              title='新用户'
              extraText='2019/10/31'
              arrow='right'
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/25'
              arrow='right'
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/24'
              arrow='right'
            />
          </AtList>
        </AtAccordion>
        <AtAccordion
          open={this.state.viewed}
          onClick={this.viewedHandleClick.bind(this)}
          title='已处理'
        >
          <AtSearchBar
            value={this.state.searchValue}
            onChange={this.changeInputValue.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />
          <AtList hasBorder={false}>
            <AtListItem
              title='新用户'
              extraText='2019/10/31'
              arrow='right'
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/30'
              arrow='right'
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/28'
              arrow='right'
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/25'
              arrow='right'
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/22'
              arrow='right'
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/21'
              arrow='right'
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/20'
              arrow='right'
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/18'
              arrow='right'
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/15'
              arrow='right'
            />
          </AtList>
          <AtPagination 
            total={50} 
            pageSize={10}
            current={1}
            onPageChange={this.changePage.bind(this)}
          >
          </AtPagination>
        </AtAccordion>
        
      </View>
    )
  }
}