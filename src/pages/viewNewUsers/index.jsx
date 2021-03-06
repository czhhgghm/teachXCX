import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtModal } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ signUp }) => ({
  recommandList: signUp.recommandList
}))

export default class ViewNewUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPreModal: false,
      showModaled: false,
      userDetail: '',
      selectId: 0
    }
  };

  config = {
    navigationBarTitleText: '查看新用户'
  }

  componentWillMount () {
    this.recommandList()
  }

  recommandList() {
    const {dispatch} = this.props
    dispatch({
      type:'signUp/getRecommandList'
    })
  }

  selectPreItem = item => {
    const { name, parentPhone, studentPhone } = item
    const userDetail = `学生姓名:${name}`+'\n'+`学生电话:${parentPhone}`+'\n'+`家长电话:${studentPhone}` 
    this.setState({
      showPreModal: true,
      selectId: item.id,
      userDetail
    })
  }

  handleClosePreModal() {
    this.setState({
      showPreModal: false
    })
  }

  handleCancelPreModal() {
    this.setState({
      showPreModal: false
    })
  }

  handleConfirmPreModal() {
    const {dispatch} = this.props
    const {selectId} = this.state
    dispatch({
      type:'signUp/reviewRecommand',
      payload:{
        id: selectId
      }
    },this.setState({
      showPreModal: false
    }))
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
    const { recommandList } = this.props
    const { userDetail } = this.state
    return (
      <View className='index'>
        <AtList hasBorder={false}>
        {
          recommandList.length > 0 ? recommandList.map((item) => {
            return (
              <AtListItem
                title={item.name}
                key={item.id}
                arrow='right'
                onClick={this.selectPreItem.bind(this,item)}
              />  
            )
          })
          :<Text>暂无新用户</Text>
        }
        </AtList>
        <AtModal
          isOpened={this.state.showPreModal}
          title='新用户信息'
          cancelText='人工处理'
          confirmText='处理完成'
          onClose={ this.handleClosePreModal.bind(this) }
          onCancel={ this.handleCancelPreModal.bind(this) }
          onConfirm={ this.handleConfirmPreModal.bind(this) }
          content={userDetail}
        />
      </View>
    )
  }
}