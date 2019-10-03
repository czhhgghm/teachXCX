import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  };

  config = {
    navigationBarTitleText: '用户信息'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  changeDetail = url => {
    Taro.navigateTo({
      url,
    })
  }

  render () {
    return (
      <View className='index'>
        <AtList>
          <AtListItem
            arrow='right'
            title='姓名'
            extraText='马天骅'
            onClick={this.changeDetail.bind(this,'/pages/changeInformation/index')}
          />
          <AtListItem
            arrow='right'
            title='年级'
            extraText='高三'
            onClick={this.changeDetail.bind(this,'/pages/changeInformation/index')}
          />
          <AtListItem
            arrow='right'
            title='学生电话'
            extraText='10086'
            onClick={this.changeDetail.bind(this,'/pages/changeInformation/index')}
          />
          <AtListItem
            arrow='right'
            title='家长电话'
            extraText='10086886'
            onClick={this.changeDetail.bind(this,'/pages/changeInformation/index')}
          />
        </AtList>
      </View>
    )
  }
}
