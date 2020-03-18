import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import './index.scss'
import { connect } from '@tarojs/redux'

@connect(({ coachingProgram, common }) => ({
  id: common.id,
  studentList: coachingProgram.studentList
}))

export default class CoachingProgram extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  };

  config = {
    navigationBarTitleText: '查看辅导方案'
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
  const { dispatch, id } = this.props
  dispatch({
    type:'coachingProgram/getStudents',
    payload:{
      id,
    }
  })
}

  render () {
    const { studentList } = this.props
    return (
      <View>
        <AtList>
          {
            studentList.length > 0 ? studentList.map((item)=>{
              return (
                <AtListItem
                  arrow='right'
                  key={item.studentId}
                  title={item.studentName}
                  extraText={item.courseName}
                  onClick={this.changeDetail.bind(this,`/pages/writeCoachingProgram/index?studentId=${item.studentId}`)}
                />
              )
            }):(
              <AtListItem
                title='暂无学生信息'
              />
            )
          }
        </AtList>
      </View>
    )
  }
}
