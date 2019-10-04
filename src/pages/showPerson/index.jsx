import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '马天骅',
      grade: '高三',
      perPhone: 10086,
      parentPhone: 10086886
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
    const {name,grade,perPhone,parentPhone} = this.state
    return (
      <View className='index'>
        <AtList>
          <AtListItem
            arrow='right'
            title='姓名'
            extraText={name}
            onClick={this.changeDetail.bind(this,`/pages/changeInformation/index?key=姓名&value=${name}`)}
          />
          <AtListItem
            arrow='right'
            title='年级'
            extraText={grade}
            onClick={this.changeDetail.bind(this,`/pages/changeInformation/index?key=年级&value=${grade}`)}
          />
          <AtListItem
            arrow='right'
            title='学生电话'
            extraText={perPhone}
            onClick={this.changeDetail.bind(this,`/pages/changeInformation/index?key=学生电话&value=${perPhone}`)}
          />
          <AtListItem
            arrow='right'
            title='家长电话'
            extraText={parentPhone}
            onClick={this.changeDetail.bind(this,`/pages/changeInformation/index?key=家长电话&value=${parentPhone}`)}
          />
        </AtList>
      </View>
    )
  }
}
