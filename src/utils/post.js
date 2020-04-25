import Taro from '@tarojs/taro'
import { baseUrl, consoleDetail } from '../config'

export default async (
  options = {
    method: 'POST',
    data: {}
  }
) => {
  let isManager = options.url.split('/')[1]
  let header = {
    'Content-Type': 'application/json'
  }
  if(consoleDetail) {
    console.log(
      `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
        options
      )}`
    )
  }
  if(isManager == 'manager') {
    header = {
      'content-type': 'application/json',
      'cookie': wx.getStorageSync('Set-Cookie')
    }
  }
  return Taro.request({
    url: baseUrl + options.url,
    data: {
      ...options.data
    },
    header: header,
    method: options.method.toUpperCase()
  }).then(res => {
    const { statusCode, data } = res
    if (statusCode == 200) {
      //管理员情况下登录会得到后台cookie,此时保存起来
      if(res.cookies.length > 0) {
        wx.setStorageSync('Set-Cookie', res.cookies[0])
      }
      //测试情况下,查看接口响应
      if(consoleDetail) {
        console.log(
          `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
          res
        )
      }
      //后台接口报错
      if(data.code !== 0 && data.code !== 11) {
        Taro.showToast({
          title: data.msg,
          duration: 2000
        })
        //单独处理登录超时的情况,此时跳转到授权登录页重新登录
        if(data.code == 28) {
          wx.removeStorageSync('sessionKey')
          wx.removeStorageSync('openid')
          setTimeout(()=>{
            Taro.reLaunch({
              url: '../authorize/index'
            })
          },1500)
        }
      }
      return data
    }
    else {
      throw new Error(`网络请求错误，状态码${statusCode}`)
    }
  })
}
