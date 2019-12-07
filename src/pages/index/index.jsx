import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import { AtIcon, AtButton, AtGrid } from 'taro-ui'
import personPng from '../../assets/images/person.png'
import schedulePng from '../../assets/images/schedule.png'
import archivesPng from '../../assets/images/archives.png'
import userManagementPng from '../../assets/images/userManagement.png'
import addUserPng from '../../assets/images/addUser.png'
import advicePng from '../../assets/images/advice.png'
import morePng from '../../assets/images/more.png'
import tutoringPng from '../../assets/images/tutoring.png'
import checkPng from '../../assets/images/check.png'
import checkClassPng from '../../assets/images/checkClass.png'
import userInformationPng from '../../assets/images/userInformation.png'


@connect(({ common }) => ({
  authen: common.authen,
  grade: common.grade,
  netName: common.netName,
  avatarUrl: common.avatarUrl,
  loginCode: common.loginCode,
}))

export default class Index extends Component {
  constructor() {
    this.state = {

    }
  }

  config = {
    navigationBarTitleText: '行之'
  }

  async componentWillMount () {
    
  }

  async componentDidMount () {
    const { loginCode } = this.props

    if(loginCode == -1) {
      // 没有登录过的,跳登录页面
      Taro.reLaunch({
        url: '../../pages/authorize/index',
      })
      
    }
    else {
      //登录成功,可以发送各种请求
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  navigateToPage = url => {
    if(url) {
      Taro.navigateTo({
        url,
      })
    }
    else {
      Taro.showToast({
        title: '敬请期待',
        icon: 'none'
      })
    }
  }

  jumpPages = e => {
    this.navigateToPage(e.url)
  }

  changeSF0() {
    const {dispatch} = this.props
    dispatch({
      type:'common/changeAuthen',
      payload:{
        authen: '管理员',
      }
    })
  }

  changeSF1() {
    const {dispatch} = this.props
    dispatch({
      type:'common/changeAuthen',
      payload:{
        authen: '学生',
      }
    })
  }

  changeSF2() {
    const {dispatch} = this.props
    dispatch({
      type:'common/changeAuthen',
      payload:{
        authen: '老师',
      }
    })
  }

  changeSF3() {
    Taro.navigateTo({
      url: '/pages/signUp/index'
    })
  }

  render () {
    const {authen,grade,netName,avatarUrl} = this.props
    return (
      <View>
        {
          authen == '管理员' ? 
          <View className='index'>
            <View className='header-outer'>
              <View className='at-row at-row__align--center header'>
                <View className='at-col at-col-2'>
                  <Image className='header-Img' src={avatarUrl?avatarUrl:personPng} />
                </View>
                <View className='at-col at-col-7 header-middle'>
                  <View className='header-name'>{netName}</View>
                  <View>
                    <AtIcon value='shuffle-play' size='15' color='#ccc'></AtIcon>
                    <View className='afterIcon-font'>{grade}</View>
                  </View>
                </View>
                <View className='at-col at-col-3'>
                  <AtButton 
                    size='normal' 
                    className='editBtn'
                    onClick={this.navigateToPage.bind(
                      this,
                      '/pages/showPerson/index'
                    )}
                  >
                    <View className='beforeIcon-font'>个人信息</View>
                    <AtIcon value='chevron-right' size='15' color='#ccc'></AtIcon>
                  </AtButton>
                </View>
              </View>
            </View>
            <View className='service-outer'>
              <View className='title'>服务档案</View>
              <AtGrid 
                className='main'
                onClick={this.jumpPages}
                hasBorder={false}
                data={
                [
                  {
                    image: `${userManagementPng}`,
                    value: '用户管理',
                    url: '/pages/usersManage/index'
                  },
                  {
                    image: `${userInformationPng}`,
                    value: '新用户信息',
                    url: '/pages/viewNewUsers/index'
                  },
                  {
                    image: `${checkClassPng}`,
                    value: '师生课堂反馈',
                    url: '/pages/showClassFB/index'
                  },
                  {
                    image: `${advicePng}`,
                    value: '用户建议',
                    url: '/pages/showAdvice/index'
                  },
                  {
                    image: `${checkPng}`,
                    value: '审批方案',
                    url: '/pages/reviewProgram/index'
                  },
                  {
                    image: `${morePng}`,
                    value: '更多功能',
                    url: ''
                  }
                ]
              } />
            </View>
          </View>
          : authen == '老师' ? 
          <View className='index'>
            <View className='header-outer'>
              <View className='at-row at-row__align--center header'>
                <View className='at-col at-col-2'>
                  <Image className='header-Img' src={avatarUrl?avatarUrl:personPng} />
                </View>
                <View className='at-col at-col-7 header-middle'>
                  <View className='header-name'>{netName}</View>
                  <View>
                    <AtIcon value='shuffle-play' size='15' color='#ccc'></AtIcon>
                    <View className='afterIcon-font'>{grade}</View>
                  </View>
                </View>
                <View className='at-col at-col-3'>
                  <AtButton 
                    size='normal' 
                    className='editBtn'
                    onClick={this.navigateToPage.bind(
                      this,
                      '/pages/showPerson/index'
                    )}
                  >
                    <View className='beforeIcon-font'>个人信息</View>
                    <AtIcon value='chevron-right' size='15' color='#ccc'></AtIcon>
                  </AtButton>
                </View>
              </View>
            </View>
            <View className='service-outer'>
              <View className='title'>服务档案</View>
              <AtGrid 
                className='main'
                onClick={this.jumpPages}
                hasBorder={false}
                data={
                [
                  {
                    image: `${schedulePng}`,
                    value: '我的课表',
                    url: `/pages/schedule/index?key=${authen}`
                  },
                  {
                    image: `${tutoringPng}`,
                    value: '辅导方案',
                    url: '/pages/coachingProgram/index'
                  },
                  {
                    image: `${addUserPng}`,
                    value: '推荐新用户',
                    url: '/pages/signUp/index'
                  },
                  {
                    image: `${advicePng}`,
                    value: '提供建议',
                    url: '/pages/advice/index'
                  },
                  {
                    image: `${morePng}`,
                    value: '更多功能',
                    url: ''
                  },
                  {
                    image: `${morePng}`,
                    value: '更多功能',
                    url: ''
                  }
                ]
              } />
            </View>
          </View>
          :
          <View className='index'>
            <View className='header-outer'>
              <View className='at-row at-row__align--center header'>
                <View className='at-col at-col-2'>
                  <Image className='header-Img' src={avatarUrl?avatarUrl:personPng} />
                </View>
                <View className='at-col at-col-7 header-middle'>
                  <View className='header-name'>{netName}</View>
                  <View>
                    <AtIcon value='shuffle-play' size='15' color='#ccc'></AtIcon>
                    <View className='afterIcon-font'>{grade}</View>
                  </View>
                </View>
                <View className='at-col at-col-3'>
                  <AtButton 
                    size='normal' 
                    className='editBtn'
                    onClick={this.navigateToPage.bind(
                      this,
                      '/pages/showPerson/index'
                    )}
                  >
                    <View className='beforeIcon-font'>个人信息</View>
                    <AtIcon value='chevron-right' size='15' color='#ccc'></AtIcon>
                  </AtButton>
                </View>
              </View>
            </View>
            <View className='service-outer'>
              <View className='title'>服务档案</View>
              <AtGrid 
                className='main'
                onClick={this.jumpPages}
                hasBorder={false}
                data={
                [
                  {
                    image: `${schedulePng}`,
                    value: '我的课表',
                    url: `/pages/schedule/index?key=${authen}`                    
                  },
                  {
                    image: `${archivesPng}`,
                    value: '个人档案',
                    url: '/pages/personalProfile/index'
                  },
                  {
                    image: `${addUserPng}`,
                    value: '推荐新用户',
                    url: '/pages/signUp/index'
                  },
                  {
                    image: `${advicePng}`,
                    value: '提供建议',
                    url: '/pages/advice/index'
                  },
                  {
                    image: `${morePng}`,
                    value: '更多功能',
                    url: ''
                  },
                  {
                    image: `${morePng}`,
                    value: '更多功能',
                    url: ''
                  }
                ]
              } />
            </View>
          </View>
        }
        {/* 用于测试 */}
        <View style={{padding:'20px'}}>
          <AtButton type='secondary' size='normal' onClick={this.changeSF0.bind(this)}>管理员模式</AtButton>
          <AtButton type='secondary' size='normal' onClick={this.changeSF1.bind(this)}>学生/家长模式</AtButton>
          <AtButton type='secondary' size='normal' onClick={this.changeSF2.bind(this)}>老师模式</AtButton>
          <AtButton type='secondary' size='normal' onClick={this.changeSF3.bind(this)}>游客模式</AtButton>
        </View>
      </View>
    )
  }
}
