import Taro from '@tarojs/taro'
import { noConsole } from '../config'

// const request_data = {
//   platform: 'wap',
//   rent_mode: 2
// }

export default (
  options = {
    method: 'GET',
    data: {}
  }
) => {
  if (!noConsole) {
    console.log(
      `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
        options.data
      )}`
    )
  }

  return Taro.request({
    url: options.url,
    data: {
      ...options.data
    },
    header: {
      'Content-Type': 'application/json'
    },
    method: options.method.toUpperCase()
  }).then(res => {
    const { statusCode, data } = res
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(
          `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
          res.data
        )
      }

      // if (data.status !== 0) {
      //   Taro.showToast({
      //     title: `数据请求${res.data.msg}`,
      //     icon: 'none',
      //     mask: true
      //   })
      // }

      return data
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`)
    }
  })
}
