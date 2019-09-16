import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtIcon, AtButton } from 'taro-ui'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View className='at-row at-row__align--center header'>
          <View className='at-col at-col-2'>
            <AtAvatar circle size='large' text='头'></AtAvatar>
          </View>
          <View className='at-col at-col-5'>
            <View>张学友</View>
            <View>
              <AtIcon value='shuffle-play' size='15' color='#ccc'></AtIcon>
              <View className='afterIcon-font'>高三</View>
            </View>
          </View>
          <View className='at-col at-col-5'>
            <AtButton size='normal'>
              <View className='beforeIcon-font'>编辑学员</View>
              <AtIcon value='chevron-right' size='15' color='#ccc'></AtIcon>
            </AtButton>
          </View>

        </View>
      </View>
    )
  }
}
