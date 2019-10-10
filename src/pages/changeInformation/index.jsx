import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtInput, AtForm, AtButton } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state={
      
    }
  };

  config = {
    navigationBarTitleText: '修改个人信息'
  }

  componentWillMount () {
    console.log(this.$router.params)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  submitHandle () {
    Taro.showToast({
      title: '保存成功'
    },Taro.redirectTo({
        url: '../../pages/index/index',
      })
    )
  }
  handleChange = e => {
    console.log(e)
  }
  render () {
    const {key,value} = this.$router.params
    return (
      <View className='index'>
        <AtForm
            onSubmit={this.submitHandle.bind(this)}
        >
          <AtInput
            name='value'
            title={key}
            type='text'
            placeholder='更改个人信息'
            value={value}
            onChange={this.handleChange.bind(this)}
          />
          <AtButton type='secondary' className='btn' formType='submit'>保存</AtButton>
        </AtForm>
      </View>
    )
  }
}
