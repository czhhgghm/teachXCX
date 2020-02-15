import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtCard } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ usersManage }) => ({
  studentFB: usersManage.studentFB,
  teacherFB: usersManage.teacherFB
}))

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
        allClassFB: []
    }
  };

  config = {
    navigationBarTitleText: '反馈详情'
  }

  componentWillMount() {
      this.selectToShow()
  }

  selectToShow() {
    if(this.$router.params.key == 'studentGetTeacherFB') {
        this.setState({
            allClassFB: this.props.studentFB
        })
    }
    if(this.$router.params.key == 'teacherGetStudentFB') {
        this.setState({
            allClassFB: this.props.teacherFB
        })
    }
  }

  render () {
    const {allClassFB} = this.state
    return (
        <View className='index'>
            {
                allClassFB.length > 0 ? allClassFB.map((item)=>{
                    return (
                        <AtCard
                            className="cardStyle"
                            note={item.pointValue + '颗星'}
                            title={item.courseName}
                            extra={item.from.name + '(' + item.from.phone + ')'}
                        >{item.idea}</AtCard>
                    )
                })
                :<Text>暂无收到反馈信息</Text>
            }
      </View>
    )
  }
}
