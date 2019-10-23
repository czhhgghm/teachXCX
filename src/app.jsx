import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'
import dva from './utils/dva'
import models from './models'
import './app.scss'

const dvaApp = dva.createApp({
  initialState: {},
  models: models
})
const store = dvaApp.getStore()

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/authorize/index',
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

  async componentDidMount () {
    const {dispatch} = store

    await dispatch({
      type: 'common/getAppId'
    })

    
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
