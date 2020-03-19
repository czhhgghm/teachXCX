import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem, AtAccordion, AtButton } from "taro-ui";
import './index.scss';
import { connect } from '@tarojs/redux';

@connect(({ usersManDetail, coachingProgram }) => ({
  studentDetail: usersManDetail.studentDetail,
  teacherDetail: usersManDetail.teacherDetail,
  managerDetail: usersManDetail.managerDetail,
  familyDetail: usersManDetail.familyDetail,
  studentList: coachingProgram.studentList
}))

export default class UsersManDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openFamily: false,
      openCourses: false,
      openStudent: false,
      removeId: []
    }
  };

  config = {
    navigationBarTitleText: '用户详情'
  }

  componentWillMount () {

  }

  async componentDidMount () {
    this.getPersonDetail()
  }

  showFamily (value) {
    this.setState({
      openFamily: value
    })
  }

  showStudent (value) {
    this.setState({
      openStudent: value
    })
  }

  showCourses (value) {
    this.setState({
      openCourses: value
    })
  }

  async getPersonDetail() {
    const {select,id} = this.$router.params
    const {dispatch} = this.props
    if(select == '管理员') {
      await dispatch({
        type:'usersManDetail/getManagerDetail',
        payload:{
          id
        }
      })
    }
    else if(select == '学生') {
      await dispatch({
        type:'usersManDetail/getStudentsDetail',
        payload:{
          id
        }
      })
    }
    else if(select == '老师') {
      await dispatch({
        type:'usersManDetail/getTeachersDetail',
        payload:{
          id
        }
      })
      await dispatch({
        type:'coachingProgram/getStudents',
        payload:{
          id
        }
      })
    }
    else if(select == '家长'){
      await dispatch({
        type:'usersManDetail/getFamilyDetail',
        payload:{
          id
        }
      })
    }
    else {
      Taro.showToast({
        title: '请求数据失败',
        icon: 'none',
        duration: 1000
      })
    }
  }

  addCourse() {
    const { id } = this.$router.params
    Taro.navigateTo({
      url: `/pages/addCourse/index?id=${id}`
    })
  }

  removeClass = coureseIds => {
    const {dispatch} = this.props
    Taro.showModal({
      title: '提示',
      content: '你确定要删除该课程吗?',
      success: function(res) {
        if (res.confirm) {
          coureseIds.forEach(element => {
            dispatch({
              type:'common/removeCourse',
              payload:{
                id: element
              }
            })
          },
            Taro.showToast({
              title: '删除成功'
            },setTimeout(() => {
              wx.reLaunch({
                url: '../home/index',
              })
            }, 1500)
            )
          )
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  render () {
    const { select } = this.$router.params;
    const { studentDetail, teacherDetail, managerDetail, familyDetail, studentList } = this.props;
    const { openFamily, openCourses, openStudent } = this.state;
    return (
      <View className='index'>
        {
          select == '管理员' &&
          <View>
            <AtList>
              <AtListItem title='姓名' extraText={managerDetail.name?managerDetail.name:'待补充'}/>
              <AtListItem title='电话' extraText={managerDetail.phone?managerDetail.phone:'待补充'}/>
            </AtList>
          </View>
        }
        {
          select == '学生' &&
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
                              extraText={item.phone}
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
                              extraText={item.teacherName}
                              onClick={this.removeClass.bind(this,item.coureseIds)}
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
            <AtButton type='primary' onClick={this.addCourse.bind(this)}>添加课程</AtButton>
          </View>
        }
        {
          select == '家长' &&
          <View>
            <AtList>
              <AtListItem title='姓名' extraText={familyDetail.name?familyDetail.name:'待补充'}/>
              <AtListItem title='电话' extraText={familyDetail.phone?familyDetail.phone:'待补充'}/>
              {
                familyDetail.children.length > 0 ?(
                  <AtAccordion
                    open={openFamily}
                    onClick={this.showFamily.bind(this)}
                    title='孩子情况'
                  >
                    <AtList hasBorder={false}>
                      {
                        familyDetail.children.map((item,index)=>{
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
                <AtListItem title='孩子信息' extraText='待补充'/>
              }
            </AtList>
          </View>
        }
        {
          select == '老师' &&
          <View>
            <AtList>
              <AtListItem title='姓名' extraText={teacherDetail.name?teacherDetail.name:'待补充'}/>
              <AtListItem title='电话' extraText={teacherDetail.phone?teacherDetail.phone:'待补充'}/>
              {
                studentList.length > 0 ? (
                  <AtAccordion
                    open={openStudent}
                    onClick={this.showStudent.bind(this)}
                    title='学生情况'
                  >
                    <AtList hasBorder={false}>
                    {
                      studentList.map((item)=>{
                        return (
                          <AtListItem
                            key={item.studentId}
                            title={item.studentName}
                            extraText={item.courseName}
                          />
                        )
                      })
                    }
                    </AtList>
                  </AtAccordion>
                ):
                <AtListItem title='学生信息' extraText='暂无'/>
              }
            </AtList>
          </View>
        }
      </View>
    )
  }
}
