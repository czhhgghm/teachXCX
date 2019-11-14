import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import { AtIcon, AtButton, AtGrid } from 'taro-ui'
import personPng from '../../assets/images/personal.png'


@connect(({ common }) => ({
  userName: common.userName,
  grade: common.grade,
  avatarUrl: common.avatarUrl,
  iv: common.iv,
  encryptedData: common.encryptedData,
}))

export default class Index extends Component {
  constructor() {
    this.state = {
      identityId: 0,
    }
  }

  config = {
    navigationBarTitleText: '行之'
  }

  async componentWillMount () {
  }

  async componentDidMount () {
    const {dispatch,avatarUrl,encryptedData,iv} = this.props
    wx.checkSession({
      success () {
        //session_key 未过期，并且在本生命周期一直有效
        
      },
      fail () {
        // 没有登录过,或者 session_key 已经失效，需要重新执行登录流程
        wx.login({
          success: res => {
            //用得到的code,换取服务端rdSessionId,保存到Storage里面了
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

    //获取用户授权情况
    await wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo'] && encryptedData!=='') {
          Taro.getUserInfo({
            success: function(res) {
              //取出storage的sessionKey,带上其他两个条件去换取电话
              Taro.getStorage({ key: 'sessionKey' })
                .then(storage => (
                  dispatch({
                    type:'common/getPhone',
                    payload:{
                      sessionKey: storage.data,
                      encryptedData: encryptedData,
                      iv:iv
                    }
                  })
                ))
              //解决因为缓存,导致用户姓名和头像加载不出来的问题
              if(avatarUrl == '') {
                dispatch({
                  type:'common/saveUserInfo',
                  payload:{
                    userName: res.userInfo.nickName,
                    avatarUrl: res.userInfo.avatarUrl
                  }
                })
              }
            }
          })
        }else {
          Taro.reLaunch({
            url: '../../pages/authorize/index',
          })
        }
      }
    })
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
    this.setState({
      identityId: 0,
    })
  }

  changeSF1() {
    this.setState({
      identityId: 1,
    })
  }

  changeSF2() {
    this.setState({
      identityId: 2,
    })
  }

  changeSF3() {
    Taro.navigateTo({
      url: '/pages/signUp/index'
    })
  }

  render () {
    const {identityId} = this.state
    const {userName,grade,avatarUrl} = this.props
    return (
      <View>
        {
          identityId == 1 ? 
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
                    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                    value: '我的课表',
                    url: '/pages/schedule/index'
                  },
                  {
                    image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                    value: '个人档案',
                    url: '/pages/personalProfile/index'
                  },
                  {
                    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                    value: '推荐新用户',
                    url: '/pages/signUp/index'
                  },
                  {
                    image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                    value: '提供建议',
                    url: '/pages/advice/index'
                  },
                  {
                    image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                    value: '更多功能',
                    url: ''
                  },
                  {
                    image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
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
                    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                    value: '我的课表',
                    url: '/pages/schedule/index'
                  },
                  {
                    image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                    value: '辅导方案',
                    url: '/pages/coachingProgram/index'
                  },
                  {
                    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                    value: '推荐新用户',
                    url: '/pages/signUp/index'
                  },
                  {
                    image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                    value: '提供建议',
                    url: '/pages/advice/index'
                  },
                  {
                    image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                    value: '更多功能',
                    url: ''
                  },
                  {
                    image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                    value: '更多功能',
                    url: ''
                  }
                ]
              } />
            </View>
          </View>
          : identityId == 0 ? 
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
                    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                    value: '用户管理',
                    url: '/pages/usersManage/index'
                  },
                  {
                    image: 'https://img11.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                    value: '新用户信息',
                    url: '/pages/viewNewUsers/index'
                  },
                  {
                    image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                    value: '师生课堂反馈',
                    url: '/pages/showClassFB/index'
                  },
                  {
                    image: 'https://img13.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                    value: '用户建议',
                    url: '/pages/showAdvice/index'
                  },
                  {
                    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                    value: '审批方案',
                    url: '/pages/reviewProgram/index'
                  },
                  {
                    image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                    value: '更多功能',
                    url: ''
                  }
                ]
              } />
            </View>
          </View>
          :
          ''
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
