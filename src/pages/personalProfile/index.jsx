import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"
import { connect } from '@tarojs/redux'

@connect(({ common, usersManDetail, writeCoachingProgram }) => ({
  studentDetail: usersManDetail.studentDetail,
  id: common.id,
  personGuidance: writeCoachingProgram.personGuidance
}))

export default class PersonalProfile extends Component {
  config = {
    navigationBarTitleText: '课程情况'
  }

  componentDidMount () {
    this.getStudentsDetail()
    this.getPersonGuidance()
  }

  getStudentsDetail() {
    const { studentDetail, id, dispatch } = this.props
    if(studentDetail.courses.length == 0) {
      dispatch({
        type:'usersManDetail/getStudentsDetail',
        payload:{
          id
        }
      })
    }
  }

  getPersonGuidance() {
    const { id, dispatch } = this.props;
    dispatch({
      type:'writeCoachingProgram/getPersonGuidance',
      payload:{
        id: id
      }
    })
  }

  showPersonGuidance = item => {
    const { personGuidance } = this.props;
    let noMatch = true;
    personGuidance.forEach(element => {
      if(element.teacherName == item.teacherName) {
        noMatch = false;
        Taro.showModal({
          title: '辅导方案',
          content: element.text,
          showCancel: false,
          confirmText: '确定'
        })
      }
    });
    if(noMatch) {
      Taro.showModal({
        title: '辅导方案',
        content: '授课老师暂无提供辅导方案',
        showCancel: false,
        confirmText: '确定'
      })
    }
  }
  
  render () {
    const { studentDetail } = this.props;
    return (
      <View className='index'>
        <AtList>
          {
            studentDetail.courses.length > 0 ?(
              <AtList hasBorder={true}>
                {
                  studentDetail.courses.map((item,index)=>{
                    return (
                      <AtListItem
                        key={index + item.courseName}
                        title={'课程名称: '+item.courseName}
                        extraText={'老师: '+item.teacherName}
                        note={item.begin+' 至 '+item.end}
                        onClick={this.showPersonGuidance.bind(this,item)}
                      />
                    )
                  })
                }
              </AtList>
            ):
            <AtListItem title='课程情况' extraText='暂无课程'/>
          }
        </AtList>
      </View>
    )
  }
}
