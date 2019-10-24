import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtCard, AtLoadMore } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ common }) => ({
  userName: common.userName
}))

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'more'
    }
  };

  config = {
    navigationBarTitleText: '档案历史'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick () {
    // 开始加载
    this.setState({
      status: 'loading'
    })
    // 模拟异步请求数据
    setTimeout(() => {
      // 没有更多了
      this.setState({
        status: 'noMore'
      })
    }, 2000)
  }

  
  render () {
    const {userName} = this.props
    return (
      <View className='index'>
        <AtCard
          className="cardStyle"
          note='2019/10/24'
          extra={userName}
          title='评分:4'
          thumb='https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
        >
          感觉老师的上课速度偏快,有点跟不上节奏
        </AtCard>
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
        <AtLoadMore
          onClick={this.handleClick.bind(this)}
          status={this.state.status}
        />
      </View>
    )
  }
}
