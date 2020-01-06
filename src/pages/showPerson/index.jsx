import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import { AtList, AtListItem, AtAccordion } from "taro-ui"

@connect(({ common, usersManDetail }) => ({
  authen: common.authen,
  id: common.id,
  personName: common.personName,
  perPhone: common.perPhone,
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
    authen == '家长' && this.getFamilyDetail()
  }

  getStudentsDetail() {
    console.log('xuesheng')
    const {dispatch} = this.props
    dispatch({
      type:'usersManDetail/getStudentsDetail',
      payload:{
        id: this.props.id
      }
    })
  }

  getFamilyDetail() {
    console.log('jiazhang未处理')
    const {dispatch} = this.props
    dispatch({
      type:'usersManDetail/getFamilyDetail',
      payload:{
        id: this.props.id
      }
    })
  }

  // changeDetail = url => {
  //   Taro.navigateTo({
  //     url,
  //   })
  // }

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
    const  {authen, personName, perPhone } = this.props
    const {studentDetail,teacherDetail,managerDetail,familyDetail} = this.props
    const { openFamily, openCourses } = this.state

    return (
      <View className='index'>
      {
        authen == '管理员' &&
        <View>
          <AtList>
            <AtListItem
              title='真实姓名'
              extraText={personName}
            />
            <AtListItem
              title='电话号码'
              extraText={perPhone}
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
              extraText={personName}
            />
            <AtListItem
              title='电话号码'
              extraText={perPhone}
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
            {
              studentDetail.courses.length > 0 ?(
                <AtAccordion
                  open={openCourses}
                  onClick={this.showCourses.bind(this)}
                  title='课程情况'
                >
                  <AtList hasBorder={false}>
                    {
                      studentDetail.courses.map((item,index)=>{
                        return (
                          <AtListItem
                            key={index + item.courseName}
                            title={'课程名称: '+item.courseName}
                            note={'授课老师: '+item.teacherName}
                          />
                        )
                      })
                    }
                  </AtList>
                </AtAccordion>
              ):
              <AtListItem title='课程情况' extraText='待补充'/>
            }
          </AtList>
        </View>
        // <View>
        //   <AtList>
        //     <AtListItem
        //       arrow='right'
        //       title='真实姓名'
        //       extraText={personName}
        //     />
        //     <AtListItem
        //       arrow='right'
        //       title='本人电话'
        //       extraText={perPhone}
        //     />
        //     <AtListItem
        //       arrow='right'
        //       title='家长电话'
        //       extraText={parentPhone}
        //     />
        //     <AtListItem
        //       arrow='right'
        //       title='报名学科'
        //       extraText={coachingCourse}
        //     />
        //     {/* <AtListItem
        //       arrow='right'
        //       title='开始上课时间'
        //       extraText={beginProject}
        //     /> */}
        //     <AtListItem
        //       arrow='right'
        //       title='上课地区'
        //       extraText={classPlace}
        //       onClick={this.changeDetail.bind(this,`/pages/changeInformation/index?key=classPlace`)}
        //     />
        //   </AtList>
        // </View>
      }
      </View>
    )
  }
}
