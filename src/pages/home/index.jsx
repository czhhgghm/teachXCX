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
  personName: common.personName,
  avatarUrl: common.avatarUrl,
  loginCode: common.loginCode
}))

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  config = {
    navigationBarTitleText: '行之'
  }

  async componentWillMount () {
    this.checkLogin()
  }

  async checkLogin() {
    await this.checkStorage()
    const { loginCode } = this.props
    if(loginCode == -1) {
      //loginCode默认值为-1,表示身份信息不明,此时重定向到登录页面
      Taro.reLaunch({
        url: '../authorize/index'
      })
    }
    else if(loginCode == 11) {
      //loginCode值为11,表示该用户还未经过注册,判断为游客,此时重定向到推荐新用户页面
      Taro.reLaunch({
        url: '../signUp/index'
      })
    }
  }

  checkStorage() {
    //检查是否有缓存登陆信息
    let loginCode = wx.getStorageSync('code')
    if(loginCode) {
      //10为正常登陆 11为游客状态登陆
      const { dispatch } = this.props
      dispatch({
        type: 'common/saveLoginCode',
        payload: {
          loginCode: loginCode
        }
      })
      if(loginCode == 10) {
        const avatarUrl = wx.getStorageSync('avatarUrl')
        const userId = wx.getStorageSync('userId')
        const authen = wx.getStorageSync('authen')
        const name = wx.getStorageSync('name')
        const id = wx.getStorageSync('id')
        dispatch({
          type: 'common/savePersonDetails',
          payload: {
            userId: userId,
            authen: authen,
            personName: name,
            id: id
          }
        })
        dispatch({
          type:'common/saveUserInfo',
          payload:{
            avatarUrl: avatarUrl
          }
        })
      }
    }
  }

  navigateToPage = url => {
    if(url) {
      Taro.navigateTo({
        url
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

  render () {
    const { authen, personName, avatarUrl } = this.props
    const columnNum = 2
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
                  <View className='header-name'>{personName}</View>
                  <View>
                    <AtIcon value='shuffle-play' size='15' color='#ccc'></AtIcon>
                    <View className='afterIcon-font'>{authen}</View>
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
                columnNum={columnNum}
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
                    url: '/pages/showCourseFB/index'
                  },
                  {
                    image: `${advicePng}`,
                    value: '查看意见',
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
                  <View className='header-name'>{personName}</View>
                  <View>
                    <AtIcon value='shuffle-play' size='15' color='#ccc'></AtIcon>
                    <View className='afterIcon-font'>{authen}</View>
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
                columnNum={columnNum}
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
                    value: '意见反馈',
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
                  <View className='header-name'>{personName}</View>
                  <View>
                    <AtIcon value='shuffle-play' size='15' color='#ccc'></AtIcon>
                    <View className='afterIcon-font'>{authen}</View>
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
                columnNum={columnNum}
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
                    value: '意见反馈',
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
      </View>
    )
  }
}
