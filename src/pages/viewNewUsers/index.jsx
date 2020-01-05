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

  selectPreItem = value => {
    this.setState({
      showPreModal: true
    })
  }

  handleClosePreModal() {
    console.log('点击了屏幕外,弹框消失即可')
    this.setState({
      showPreModal: false
    })
  }

  handleCancelPreModal() {
    console.log('执行"等候处理"的请求')
    this.setState({
      showPreModal: false
    })
  }

  handleConfirmPreModal() {
    console.log('执行"已处理"的请求')
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
    const content = '学生姓名:李云龙'+'\n'+'学生电话:13354687155'+'\n'+'家长电话:15623865478'
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
              onClick={this.selectPreItem.bind(this,'1')}
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/25'
              arrow='right'
              onClick={this.selectPreItem.bind(this,'2')}
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/24'
              arrow='right'
              onClick={this.selectPreItem.bind(this,'3')}
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
              onClick={this.selectItemed.bind(this,'4')}
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/30'
              arrow='right'
              onClick={this.selectItemed.bind(this,'4')}
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/28'
              arrow='right'
              onClick={this.selectItemed.bind(this,'4')}
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/25'
              arrow='right'
              onClick={this.selectItemed.bind(this,'4')}
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/22'
              arrow='right'
              onClick={this.selectItemed.bind(this,'4')}
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/21'
              arrow='right'
              onClick={this.selectItemed.bind(this,'4')}
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/20'
              arrow='right'
              onClick={this.selectItemed.bind(this,'4')}
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/18'
              arrow='right'
              onClick={this.selectItemed.bind(this,'4')}
            />
            <AtListItem
              title='新用户'
              extraText='2019/10/15'
              arrow='right'
              onClick={this.selectItemed.bind(this,'4')}
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
          title='新用户信息'
          cancelText='等候处理'
          confirmText='处理完成'
          onClose={ this.handleClosePreModal.bind(this) }
          onCancel={ this.handleCancelPreModal.bind(this) }
          onConfirm={ this.handleConfirmPreModal.bind(this) }
          content={content}
        />
        <AtModal
          isOpened={this.state.showModaled}
          title='新用户信息'
          confirmText='确定'
          onClose={ this.handleCloseModaled.bind(this) }
          onConfirm={ this.handleConfirmModaled.bind(this) }
          content={content}
        />
      </View>
    )
  }
}