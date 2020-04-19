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
  managerDetail: usersManDetail.managerDetail
}))

export default class ShowPerson extends Component {
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
    authen == '家长' && this.getStudentsDetail()
    authen == '管理员' && this.getManagerDetail()
  }

  getStudentsDetail() {
    const {dispatch,id} = this.props
    dispatch({
      type:'usersManDetail/getStudentsDetail',
      payload:{
        id
      }
    })
  }

  getTeachersDetail() {
    const {dispatch,id} = this.props
    dispatch({
      type:'usersManDetail/getTeachersDetail',
      payload:{
        id
      }
    })
  }

  getManagerDetail() {
    const {dispatch,id} = this.props
    dispatch({
      type:'usersManDetail/getManagerDetail',
      payload:{
        id
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
    const { studentDetail, teacherDetail, managerDetail } = this.props
    const { openFamily } = this.state

    return (
      <View className='index'>
      {
        authen == '管理员' &&
        <View>
          <AtList>
            <AtListItem
              title='真实姓名'
              extraText={managerDetail.name?managerDetail.name:'数据请求中'}
            />
            <AtListItem
              title='电话号码'
              extraText={managerDetail.phone?managerDetail.phone:'数据请求中'}
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
              extraText={teacherDetail.name?teacherDetail.name:'数据请求中'}
            />
            <AtListItem
              title='电话号码'
              extraText={teacherDetail.phone?teacherDetail.phone:'数据请求中'}
            />
          </AtList>
        </View>
      }
      {
        (authen == '学生' || authen == '家长') &&
        <View>
          <AtList>
            <AtListItem title={authen == '家长'?'孩子姓名':'姓名'} extraText={studentDetail.name?studentDetail.name:'数据请求中'}/>
            <AtListItem title={authen == '家长'?'孩子电话':'电话'} extraText={studentDetail.phone?studentDetail.phone:'数据请求中'}/>
            <AtListItem title='上课地区' extraText={studentDetail.place?studentDetail.place:'数据请求中'}/>
            <AtListItem title={authen == '家长'?'孩子学校':'学校'} extraText={studentDetail.school?studentDetail.school:'数据请求中'}/>
            {
              studentDetail.families.length > 0 ?(
                <AtAccordion
                  open={openFamily}
                  onClick={this.showFamily.bind(this)}
                  title='家长情况'
                >
                  <AtList hasBorder={false}>
                  {
                    studentDetail.families.map((item)=>{
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
                <AtListItem title='家长信息' extraText='数据请求中'/>
            }
          </AtList>
        </View>
      }
      </View>
    )
  }
}
