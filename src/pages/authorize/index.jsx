import { View, Button, Image } from "@tarojs/components"
import Taro, { Component } from '@tarojs/taro'
import nullJPG from '../../assets/images/null.jpg'
import "./index.scss"
import { connect } from '@tarojs/redux'

@connect(({ common }) => ({
  phone: common.phone,
}))


export default class Authorize extends Component {
  config = {
    navigationBarTitleText: "授权登录"
  };
  constructor(props) {
    super(props)
    this.state={
      showFirst: 0
    }
  }

  componentDidMount = () => {
    
  };

  //点击授权登录按钮,
  getUserInfo = (e) => {
    const { dispatch }=this.props
    if(e.detail.userInfo) {
      Taro.getUserInfo().then(res=>{
        //把 微信用户名userName和头像地址avatarUrl 缓存到本地
        wx.setStorageSync('userName', res.userInfo.nickName,)
        wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl,)
        dispatch({
          type:'common/saveUserInfo',
          payload:{
            userName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          }
        })
        this.setState({
          showFirst: 1
        })
      })
    }else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '您拒绝了登录授权，将无法使用小程序，请授权后进入',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          
        }
      })
    }
  }

  handleGetPhone = e => {
    const { dispatch }=this.props
    if(e.detail.encryptedData) {
      const sessionKey = wx.getStorageSync('sessionKey')
      const openid = wx.getStorageSync('openid')
      dispatch({
        type:'common/getPhone',
        payload:{
          sessionKey: sessionKey,
          encryptedData: e.detail.encryptedData,
          iv:e.detail.iv,
          openid
        }
      })
      setTimeout(() => {
        //重定向到首页
        Taro.reLaunch({
          url: '../../pages/index/index',
        })
      }, 0);
    }else {
      wx.showModal({
        title: '提示',
        content: '您拒绝了电话授权，将无法使用小程序，请授权后进入',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
        }
      })
    }
  }

  render() {
    return (
      <View>
        <Image src={nullJPG} mode='scaleToFill' className="lineCenter"></Image>
        <View className='authorize_info'>
          <View className='authorize_title'>
            小程序申请获取权限
          </View>
          {
            showFirst == 0?
            <View>
              <Text className='authorize_description'>
                获得你的公开信息（昵称、头像、地区及性别等）
              </Text>
              <View className='btn_authorize_wrap'>
                <Button className='btn_authorize' openType='getUserInfo' onGetUserInfo={this.getUserInfo} type='primary' lang='zh_CN'>
                  授权登录
                </Button>
              </View>
            </View>
            :
            <View>
              <Text className='authorize_description'>
                获得你的电话信息
              </Text>
              <View className='btn_authorize_wrap'>
                <Button className='btn_authorize' openType='getPhoneNumber' type='primary' lang='zh_CN' onGetPhoneNumber={this.handleGetPhone.bind(this)}>
                  获取电话
                </Button>
              </View>
            </View>
          }
        </View>
      </View>
    )
  }
}
