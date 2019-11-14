import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtAccordion, AtList, AtListItem, AtPagination, AtSearchBar, AtModal } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toView: false,
      viewed: false,
      searchValue: '',
      showPreModal: false,
      showModaled: false,
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

  selectPreItem = value => {
    this.setState({
      showPreModal: true
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
  }

  onActionClick() {
    console.log('点击搜索')
  }

  handleClosePreModal() {
    console.log('点击了屏幕外,弹框消失即可')
    this.setState({
      showPreModal: false
    })
  }

  handleCancelPreModal() {
    console.log('执行不通过的请求')
    this.setState({
      showPreModal: false
    })
  }

  handleConfirmPreModal() {
    console.log('执行通过的请求')
    this.setState({
      showPreModal: false
    })
  }

  selectItemed() {
    this.setState({
      showModaled: true
    })
  }

  handleCloseModaled() {
    this.setState({
      showModaled: false
    })
  }

  handleConfirmModaled() {
    this.setState({
      showModaled: false
    })
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
              title='李强1'
              note='2019/10/31'
              extraText='学生1'
              arrow='right'
              onClick={this.selectPreItem.bind(this,'1')}
            />
            <AtListItem
              title='李强2'
              note='2019/10/28'
              extraText='学生2'
              arrow='right'
              onClick={this.selectPreItem.bind(this,'2')}
            />
            <AtListItem
              title='李强3'
              note='2019/10/25'
              extraText='学生3'
              arrow='right'
              onClick={this.selectPreItem.bind(this,'3')}
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
              onClick={this.selectItemed.bind(this,'1')}
            />
            <AtListItem
              title='李强'
              note='2019/10/28'
              extraText='学生2'
              arrow='right'
              onClick={this.selectItemed.bind(this,'2')}
            />
            <AtListItem
              title='李强'
              note='2019/10/25'
              extraText='学生3'
              arrow='right'
              onClick={this.selectItemed.bind(this,'3')}
            />
            <AtListItem
              title='李强'
              note='2019/10/22'
              extraText='学生4'
              arrow='right'
              onClick={this.selectItemed.bind(this,'4')}
            />
            <AtListItem
              title='李强'
              note='2019/10/20'
              extraText='学生5'
              arrow='right'
              onClick={this.selectItemed.bind(this,'5')}
            />
            <AtListItem
              title='李强'
              note='2019/10/18'
              extraText='学生6'
              arrow='right'
              onClick={this.selectItemed.bind(this,'6')}
            />
            <AtListItem
              title='李强'
              note='2019/10/15'
              extraText='学生7'
              arrow='right'
              onClick={this.selectItemed.bind(this,'7')}
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
        <AtModal
          isOpened={this.state.showPreModal}
          title='拟定方案'
          cancelText='不通过'
          confirmText='通过'
          onClose={ this.handleClosePreModal.bind(this) }
          onCancel={ this.handleCancelPreModal.bind(this) }
          onConfirm={ this.handleConfirmPreModal.bind(this) }
          content='该生基础薄弱,更加注重基本功的训练'
        />
        <AtModal
          isOpened={this.state.showModaled}
          title='已通过方案'
          confirmText='确定'
          onClose={ this.handleCloseModaled.bind(this) }
          onConfirm={ this.handleConfirmModaled.bind(this) }
          content='该生基础薄弱,更加注重基本功的训练'
        />
      </View>
    )
  }
}