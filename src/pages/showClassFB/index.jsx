import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtTag, AtSearchBar, AtList, AtListItem } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studentActive: true,
      teacherActive: false,
      searchValue: ''
    }
  }

  config = {
    navigationBarTitleText: '查看反馈'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  studentOnClick() {
    this.setState({
      studentActive: true,
      teacherActive: false
    })
  }

  teacherOnClick() {
    this.setState({
      studentActive: false,
      teacherActive: true
    })
  }
  
  onChange (value) {
    this.setState({
      searchValue: value
    })
    console.log(value)
  }

  onActionClick() {
    console.log('点击搜索')
  }

  changeDetail() {

  }

  render () {
    const {studentActive,teacherActive} = this.state
    return (
      <View>
        <View>
          <AtTag
            className="tagStyle"
            name='student' 
            active={studentActive}
            onClick={this.studentOnClick.bind(this)}
          >
            学生信息
          </AtTag>
          <AtTag
            className="tagStyle"
            name='teacher' 
            active={teacherActive}
            onClick={this.teacherOnClick.bind(this)}
          >
            老师信息
          </AtTag>
        </View>
        <View>
          <AtSearchBar
            value={this.state.searchValue}
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />
        </View>
        <View>
        <AtList>
          <AtListItem
            arrow='right'
            title='小明'
            note='To: 李强'
            extraText='3条最新反馈'
            onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}
          />
          <AtListItem
            arrow='right'
            title='小红'
            note='To: 李强'
            extraText='1条最新反馈'
            onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}
          />
          <AtListItem
            arrow='right'
            title='小王'
            note='To: 李强'
            extraText='2条最新反馈'
            onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}            
          />
          <AtListItem
            arrow='right'
            title='小李'
            note='To: 老张'
            extraText='已查看'
            onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}            
          />
        </AtList>
        </View>
      </View>
    )
  }
}
