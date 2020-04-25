import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtAccordion, AtList, AtListItem, AtModal } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ writeCoachingProgram }) => ({
  pendingList: writeCoachingProgram.pendingList,
  passList: writeCoachingProgram.passList
}))

export default class ReviewProgram extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toView: false,
      viewed: false,
      showPreModal: false,
      showModaled: false,
      guidanceText: '',
      guidanceId: ''
    }
  };

  config = {
    navigationBarTitleText: '审核辅导方案'
  }

  componentWillMount() {
    this.getPendingList()
    this.getPassList()
  }

  getPendingList() {
    const { dispatch } = this.props;
    dispatch({
      type:'writeCoachingProgram/getPendingList',
      payload:{}
    })
  }

  getPassList() {
    const passList = wx.getStorageSync('passList')
    if(!passList) {
      const { dispatch } = this.props;
      dispatch({
        type:'writeCoachingProgram/getPassList',
        payload:{}
      })
    }
  }

  toViewHandleClick(value) {
    this.setState({
      toView: value
    })
  }

  selectPreItem = e => {
    this.setState({
      showPreModal: true,
      guidanceText: e.text,
      guidanceId: e.id
    })
  }

  viewedHandleClick(value) {
    this.setState({
      viewed: value
    })
  }

  handleClosePreModal() {
    this.setState({
      showPreModal: false
    })
  }

  handleCancelPreModal() {
    const { dispatch } = this.props
    const { guidanceId } = this.state
    dispatch({
      type:'writeCoachingProgram/rejectGuidance',
      payload:{
        guidanceId: guidanceId
      }
    },
      Taro.showToast({
        title: '处理成功'
      },setTimeout(() => {
        wx.reLaunch({
          url: '../home/index',
        })
      }, 500)
      )
    )
    this.setState({
      showPreModal: false
    })
  }

  handleConfirmPreModal() {
    const { dispatch } = this.props
    const { guidanceId } = this.state
    wx.removeStorageSync('passList')
    dispatch({
      type:'writeCoachingProgram/clearPassList',
      payload:{
        passList: []
      }
    })
    dispatch({
      type:'writeCoachingProgram/passGuidance',
      payload:{
        guidanceId: guidanceId
      }
    },
      Taro.showToast({
        title: '处理成功'
      },setTimeout(() => {
        wx.reLaunch({
          url: '../home/index',
        })
      }, 500)
      )
    )
    this.setState({
      showPreModal: false
    })
  }

  selectItemed = e => {
    this.setState({
      showModaled: true,
      guidanceText: e.text
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
  
  render() {
    const { pendingList, passList } = this.props
    const { guidanceText } = this.state
    return (
      <View className='index'>
        <AtAccordion
          open={this.state.toView}
          onClick={this.toViewHandleClick.bind(this)}
          title='待审核'
        >
          <AtList hasBorder={false}>
          {
            pendingList.length > 0 && (
              pendingList.map((item)=>{
                return (
                  <AtListItem
                    title={item.teacherName}
                    note={item.time.substring(0,10)}
                    extraText={item.studentName}
                    key={item.id}
                    arrow='right'
                    onClick={this.selectPreItem.bind(this,item)}
                  />
                )
              })
            )
          }
          </AtList>
        </AtAccordion>
        <AtAccordion
          open={this.state.viewed}
          onClick={this.viewedHandleClick.bind(this)}
          title='已通过'
        >
          <AtList hasBorder={false}>
          {
            passList.length > 0 && (
              passList.map((item)=>{
                return (
                  <AtListItem
                    title={item.teacherName}
                    note={item.time.substring(0,10)}
                    extraText={item.studentName}
                    key={item.id}
                    arrow='right'
                    onClick={this.selectItemed.bind(this,item)}
                  />
                )
              })
            )
          }
          </AtList>
        </AtAccordion>
        <AtModal
          isOpened={this.state.showPreModal}
          title='拟定方案'
          cancelText='不通过'
          confirmText='通过'
          onClose={ this.handleClosePreModal.bind(this) }
          onCancel={ this.handleCancelPreModal.bind(this) }
          onConfirm={ this.handleConfirmPreModal.bind(this) }
          content={guidanceText}
        />
        <AtModal
          isOpened={this.state.showModaled}
          title='已通过方案'
          confirmText='确定'
          onClose={ this.handleCloseModaled.bind(this) }
          onConfirm={ this.handleConfirmModaled.bind(this) }
          content={guidanceText}
        />
      </View>
    )
  }
}