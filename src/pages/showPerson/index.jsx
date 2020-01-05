import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"

@connect(({ common }) => ({
  authen: common.authen,
  personName: common.personName,
  perPhone: common.perPhone,
  parentPhone: common.parentPhone,
  coachingCourse: common.coachingCourse,
  beginProject: common.beginProject,
  classTime: common.classTime,
  classPlace: common.classPlace,
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


  componentDidMount () {
    
  }

  changeDetail = url => {
    Taro.navigateTo({
      url,
    })
  }

  render () {
    const {authen,personName,perPhone,parentPhone,coachingCourse,classTime,beginProject,classPlace} = this.props
    return (
      <View className='index'>
      {
        authen == '管理员'?
        <View>
          <AtList>
            <AtListItem
              arrow='right'
              title='真实姓名'
              extraText={personName}
            />
            <AtListItem
              arrow='right'
              title='电话号码'
              extraText={perPhone}
            />
          </AtList>
        </View>
        :authen == '老师'?
        <View>
          <AtList>
            <AtListItem
              arrow='right'
              title='真实姓名'
              extraText={personName}
            />
            <AtListItem
              arrow='right'
              title='电话号码'
              extraText={perPhone}
            />
            <AtListItem
              arrow='right'
              title='辅导学科'
              extraText={coachingCourse}
            />
          </AtList>
        </View>
        :
        <View>
          <AtList>
            <AtListItem
              arrow='right'
              title='真实姓名'
              extraText={personName}
            />
            <AtListItem
              arrow='right'
              title='本人电话'
              extraText={perPhone}
            />
            <AtListItem
              arrow='right'
              title='家长电话'
              extraText={parentPhone}
            />
            <AtListItem
              arrow='right'
              title='报名学科'
              extraText={coachingCourse}
            />
            {/* <AtListItem
              arrow='right'
              title='开始上课时间'
              extraText={beginProject}
            /> */}
            <AtListItem
              arrow='right'
              title='上课地区'
              extraText={classPlace}
              onClick={this.changeDetail.bind(this,`/pages/changeInformation/index?key=classPlace`)}
            />
          </AtList>
        </View>
      }
      </View>
    )
  }
}
