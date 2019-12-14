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
      // isCircle: true,
      // btnLoading: false,
      // btnDisabled: false
    }
  };

  config = {
    navigationBarTitleText: '辅导方案与历史评价'
  }

  componentWillMount () { }

  componentDidMount () {
    //路由传递
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

  // getMoreProfile() {
  //   this.setState({
  //     btnLoading: true
  //   })

  //   setTimeout(() => {
  //     //当没有数据了,将按钮禁用
  //     this.setState({
  //       btnLoading: false,
  //       btnDisabled: true
  //     })
  //   }, 2000);
  // }
  
  render () {
    // const {isOpened,btnLoading,isCircle,btnDisabled} = this.state
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
        {/* <View className="separate">
        {
          btnDisabled==false?
          <AtButton 
            type='secondary' 
            className="bottom-btn" 
            size='small'
            disabled={btnDisabled}
            circle={isCircle}
            onClick={this.getMoreProfile.bind(this)}
            loading={btnLoading}
          >查看更多
          </AtButton>
          :
          <AtButton 
            type='secondary' 
            className="bottom-btn" 
            size='small'
            disabled={btnDisabled}
            circle={isCircle}
            onClick={this.getMoreProfile.bind(this)}
            loading={btnLoading}
          >没有更多了
          </AtButton>
        }
        </View> */}
      </View>
    )
  }
}
