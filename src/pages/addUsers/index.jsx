import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtInput, AtRadio, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ common }) => ({
  ...common
}))

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state={
      optionValue: '',

      perName: '',
      perPhone: '',

      studentName: '',
      studentPhone: '',
      beginDate: '',
      endDate: '',
      classPlace: '',

      parentName: '',
      parentPhone: '',
    }
  };

  config = {
    navigationBarTitleText: '添加用户'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  changeStudentName = value => {
    this.setState({
      studentName: value
    })
  }

  changeStudentPhone = value => {
    this.setState({
      studentPhone: value
    })
  }

  changeBeginDate = value => {
    this.setState({
      beginDate: value
    })
  }

  changeEndDate = value => {
    this.setState({
      endDate: value
    })
  }

  changeClassPlace = value => {
    this.setState({
      classPlace: value
    })
  }
  changeParentName = value => {
    this.setState({
      parentName: value
    })
  }

  changeParentPhone = value => {
    this.setState({
      parentPhone: value
    })
  }

  changePerName = value => {
    this.setState({
      perName: value
    })
  }

  changePerPhone = value => {
    this.setState({
      perPhone: value
    })
  }

  handleChangeOption = value => {
    this.setState({
      optionValue: value
    })
  }

  addNumbers() {
    const {dispatch} = this.props
    const {optionValue,beginDate,endDate,studentName,studentPhone,classPlace,parentName,parentPhone,perName,perPhone} = this.state
    let phoneReg = /^(13[0-9]{9})|(15[0-9][0-9]{8})|(18[0-9][0-9]{8})$/
    if(optionValue == 'student') {
      phoneReg.test(studentPhone)?(
        dispatch({
          type:'addUsers/addStudent',
          payload:{
            beginDate,
            endDate,
            name: studentName,
            phone: studentPhone,
            place: classPlace
          }
        })
      )
      :Taro.showToast({
        title: '输入手机号码格式不正确',
        icon: 'none'
      })
    }
    else if(optionValue == 'parent') {
      phoneReg.test(parentPhone)?(
        phoneReg.test(studentPhone)?(
          dispatch({
            type:'addUsers/addFamily',
            payload:{
              childName: studentName,
              childPhone: studentPhone,
              name: parentName,
              phone: parentPhone
            }
          })
        )
        :Taro.showToast({
          title: '学生手机号码格式不正确',
          icon: 'none'
        })
      )
      :Taro.showToast({
        title: '家长手机号码格式不正确',
        icon: 'none'
      })
      
    }
    else if(optionValue == 'teacher') {
      phoneReg.test(perPhone)?(
        dispatch({
          type:'addUsers/addTeacher',
          payload:{
            name: perName,
            phone: perPhone,
          }
        })
      )
      :Taro.showToast({
        title: '输入手机号码格式不正确',
        icon: 'none'
      })
    }
    // Taro.showToast({
    //   title: '添加成功'
    // },wx.reLaunch({
    //     url: '../../pages/index/index',
    //   })
    // )
  }

  render () {
    const {optionValue} = this.state
    return (
      <View className='index'>
        <View className='formStyle'>
          <View className='formTitle'>填写用户信息</View>
          <AtRadio
            options={[
              { label: '学生', value: 'student'},
              { label: '家长', value: 'parent'},
              { label: '老师', value: 'teacher'},
              { label: '管理员', value: 'manager'}
            ]}
            value={optionValue}
            onClick={this.handleChangeOption.bind(this)}
          />
          {
            optionValue == 'manager'?
            <View>
              <AtInput
                name='value'
                title='姓名'
                maxLength='10'
                type='text'
                placeholder='请输入新管理员姓名'
                value={this.state.perName}
                onChange={this.changePerName.bind(this)}
              />
              <AtInput
                name='value'
                title='手机号码'
                type='text'
                maxLength='11'
                placeholder='请输入手机号码'
                value={this.state.perPhone}
                onChange={this.changePerPhone.bind(this)}
              />
              <AtButton type='primary' onClick={this.addNumbers.bind(this)}>确认添加</AtButton>
            </View>
            :optionValue == 'student'?
            <View>
              <AtInput
                name='value'
                title='姓名'
                maxLength='10'
                type='text'
                placeholder='请输入学生姓名'
                value={this.state.studentName}
                onChange={this.changeStudentName.bind(this)}
              />
              <AtInput
                name='value'
                title='手机号码'
                type='text'
                placeholder='请输入学生手机号码'
                maxLength='11'
                value={this.state.studentPhone}
                onChange={this.changeStudentPhone.bind(this)}
              />
              <AtInput
                name='value'
                title='开始上课时间'
                maxLength='10'
                type='text'
                placeholder='示例:2019-01-01'
                value={this.state.beginDate}
                onChange={this.changeBeginDate.bind(this)}
              />
              <AtInput
                name='value'
                title='结束上课时间'
                maxLength='10'
                type='text'
                placeholder='示例:2019-01-01'
                value={this.state.endDate}
                onChange={this.changeEndDate.bind(this)}
              />
              <AtInput
                name='value'
                title='上课地区'
                maxLength='6'
                type='text'
                placeholder='请输入上课地区'
                value={this.state.classPlace}
                onChange={this.changeClassPlace.bind(this)}
              />
              <AtButton type='primary' onClick={this.addNumbers.bind(this)}>确认添加</AtButton>
            </View>
            :optionValue == 'parent'?
            <View>
              <AtInput
                name='value'
                title='家长姓名'
                maxLength='10'
                type='text'
                placeholder='请输入家长姓名'
                value={this.state.parentName}
                onChange={this.changeParentName.bind(this)}
              />
              <AtInput
                name='value'
                title='手机号码'
                type='text'
                placeholder='请输入手机号码'
                maxLength='11'
                value={this.state.parentPhone}
                onChange={this.changeParentPhone.bind(this)}
              />
              <AtInput
                name='value'
                title='孩子姓名'
                maxLength='10'
                type='text'
                placeholder='请输入孩子姓名'
                value={this.state.studentName}
                onChange={this.changeStudentName.bind(this)}
              />
              <AtInput
                name='value'
                title='孩子手机号码'
                type='text'
                maxLength='11'
                placeholder='请输入孩子手机号码'
                value={this.state.studentPhone}
                onChange={this.changeStudentPhone.bind(this)}
              />
              <AtButton type='primary' onClick={this.addNumbers.bind(this)}>确认添加</AtButton>
            </View>
            :optionValue == 'teacher'?
            <View>
              <AtInput
                name='value'
                title='姓名'
                maxLength='10'
                type='text'
                placeholder='请输入新老师的姓名'
                value={this.state.perName}
                onChange={this.changePerName.bind(this)}
              />
              <AtInput
                name='value'
                title='手机号码'
                maxLength='11'
                type='text'
                placeholder='请输入手机号码'
                value={this.state.perPhone}
                onChange={this.changePerPhone.bind(this)}
              />
              <AtButton type='primary' onClick={this.addNumbers.bind(this)}>确认添加</AtButton>
            </View>
            :''
          }
        </View>
      </View>
    )
  }
}
