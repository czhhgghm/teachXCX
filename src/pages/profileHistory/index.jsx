import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtCard, AtModal } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ common }) => ({
  ...common
}))

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpened: true,
    }
  };

  config = {
    navigationBarTitleText: '辅导方案与历史评价'
  }

  componentWillMount () { }

  componentDidMount () {
    console.log('路由传递:',this.$router.params)
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
  
  render () {
    const {isOpened} = this.state
    const name = this.$router.params.key
    return (
      <View className='index'>
        <AtModal
          isOpened={isOpened}
          title='辅导方案'
          cancelText='取消'
          confirmText='确认'
          onCancel={ this.handleCancel.bind(this) }
          onConfirm={ this.handleConfirm.bind(this) }
          content='该生基础较强,可以适当冲刺重点难点'
        />
        <AtCard
          className="cardStyle"
          note='2019/10/17'
          title='李阳'
          extra='教师评价'
        >
          学生课堂表现认真,态度值得肯定
        </AtCard>
        <AtCard
          note='2019/10/10'
          title='李阳'
          extra='教师评价'
          className="cardStyle"
        >
          测试用例
        </AtCard>
        <AtCard
          note='2019/10/03'
          title='李阳'
          extra='教师评价'
          className="cardStyle"
        >
          测试用例
        </AtCard>
        <AtCard
          note='2019/09/26'
          title='李阳'
          extra='教师评价'
          className="cardStyle"
        >
          测试用例
        </AtCard>
        <AtCard
          note='2019/09/26'
          title='李阳'
          extra='教师评价'
          className="cardStyle"
        >
          测试用例
        </AtCard>
        <AtCard
          note='2019/09/26'
          title='李阳'
          extra='教师评价'
          className="cardStyle"
        >
          测试用例
        </AtCard>
      </View>
    )
  }
}
