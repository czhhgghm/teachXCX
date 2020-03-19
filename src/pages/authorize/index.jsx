import { View, Button, Image } from "@tarojs/components";
import Taro, { Component } from '@tarojs/taro';
import nullJPG from '../../assets/images/null.jpg';
import "./index.scss";
import { connect } from '@tarojs/redux';

@connect(({ common }) => ({
  ...common
}))

export default class Authorize extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showUserInfo: true
    }
  }

  config = {
    navigationBarTitleText: "授权登录"
  };

  componentDidMount() {
    const { dispatch } = this.props;
    wx.checkSession({
      success () {
        const sessionKey = wx.getStorageSync('sessionKey');
        if(!sessionKey) {
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
  }

  //点击授权登录按钮
  getUserInfo = e => {
    const { dispatch } = this.props;
    if(e.detail.userInfo) {
      Taro.getUserInfo().then(res=>{
        //把 微信用户名netName 和 头像地址avatarUrl 保存到数据仓库并缓存到本地
        const result = res.userInfo;
        dispatch({
          type:'common/saveUserInfo',
          payload:{
            netName: result.nickName,
            avatarUrl: result.avatarUrl
          }
        })
        wx.setStorageSync('netName', result.netName);
        wx.setStorageSync('avatarUrl', result.avatarUrl);
        this.setState({
          showUserInfo: false
        })
      })
    }else {
      wx.showModal({
        title: '提示',
        content: '您拒绝了登录授权，将无法使用小程序，请授权后进入',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {}
      })
    }
  }

  handleGetPhone = async(e) => {
    const { dispatch }=this.props;
    const result = e.detail;
    if(result.encryptedData) {
      const sessionKey = wx.getStorageSync('sessionKey');
      const openid = wx.getStorageSync('openid');
      await dispatch({
        type:'common/getPhone',
        payload:{
          sessionKey,
          encryptedData: result.encryptedData,
          iv:result.iv,
          openid: openid
        }
      })
      Taro.reLaunch({
        url: '../../pages/home/index'
      })
    }
    else {
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
            showUserInfo == true ?
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
                提示:如果长时间获取不到电话,则无法登陆,请清空缓存后重新尝试登陆
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
