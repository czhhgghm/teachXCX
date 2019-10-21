import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"

@connect(({ common }) => ({
  userName: common.userName,
  perPhone: common.perPhone,
  parentPhone: common.parentPhone,
  coachingCourse: common.coachingCourse,
  beginProject: common.beginProject,
  classTime: common.classTime,
  classPlace: common.classPlace,
  studySituation: common.studySituation
}))

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

  componentDidMount () {
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  changeDetail = url => {
    Taro.navigateTo({
      url,
    })
  }

  render () {
    const {userName,perPhone,parentPhone,coachingCourse,classTime,beginProject,classPlace,studySituation} = this.props
    return (
      <View className='index'>
        <AtList>
          <AtListItem
            arrow='right'
            title='姓名'
            extraText={userName}
            onClick={this.changeDetail.bind(this,`/pages/changeInformation/index?key=userName`)}
          />
          <AtListItem
            arrow='right'
            title='学生电话'
            extraText={perPhone}
            onClick={this.changeDetail.bind(this,`/pages/changeInformation/index?key=perPhone`)}
          />
          <AtListItem
            arrow='right'
            title='家长电话'
            extraText={parentPhone}
            onClick={this.changeDetail.bind(this,`/pages/changeInformation/index?key=parentPhone`)}
          />
          <AtListItem
            arrow='right'
            title='辅导学科'
            extraText={coachingCourse}
            // onClick={this.changeDetail.bind(this,`/pages/changeInformation/index?key=coachingCourse`)}
          />
          <AtListItem
            arrow='right'
            title='开始上课时间'
            extraText={beginProject}
            // onClick={this.changeDetail.bind(this,`/pages/changeInformation/index?key=beginProject`)}
          />
          <AtListItem
            arrow='right'
            title='上课时段'
            extraText={classTime}
            onClick={this.changeDetail.bind(this,`/pages/changeInformation/index?key=classTime`)}
          />
          <AtListItem
            arrow='right'
            title='上课地区'
            extraText={classPlace}
            onClick={this.changeDetail.bind(this,`/pages/changeInformation/index?key=classPlace`)}
          />
          <AtListItem
            arrow='right'
            title='学科学习情况'
            extraText={studySituation}
            onClick={this.changeDetail.bind(this,`/pages/changeInformation/index?key=studySituation`)}
          />
        </AtList>
      </View>
    )
  }
}
