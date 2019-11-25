import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import { AtIcon, AtButton, AtGrid } from 'taro-ui'
import personPng from '../../assets/images/personal.png'
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
  identityId: common.identityId,
  grade: common.grade,
  userName: common.userName,
  avatarUrl: common.avatarUrl
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
    const { dispatch } = this.props
    const phone = wx.getStorageSync('phone')
    
    //检查是否登录过???
    wx.checkSession({
      success () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail () {
        // 没有登录过,或者 session_key 已经失效，需要重新执行登录流程
        wx.login({
          success: res => {
            dispatch({
              type: 'common/getSessionId',
              payload: {
                code: res.code
              }
            })
          }
        })
      }
    })

    if(phone) {
      const userName = wx.getStorageSync('userName')
      const avatarUrl = wx.getStorageSync('avatarUrl')
      const openid = wx.getStorageSync('openid')
      dispatch({
        type:'common/saveUserInfo',
        payload:{
          userName,
          avatarUrl
        }
      })
      dispatch({
        type:'common/loginWithOpenid',
        payload:{
          openid,
          phone
        }
      })
    }
    //没有登录过的,跳登录页面
    else {
      Taro.reLaunch({
        url: '../../pages/authorize/index',
      })
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
      type:'common/changeIdentityId',
      payload:{
        identityId: 0,
      }
    })
  }

  changeSF1() {
    const {dispatch} = this.props
    dispatch({
      type:'common/changeIdentityId',
      payload:{
        identityId: 1,
      }
    })
  }

  changeSF2() {
    const {dispatch} = this.props
    dispatch({
      type:'common/changeIdentityId',
      payload:{
        identityId: 2,
      }
    })
  }

  changeSF3() {
    Taro.navigateTo({
      url: '/pages/signUp/index'
    })
  }

  render () {
    const {identityId,grade,userName,avatarUrl} = this.props
    return (
      <View>
        {
          identityId == 0 ? 
          <View className='index'>
            <View className='header-outer'>
              <View className='at-row at-row__align--center header'>
                <View className='at-col at-col-2'>
                  <Image className='header-Img' src={avatarUrl?avatarUrl:personPng} />
                </View>
                <View className='at-col at-col-7 header-middle'>
                  <View className='header-name'>{userName}</View>
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
          :identityId == 1 ? 
          <View className='index'>
            <View className='header-outer'>
              <View className='at-row at-row__align--center header'>
                <View className='at-col at-col-2'>
                  <Image className='header-Img' src={avatarUrl?avatarUrl:personPng} />
                </View>
                <View className='at-col at-col-7 header-middle'>
                  <View className='header-name'>{userName}</View>
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
                    url: '/pages/schedule/index'
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
          : identityId == 2 ? 
          <View className='index'>
            <View className='header-outer'>
              <View className='at-row at-row__align--center header'>
                <View className='at-col at-col-2'>
                  <Image className='header-Img' src={avatarUrl?avatarUrl:personPng} />
                </View>
                <View className='at-col at-col-7 header-middle'>
                  <View className='header-name'>{userName}</View>
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
                    url: '/pages/schedule/index'
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
          :''
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
