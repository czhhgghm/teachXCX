import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      name: '李阳'
    }
  };

  config = {
    navigationBarTitleText: '个人档案'
  }

  //按照时间顺序,返回给我这个学生的 课程和授课老师列表
  componentDidMount () { }

  changeDetail = url => {
    Taro.navigateTo({
      url,
    })
  }
  
  render () {
    const {name} = this.state
    return (
      <View className='index'>
        <AtList>
          <AtListItem
            arrow='right'
            note='2019/3--2019/9'
            title='高一语文'
            extraText={name}
            onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=${name}`)}
          />
          <AtListItem
            arrow='right'
            note='2019/1--2019/3'
            title='高二数学'
            extraText={name}
            onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=${name}`)}
          />
          <AtListItem
            arrow='right'
            note='2018/5--2018/12'
            title='高三英语'
            extraText={name}
            onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=${name}`)}            
          />
        </AtList>
      </View>
    )
  }
}
