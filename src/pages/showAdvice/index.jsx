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
      selectContent: ''
    }
  };

  config = {
    navigationBarTitleText: '查看建议'
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

  selectPreItem = value => {
    this.setState({
      showModal: true,
      selectContent: value
    })
  }

  handleClosePreModal() {
    this.setState({
      showModal: false
    })
  }


  handleConfirmPreModal() {
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
          adviceData.map((item,index)=>{
            return (
              <AtListItem
                key={index}
                title={item.name}
                extraText={item.authen}
                note={item.phone}
                onClick={this.selectPreItem.bind(this,item.opinion)}
              />
            )
          })
        }
        </AtList>
        <AtModal
          isOpened={showModal}
          title='用户建议'
          confirmText='确定'
          onClose={ this.handleClosePreModal.bind(this) }
          onConfirm={ this.handleConfirmPreModal.bind(this) }
          content={selectContent}
        />
      </View>
    )
  }
}