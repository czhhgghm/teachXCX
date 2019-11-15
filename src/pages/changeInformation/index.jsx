import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import { AtInput, AtForm, AtButton } from 'taro-ui'

@connect(({ common }) => ({
  perPhone: common.perPhone,
  parentPhone: common.parentPhone,
  classTime: common.classTime,
  classPlace: common.classPlace,
}))

export default class ChangeInformation extends Component {
  constructor(props) {
    super(props)
    this.state={
      key: '',
      value: '',
      type: 'text',
      maxLength: '6',
      select: ''
    }
  };

  config = {
    navigationBarTitleText: '修改个人信息'
  }

  componentWillMount () {
    
  }

  componentDidMount () {
    const {params} = this.$router
    const {perPhone,parentPhone,classTime,classPlace} = this.props
    let key = 
      params.key == 'perPhone'? '学生电话'
      :params.key == 'parentPhone'? '家长电话'
      :params.key == 'classTime'? '上课时段'
      :params.key == 'classPlace'? '上课地区'
      : ''
    let value = 
      params.key == 'perPhone'? perPhone
      :params.key == 'parentPhone'? parentPhone
      :params.key == 'classTime'? classTime
      :params.key == 'classPlace'? classPlace
      :''
    let type = 
      params.key == 'perPhone'? 'phone'
      :params.key == 'parentPhone'? 'phone'
      :params.key == 'classTime'? 'text'
      :params.key == 'classPlace'? 'text'
      : ''
    let maxLength = 
      params.key == 'perPhone'? '11'
      :params.key == 'parentPhone'? '11'
      :params.key == 'classTime'? '9'
      :params.key == 'classPlace'? '6'
      : ''

    this.setState({
      value,
      key,
      type,
      maxLength,
      select: params.key  //保存标识
    })

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  submitHandle () {
    //点击提交按钮,把key和最新值发送给后台,同时在前端进行相应
    //此时还没后台,直接在前端响应
    const {select,value} = this.state
    const {dispatch} = this.props
    let phoneReg = /^(13[0-9]{9})|(15[0-9][0-9]{8})|(18[0-9][0-9]{8})$/

    select == 'perPhone'?(
      phoneReg.test(value)?(
        dispatch({
          type: 'common/changePerPhone',
          payload: {
            perPhone: value
          }
        },this.jumpTab())
      ):
      Taro.showToast({
        title: '输入手机号码格式不正确',
        icon: 'none'
      })
    )
    :select == 'parentPhone'?(
      phoneReg.test(value)?(
        dispatch({
          type: 'common/changeParentPhone',
          payload: {
            parentPhone: value
          }
        },this.jumpTab())
      ):
      Taro.showToast({
        title: '输入手机号码格式不正确',
        icon: 'none'
      })
    )
    :select == 'classTime'?
    dispatch({
      type: 'common/changeClassTime',
      payload: {
        classTime: value
      }
    },this.jumpTab())
    :select == 'classPlace'?
    dispatch({
      type: 'common/changeClassPlace',
      payload: {
        classPlace: value
      }
    },this.jumpTab()):''
  }

  handleChange = e => {
    this.setState({
      value: e
    })
  }

  jumpTab() {
    Taro.showToast({
      title: '保存成功'
    },wx.reLaunch({
        url: '../../pages/index/index',
      })
    )
  }
  render () {
    const {key,value,type,maxLength} = this.state
    return (
      <View className='index'>
        <AtForm
            onSubmit={this.submitHandle.bind(this)}
        >
          <AtInput
            name='value'
            title={key}
            type={type}
            placeholder='更改个人信息'
            value={value}
            maxLength={maxLength}
            onChange={this.handleChange.bind(this)}
          />
          <AtButton type='secondary' className='btn' formType='submit'>保存</AtButton>
        </AtForm>
      </View>
    )
  }
}
