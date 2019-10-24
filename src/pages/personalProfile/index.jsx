import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  };

  config = {
    navigationBarTitleText: '个人档案'
  }

  componentWillMount () { }

  //按照时间顺序,返回给我这个学生的 课程和授课老师列表
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
            note='2019/3--2019/9'
            title='语文'
            extraText='王芳'
            onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=111`)}
          />
          <AtListItem
            arrow='right'
            note='2019/1--2019/3'
            title='数学'
            extraText='李强'
            onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=111`)}
          />
          <AtListItem
            arrow='right'
            note='2018/5--2018/12'
            title='英语'
            extraText='张杨'
            onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=111`)}            
          />
        </AtList>
      </View>
    )
  }
}
