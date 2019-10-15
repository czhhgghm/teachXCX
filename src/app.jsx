import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/showPerson/index',
      'pages/schedule/index',
      'pages/studentFeedback/index',
      'pages/personalProfile/index',
      'pages/signUp/index',
      'pages/advice/index',
      'pages/changeInformation/index',
      'pages/coachingProgram/index',
      'pages/reviewProgram/index',
      'pages/showClassFB/index',
      'pages/usersManage/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#289ff0',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
