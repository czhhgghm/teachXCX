import Taro from '@tarojs/taro'
import { baseUrl, noConsole } from '../config'

export default async (
  options = {
    method: 'GET',
    data: {},
    type: ''
  }
) => {
  if (noConsole) {
    console.log(
      `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
        options.data
      )}`
    )
  }

  let header = {}
  let accessToken = Taro.getStorageSync('accessToken') ? Taro.getStorageSync('accessToken') : ''

  if (options.type) {
    header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': accessToken
    }
  } else {
    header = {
      'Content-Type': 'application/json',
      'token': accessToken
    }
  }
  let response
  if (options.type === 'upload') {
    header = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
    response = await Taro.uploadFile({
      url: baseUrl + options.url,
      ...options.data,
      header,
      method: options.method.toUpperCase()
    })
  } else if (options.type === 'rawRequest') {
    response = await Taro.request({
      url: options.url,
      data: {
        ...options.data
      },
      header,
      method: options.method.toUpperCase()
    })
  } else {
    response = await Taro.request({
      url: baseUrl + options.url,
      data: {
        ...options.data
      },
      header,
      method: options.method.toUpperCase()
    })
  }
  const { statusCode, data } = response

  if (statusCode >= 200 && statusCode < 300) {
    if (noConsole) {
      console.log(
        `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
        response.data
      )
    }
    if (options.type === 'upload') {
      return JSON.parse(data)
    } else {
      if(data.code === '05'){
        Taro.navigateTo({
          url: `/pages/index/index`
        })
      }
      return data
    }
  } else {
    throw new Error(`网络请求错误，状态码${statusCode}`)
  }
}
