import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import { AtIcon, AtButton, AtGrid } from 'taro-ui'
import personPng from '../../assets/images/personal.png'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

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
    return (
      <View className='index'>
        <View className='header-outer'>
          <View className='at-row at-row__align--center header'>
            <View className='at-col at-col-2'>
              <Image className='header-Img' src={personPng} />
            </View>
            <View className='at-col at-col-7 header-middle'>
              <View>张学友</View>
              <View>
                <AtIcon value='shuffle-play' size='15' color='#ccc'></AtIcon>
                <View className='afterIcon-font'>高三</View>
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
                value: '更多功能',
                url: '/pages/schedule/index'
              },
              {
                image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                value: '更多功能',
                url: '/pages/schedule/index'
              }
            ]
          } />
        </View>
      </View>
    )
  }
}
