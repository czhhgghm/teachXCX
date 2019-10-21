import { View, Button, Image } from "@tarojs/components"
import Taro, { Component } from '@tarojs/taro'
import nullJPG from '../../assets/images/null.jpg'
import "./index.scss"
import { connect } from '@tarojs/redux'

@connect(({ common }) => ({
  ...common
}))


export default class Authorize extends Component {
  config = {
    navigationBarTitleText: "授权登录"
  };
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    
  };

  getUserInfo = (e) => {
    const { dispatch }=this.props
    if(e.detail.userInfo) {
      Taro.getUserInfo().then(res=>{
        //同时把 res.userInfo 保存到model中备用
        console.log('授权后得到的用户信息:',res.userInfo)
        dispatch({
          type:'common/saveUserInfo',
          payload:{
            userName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          }
        })
        //重定向到首页
        Taro.reLaunch({
          url: '../../pages/index/index',
        })
        //要把 res.userInfo 和 openid appid unionid同时保存到 Taro.setStorage中
        
      })
    }else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '您拒绝了授权，将无法使用小程序，请授权后进入',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          console.log('点击返回授权时打印',res)
          if (res.confirm) {
          }
        }
      })
    }
    // if (e.detail.userInfo) {
    //   //用户按了允许授权按钮,则获取用户信息
    //   Taro.getUserInfo().then(res=>{
    //     // 缓存用户信息
    //     if(res){
    //       wx.cloud.callFunction({
    //         // 要调用的云函数名称
    //         name: 'login',
    //         // 传递给云函数的event参数
    //         data: res.userInfo
    //       }).then(res_login => {
    //         // output: res.result === 3
    //         const { openid,appid,unionid }=res_login.result
    //         const userInfo={ ...res.userInfo,openid,appid,unionid }
    //         try {
    //           Taro.setStorage({
    //             key: 'userInfo',
    //             data:userInfo
    //           }).then(()=>{
    //             dispatch({
    //               type:'authorize/saveUserInfo',
    //               payload:{
    //                 userInfo:res.userInfo
    //               }
    //             })
    //           })
    //         } catch (err) { console.log(err) }

    //       }).catch(err_login => {
    //         // handle error
    //         console.log(err_login)
    //       })
    //       // Taro.setStorage({
    //       //   key: 'appInfo',
    //       //   data: res
    //       // }).then(()=>{
    //       //   dispatch({
    //       //     type:'authorize/saveAppInfo',
    //       //     payload:{
    //       //       appInfo:res
    //       //     }
    //       //   });
    //       // })
    //     }
    //   }).then(()=>{
    //     //跳转到首页
    //     Taro.switchTab({
    //       url:'/pages/home/index'
    //     })
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // } else {
    //   //用户按了拒绝按钮
    //   wx.showModal({
    //     title: '提示',
    //     content: '您拒绝了授权，将无法使用小程序，请授权后进入',
    //     showCancel: false,
    //     confirmText: '返回授权',
    //     success: function(res) {
    //       if (res.confirm) {
    //       }
    //     }
    //   })
    // }
  };

  render() {
    return (
      <View>
        <Image src={nullJPG} mode='scaleToFill' className="lineCenter"></Image>
        <View className='authorize_info'>
          <View className='authorize_title'>
            小程序申请获取一下权限
          </View>
          <Text className='authorize_description'>
            获得你的公开信息（昵称、头像、地区等）
          </Text>
          <View className='btn_authorize_wrap'>
            <Button className='btn_authorize' openType='getUserInfo' onGetUserInfo={this.getUserInfo} type='primary' lang='zh_CN'>
              授权登录
            </Button>
          </View>
        </View>
        
      </View>
    )
  }
}
