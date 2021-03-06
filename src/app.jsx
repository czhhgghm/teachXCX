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
      'pages/courseFeedback/index',
      'pages/personalProfile/index',
      'pages/signUp/index',
      'pages/advice/index',
      'pages/coachingProgram/index',
      'pages/reviewProgram/index',
      'pages/showCourseFB/index',
      'pages/usersManage/index',
      'pages/writeCoachingProgram/index',
      'pages/profileHistory/index',
      'pages/viewNewUsers/index',
      'pages/showAdvice/index',
      'pages/addUsers/index',
      'pages/usersManDetail/index',
      'pages/addCourse/index',
      'pages/showFBDetail/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#289ff0',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true
    }
  }

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
