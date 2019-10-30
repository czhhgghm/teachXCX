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
    navigationBarTitleText: '审核辅导方案'
  }

  componentWillMount () {}

  showPrompt() {
    wx.showToast({
      title: '有3份辅导方案待审核',
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
          title='待审核'
        >
          <AtList hasBorder={false}>
            <AtListItem
              title='李强'
              note='2019/10/31'
              extraText='学生1'
              arrow='right'
            />
            <AtListItem
              title='李强'
              note='2019/10/28'
              extraText='学生2'
              arrow='right'
            />
            <AtListItem
              title='李强'
              note='2019/10/25'
              extraText='学生3'
              arrow='right'
            />
          </AtList>
        </AtAccordion>
        <AtAccordion
          open={this.state.viewed}
          onClick={this.viewedHandleClick.bind(this)}
          title='已通过'
        >
          <AtSearchBar
            value={this.state.searchValue}
            onChange={this.changeInputValue.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />
          <AtList hasBorder={false}>
            <AtListItem
              title='李强'
              note='2019/10/31'
              extraText='学生1'
              arrow='right'
            />
            <AtListItem
              title='李强'
              note='2019/10/28'
              extraText='学生2'
              arrow='right'
            />
            <AtListItem
              title='李强'
              note='2019/10/25'
              extraText='学生3'
              arrow='right'
            />
            <AtListItem
              title='李强'
              note='2019/10/22'
              extraText='学生4'
              arrow='right'
            />
            <AtListItem
              title='李强'
              note='2019/10/20'
              extraText='学生5'
              arrow='right'
            />
            <AtListItem
              title='李强'
              note='2019/10/18'
              extraText='学生6'
              arrow='right'
            />
            <AtListItem
              title='李强'
              note='2019/10/15'
              extraText='学生7'
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