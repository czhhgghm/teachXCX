import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import { AtInput, AtForm, AtButton } from 'taro-ui'

@connect(({ common }) => ({
  userName: common.userName,
  perPhone: common.perPhone,
  parentPhone: common.parentPhone,
  coachingCourse: common.coachingCourse,
  beginProject: common.beginProject,
  classTime: common.classTime,
  classPlace: common.classPlace,
  studySituation: common.studySituation,
}))

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state={
      key: '',
      value: ''
    }
  };

  config = {
    navigationBarTitleText: '修改个人信息'
  }

  componentWillMount () {
    
  }

  componentDidMount () {
    const {params} = this.$router
    const {userName,perPhone,parentPhone,coachingCourse,classTime,beginProject,classPlace,studySituation} = this.props
    let value = 
      params.key == 'userName'? userName
      :params.key == 'perPhone'? perPhone
      :params.key == 'parentPhone'? parentPhone
      :params.key == 'coachingCourse'? coachingCourse
      :params.key == 'classTime'? classTime
      :params.key == 'beginProject'? beginProject
      :params.key == 'classPlace'? classPlace
      :params.key == 'studySituation'? studySituation
      :''
    let key = 
      params.key == 'userName'? '姓名'
      :params.key == 'perPhone'? '学生电话'
      :params.key == 'parentPhone'? '家长电话'
      :params.key == 'coachingCourse'? '辅导学科'
      :params.key == 'beginProject'? '开始上课时间'
      :params.key == 'classTime'? '上课时段'
      :params.key == 'classPlace'? '上课地区'
      :params.key == 'studySituation'? '学科学习情况'
      : ''
    this.setState({
      value,
      key
    })

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  submitHandle () {
    //点击提交按钮,把key和最新值发送给后台,同时在前端进行相应
    //此时还没后台,直接在前端响应

    const {params} = this.$router
    const {dispatch} = this.props    
    params.key == 'userName'? 
    dispatch({
      type: 'common/changeUserName',
      payload: {
        userName: this.state.value
      }
    })
    :params.key == 'perPhone'?
    dispatch({
      type: 'common/changePerPhone',
      payload: {
        perPhone: this.state.value
      }
    })
    :params.key == 'parentPhone'?
    dispatch({
      type: 'common/changeParentPhone',
      payload: {
        parentPhone: this.state.value
      }
    })
    :params.key == 'coachingCourse'?
    dispatch({
      type: 'common/changeCoachingCourse',
      payload: {
        coachingCourse: this.state.value
      }
    })
    :params.key == 'beginProject'?
    dispatch({
      type: 'common/changeBeginProject',
      payload: {
        beginProject: this.state.value
      }
    })
    :params.key == 'classTime'?
    dispatch({
      type: 'common/changeClassTime',
      payload: {
        classTime: this.state.value
      }
    })
    :params.key == 'classPlace'?
    dispatch({
      type: 'common/changeClassPlace',
      payload: {
        classPlace: this.state.value
      }
    })
    :params.key == 'studySituation'?
    dispatch({
      type: 'common/changeStudySituation',
      payload: {
        studySituation: this.state.value
      }
    })
    : ''

  
    Taro.showToast({
      title: '保存成功'
    },wx.reLaunch({
        url: '../../pages/index/index',
      })
    )
  }
  handleChange = e => {
    this.setState({
      value: e
    })
  }
  render () {
    const {key,value} = this.state
    return (
      <View className='index'>
        <AtForm
            onSubmit={this.submitHandle.bind(this)}
        >
          <AtInput
            name='value'
            title={key}
            type='text'
            placeholder='更改个人信息'
            value={value}
            onChange={this.handleChange.bind(this)}
          />
          <AtButton type='secondary' className='btn' formType='submit'>保存</AtButton>
        </AtForm>
      </View>
    )
  }
}
