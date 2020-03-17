import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import './index.scss'
import { connect } from '@tarojs/redux'

@connect(({ coachingProgram }) => ({
  ...coachingProgram
}))

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  };

  config = {
    navigationBarTitleText: '查看辅导方案(静态)'
  }

  componentWillMount() {
    this.getStudents()
  }

  changeDetail = url => {
    Taro.navigateTo({
      url,
    })
  }

getStudents() {
  const {dispatch} = this.props

}

  render () {
    return (
      <View>
        <AtList>
          <AtListItem
            arrow='right'
            title='学生1'
            extraText='高中语文'
            onClick={this.changeDetail.bind(this,`/pages/writeCoachingProgram/index?key=姓名`)}
          />
          <AtListItem
            arrow='right'
            title='学生2'
            extraText='高中数学'
            onClick={this.changeDetail.bind(this,`/pages/writeCoachingProgram/index?key=姓名`)}
          />
          <AtListItem
            arrow='right'
            title='学生3'
            extraText='高中英语'
            onClick={this.changeDetail.bind(this,`/pages/writeCoachingProgram/index?key=姓名`)}
          />
        </AtList>
      </View>
    )
  }
}
