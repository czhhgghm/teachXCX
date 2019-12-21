import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtAccordion } from "taro-ui"
import './index.scss'
import { connect } from '@tarojs/redux'

@connect(({ usersManDetail }) => ({
  studentDetail: usersManDetail.studentDetail,
  teacherDetail: usersManDetail.teacherDetail,
  managerDetail: usersManDetail.managerDetail,
  familyDetail: usersManDetail.familyDetail
}))

export default class UsersManDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
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

  handleClick (value) {
    this.setState({
      open: value
    })
  }

  async getPersonDetail() {
    const {select,id} = this.$router.params
    const {dispatch} = this.props
    if(select == '管理员') {
      console.log('管理员')
      // await dispatch({
      //   type:'usersManDetail/getManagersDetail',
      //   payload:{
      //     id,
      //   }
      // })
    }
    else if(select == '学生') {
      await dispatch({
        type:'usersManDetail/getStudentsDetail',
        payload:{
          id,
        }
      })
    }
    // else if(select == '老师') {
    //   await dispatch({
    //     type:'usersManDetail/getTeachersDetail',
    //     payload:{
    //       id,
    //     }
    //   })
    // }
    else if(select == '家长'){
      await dispatch({
        type:'usersManDetail/getFamilyDetail',
        payload:{
          id,
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


  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  
  render () {
    const {select} = this.$router.params
    const {studentDetail,teacherDetail,managerDetail,familyDetail} = this.props
    return (
      <View className='index'>
        {
          select == '管理员'?
          <View>
            <Text>管理员数据</Text>
            <Text>{managerDetail}</Text>
          </View>
          :select == '学生'?
          <View>
            <AtList>
              <AtListItem title='姓名' extraText={studentDetail.name?studentDetail.name:'待完善'}/>
              <AtListItem title='电话' extraText={studentDetail.phone?studentDetail.phone:'待完善'}/>
              <AtListItem title='上课地区' extraText={studentDetail.place?studentDetail.place:'待完善'}/>
              <AtListItem title='学校' extraText={studentDetail.school?studentDetail.school:'待完善'}/>
              {
                studentDetail.families.length > 0 ?(
                  <AtAccordion
                    open={this.state.open}
                    onClick={this.handleClick.bind(this)}
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
                <AtListItem title='家人信息' extraText='待完善'/>
              }
            </AtList>
          </View>
          :select == '家长'?
          <View>
            <AtList>
              <AtListItem title='姓名' extraText={familyDetail.name?familyDetail.name:'待完善'}/>
              <AtListItem title='电话' extraText={familyDetail.phone?familyDetail.phone:'待完善'}/>
              {
                familyDetail.children.length > 0 ?(
                  <AtAccordion
                    open={this.state.open}
                    onClick={this.handleClick.bind(this)}
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
                <AtListItem title='孩子信息' extraText='待完善'/>
              }
            </AtList>
          </View>
          :<View>
            <Text>老师数据</Text>
            <Text>{teacherDetail}</Text>
          </View>
        }
      </View>
    )
  }
}
