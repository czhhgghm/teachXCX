import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtAccordion, AtList, AtListItem, AtPagination, AtSearchBar, AtModal } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ common }) => ({
  ...common
}))


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
    navigationBarTitleText: '查看建议'
  }

  componentWillMount () { }

  componentDidMount () {
    // this.showPrompt()
    this.getNewAdvice()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // showPrompt() {
  //   wx.showToast({
  //     title: '有3条最新的建议待查看',
  //     icon: 'none',
  //     duration: 2000
  //   })
  // }

  getNewAdvice() {
    const {dispatch} = this.props
    dispatch({
      type:'common/getNewAdvice'
    })
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
    console.log('执行等候处理的请求')
    this.setState({
      showPreModal: false
    })
  }

  handleConfirmPreModal() {
    console.log('执行处理完成的请求')
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
          title='待查看'
        >
          <AtList hasBorder={false}>
            <AtListItem
              title='王明'
              extraText='2019/10/31'
              arrow='right'
              onClick={this.selectPreItem.bind(this,'1')}
            />
            <AtListItem
              title='李东'
              extraText='2019/10/25'
              arrow='right'
              onClick={this.selectPreItem.bind(this,'2')}
            />
            <AtListItem
              title='李琳'
              extraText='2019/10/24'
              arrow='right'
              onClick={this.selectPreItem.bind(this,'3')}
            />
          </AtList>
        </AtAccordion>
        <AtAccordion
          open={this.state.viewed}
          onClick={this.viewedHandleClick.bind(this)}
          title='已查看'
        >
          <AtSearchBar
            value={this.state.searchValue}
            onChange={this.changeInputValue.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />
          <AtList hasBorder={false}>
            <AtListItem
              title='王明'
              extraText='2019/10/31'
              arrow='right'
              onClick={this.selectItemed.bind(this,'1')}
            />
            <AtListItem
              title='李东'
              extraText='2019/10/30'
              arrow='right'
              onClick={this.selectItemed.bind(this,'2')}
            />
            <AtListItem
              title='李琳'
              extraText='2019/10/28'
              arrow='right'
              onClick={this.selectItemed.bind(this,'3')}
            />
            <AtListItem
              title='王明'
              extraText='2019/10/25'
              arrow='right'
              onClick={this.selectItemed.bind(this,'4')}
            />
            <AtListItem
              title='李东'
              extraText='2019/10/22'
              arrow='right'
              onClick={this.selectItemed.bind(this,'5')}
            />
            <AtListItem
              title='李琳'
              extraText='2019/10/20'
              arrow='right'
              onClick={this.selectItemed.bind(this,'6')}
            />
            <AtListItem
              title='王明'
              extraText='2019/10/18'
              arrow='right'
              onClick={this.selectItemed.bind(this,'7')}
            />
            <AtListItem
              title='李东'
              extraText='2019/10/16'
              arrow='right'
              onClick={this.selectItemed.bind(this,'8')}
            />
            <AtListItem
              title='李琳'
              extraText='2019/10/5'
              arrow='right'
              onClick={this.selectItemed.bind(this,'9')}
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
          title='待查看建议'
          cancelText='等候处理'
          confirmText='处理完成'
          onClose={ this.handleClosePreModal.bind(this) }
          onCancel={ this.handleCancelPreModal.bind(this) }
          onConfirm={ this.handleConfirmPreModal.bind(this) }
          content='老师上课态度一般,进度感觉太慢了,希望有所改进'
        />
        <AtModal
          isOpened={this.state.showModaled}
          title='已查看方案'
          confirmText='确定'
          onClose={ this.handleCloseModaled.bind(this) }
          onConfirm={ this.handleConfirmModaled.bind(this) }
          content='老师上课态度一般,进度感觉太慢了,希望有所改进'
        />
      </View>
    )
  }
}