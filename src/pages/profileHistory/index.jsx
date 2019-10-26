import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtCard, AtModal,AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ common }) => ({
  userName: common.userName
}))

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpened: true,
      isCircle: true,
      btnLoading: false
    }
  };

  config = {
    navigationBarTitleText: '辅导方案与历史评价'
  }

  componentWillMount () { }

  componentDidMount () {
    //路由传递
    console.log(this.$router.params)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleConfirm() {
    this.setState({
      isOpened: false
    })
  }
  handleCancel() {
    this.setState({
      isOpened: false
    })
  }

  getMoreProfile() {
    this.setState({
      btnLoading: true
    })
  }
  
  render () {
    const {userName} = this.props
    const {isOpened,btnLoading,isCircle} = this.state
    const name = this.$router.params.key
    return (
      <View className='index'>
        <AtModal
          isOpened={isOpened}
          title={name}
          cancelText='取消'
          confirmText='确认'
          onCancel={ this.handleCancel.bind(this) }
          onConfirm={ this.handleConfirm.bind(this) }
          content='该生基础较强,可以适当冲刺重点难点'
        />
        <AtCard
          className="cardStyle"
          note='2019/10/17'
          extra={userName}
          title='评分:4'
          thumb='https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
        >
          感觉老师的上课速度偏快,有点跟不上节奏
        </AtCard>
        <AtCard
          note='2019/10/10'
          extra={userName}
          title='评分:4'
          thumb='https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
          className="cardStyle"
        >
          感觉老师的上课速度偏快,有点跟不上节奏
        </AtCard>
        <AtCard
          note='2019/10/03'
          extra={userName}
          title='评分:4'
          thumb='https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
          className="cardStyle"
        >
          感觉老师的上课速度偏快,有点跟不上节奏
        </AtCard>
        <AtCard
          note='2019/09/26'
          extra={userName}
          title='评分:4'
          thumb='https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
          className="cardStyle"
        >
          感觉老师的上课速度偏快,有点跟不上节奏
        </AtCard>
        <AtButton 
          type='secondary' 
          className="bottom-btn" 
          size='small'
          circle={isCircle}
          onClick={this.getMoreProfile.bind(this)}
          loading={btnLoading}
        >查看更多
        </AtButton>
      </View>
    )
  }
}
