import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtModal } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ common }) => ({
  adviceData: common.adviceData
}))

export default class ShowAdvice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      selectContent: '',
      deleteId: -1
    }
  };

  config = {
    navigationBarTitleText: '查看意见'
  }

  componentWillMount () { }

  componentDidMount () {
    this.getNewAdvice()
  }

  getNewAdvice() {
    const { dispatch } = this.props
    dispatch({
      type:'common/getNewAdvice'
    })
  }

  selectPreItem = item => {
    this.setState({
      showModal: true,
      selectContent: item.opinion,
      deleteId: item.id
    })
  }

  handleCloseModal() {
    this.setState({
      showModal: false
    })
  }

  handleCancelModal() {
    this.setState({
      showModal: false
    })
  }


  handleConfirmModal() {
    const { dispatch } = this.props
    const { deleteId } = this.state
    dispatch({
      type:'common/deleteAdvice',
      payload:{
        id: deleteId
      }
    },
      Taro.showToast({
        title: '删除成功'
      },setTimeout(() => {
        wx.reLaunch({
          url: '../home/index'
        })
      }, 500)
      )
    )
    this.setState({
      showModal: false
    })
  }

  render () {
    const adviceData = wx.getStorageSync('adviceData')?wx.getStorageSync('adviceData'):this.props.adviceData
    const { selectContent, showModal } = this.state
    return (
      <View className='index'>
        <AtList hasBorder={false}>
        {
          adviceData.map((item)=>{
            return (
              <AtListItem
                key={item.id}
                title={item.name}
                extraText={item.authen}
                note={item.phone}
                onClick={this.selectPreItem.bind(this,item)}
              />
            )
          })
        }
        </AtList>
        <AtModal
          isOpened={showModal}
          title='用户建议'
          cancelText='取消'
          confirmText='删除建议'
          onClose={ this.handleCloseModal.bind(this) }
          onCancel={ this.handleCancelModal.bind(this) }
          onConfirm={ this.handleConfirmModal.bind(this) }
          content={selectContent}
        />
      </View>
    )
  }
}