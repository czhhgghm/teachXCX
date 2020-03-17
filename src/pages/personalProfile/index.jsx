import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"
import { connect } from '@tarojs/redux'

@connect(({ common, usersManDetail }) => ({
  studentDetail: usersManDetail.studentDetail,
  id: common.id
}))

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      name: '李阳'
    }
  };

  config = {
    navigationBarTitleText: '课程情况'
  }

  componentDidMount () {
    this.getStudentsDetail()
  }

  getStudentsDetail() {
    const {studentDetail,id,dispatch} = this.props
    console.log('studentDetail',studentDetail)
    console.log('id',id)
    if(studentDetail.courses.length == 0) {
      dispatch({
        type:'usersManDetail/getStudentsDetail',
        payload:{
          id: id
        }
      })
    }
  }

  changeDetail = url => {
    Taro.navigateTo({
      url,
    })
  }
  
  render () {
    const {studentDetail} = this.props
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
