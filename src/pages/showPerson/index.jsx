import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import { AtList, AtListItem, AtAccordion } from "taro-ui"

@connect(({ common, usersManDetail }) => ({
  authen: common.authen,
  id: common.id,
  teacherDetail: usersManDetail.teacherDetail,
  studentDetail: usersManDetail.studentDetail,
  familyDetail: usersManDetail.familyDetail
}))

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openFamily: false,
      openCourses: false
    }
  };

  config = {
    navigationBarTitleText: '用户信息'
  }


  componentDidMount () {
    this.getDetail()
  }

  getDetail() {
    const {authen} = this.props
    authen == '学生' && this.getStudentsDetail()
    authen == '老师' && this.getTeachersDetail()
    authen == '家长' && this.getFamilyDetail()
  }

  getStudentsDetail() {
    const {dispatch} = this.props
    dispatch({
      type:'usersManDetail/getStudentsDetail',
      payload:{
        id: this.props.id
      }
    })
  }

  getTeachersDetail() {
    const {dispatch} = this.props
    dispatch({
      type:'usersManDetail/getTeachersDetail',
      payload:{
        id: this.props.id
      }
    })
  }

  getFamilyDetail() {
    const {dispatch} = this.props
    dispatch({
      type:'usersManDetail/getFamilyDetail',
      payload:{
        id: this.props.id
      }
    })
  }

  showFamily (value) {
    this.setState({
      openFamily: value
    })
  }

  showCourses (value) {
    this.setState({
      openCourses: value
    })
  }

  render () {
    const  { authen } = this.props
    const {studentDetail,teacherDetail} = this.props
    const { openFamily, openCourses } = this.state

    return (
      <View className='index'>
      {
        authen == '管理员' &&
        <View>
          <AtList>
            <AtListItem
              title='真实姓名'
              extraText='真实姓名'
            />
            <AtListItem
              title='电话号码'
              extraText='电话号码'
            />
          </AtList>
        </View>
      }
      {
        authen == '老师' &&
        <View>
          <AtList>
            <AtListItem
              title='真实姓名'
              extraText={teacherDetail.name?teacherDetail.name:'待补充'}
            />
            <AtListItem
              title='电话号码'
              extraText={teacherDetail.phone?teacherDetail.phone:'待补充'}
            />
          </AtList>
        </View>
      }
      {
        (authen == '学生' || authen == '家长') &&
        <View>
          <AtList>
            <AtListItem title='姓名' extraText={studentDetail.name?studentDetail.name:'待补充'}/>
            <AtListItem title='电话' extraText={studentDetail.phone?studentDetail.phone:'待补充'}/>
            <AtListItem title='上课地区' extraText={studentDetail.place?studentDetail.place:'待补充'}/>
            <AtListItem title='学校' extraText={studentDetail.school?studentDetail.school:'待补充'}/>
            {
              studentDetail.families.length > 0 ?(
                <AtAccordion
                  open={openFamily}
                  onClick={this.showFamily.bind(this)}
                  title='家长情况'
                >
                  <AtList hasBorder={false}>
                  {
                    studentDetail.families.map((item,index)=>{
                      return (
                        <AtListItem
                          key={item.id}
                          title={item.name}
                          note={item.phone}
                        />
                      )
                    })
                  }
                  </AtList>
                </AtAccordion>
              ):
                <AtListItem title='家人信息' extraText='待补充'/>
            }
          </AtList>
        </View>
      }
      </View>
    )
  }
}
