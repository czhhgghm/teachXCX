import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtModal } from 'taro-ui'

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
    navigationBarTitleText: '查看新用户(静态)'
  }

  componentWillMount () {}

  selectPreItem = value => {
    console.log('value',value)
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

  // selectItemed() {
  //   this.setState({
  //     showModaled: true
  //   })
  // }

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