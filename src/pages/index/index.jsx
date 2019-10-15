import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import { AtIcon, AtButton, AtGrid } from 'taro-ui'
import personPng from '../../assets/images/personal.png'

export default class Index extends Component {
  constructor() {
    this.state = {
      userName: '马天骅',
      grade: '高三',
      identityId: 1,
    }
  }

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () {
    const accountInfo = accountInfo ? accountInfo:wx.getAccountInfoSync();
    console.log('appId:',accountInfo.miniProgram.appId) // 小程序 appId
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  navigateToPage = url => {
    Taro.navigateTo({
      url,
    })
  }

  jumpPages = e => {
    this.navigateToPage(e.url)
  }

  render () {
    const {userName,grade,identityId} = this.state;
    return (
      //学生和家长
      identityId == 1 ? 
      <View className='index'>
        <View className='header-outer'>
          <View className='at-row at-row__align--center header'>
            <View className='at-col at-col-2'>
              <Image className='header-Img' src={personPng} />
            </View>
            <View className='at-col at-col-7 header-middle'>
              <View>{userName}</View>
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
                value: '课程表',
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
                value: '待完善功能',
                url: '/pages/schedule/index'
              },
              {
                image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                value: '待完善功能',
                url: '/pages/schedule/index'
              }
            ]
          } />
        </View>
      </View>
      //老师
      : identityId == 2? 
      <View className='index'>
        <View className='header-outer'>
          <View className='at-row at-row__align--center header'>
            <View className='at-col at-col-2'>
              <Image className='header-Img' src={personPng} />
            </View>
            <View className='at-col at-col-7 header-middle'>
              <View>{userName}</View>
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
                value: '课程表',
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
                value: '待完善功能',
                url: '/pages/schedule/index'
              },
              {
                image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                value: '待完善功能',
                url: '/pages/schedule/index'
              }
            ]
          } />
        </View>
      </View>
      //管理员
      : identityId == 0? 
      <View className='index'>
        <View className='header-outer'>
          <View className='at-row at-row__align--center header'>
            <View className='at-col at-col-2'>
              <Image className='header-Img' src={personPng} />
            </View>
            <View className='at-col at-col-7 header-middle'>
              <View>{userName}</View>
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
                value: '审批方案',
                url: '/pages/reviewProgram/index'
              },
              {
                image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                value: '查看反馈',
                url: '/pages/showClassFB/index'
              },
              {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                value: '用户管理',
                url: '/pages/usersManage/index'
              }
            ]
          } />
        </View>
      </View>
      :
      //游客
      <View>游客请登录</View>
    )
  }
}
