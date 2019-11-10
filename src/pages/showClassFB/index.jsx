import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtTag, AtSearchBar, AtList, AtListItem } from 'taro-ui'

export default class ShowClassFB extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studentActive: true,
      teacherActive: false,
      searchValue: ''
    }
  }

  config = {
    navigationBarTitleText: '查看反馈',
    onReachBottomDistance: 50
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

  onPullDownRefresh() {
    console.log('下拉事件,实现刷新页面')
  }

  onReachBottom() {
    console.log('监听到触底事件,上拉加载更多')
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
            学生反馈信息
          </AtTag>
          <AtTag
            className="tagStyle"
            name='teacher' 
            active={teacherActive}
            onClick={this.teacherOnClick.bind(this)}
          >
            老师反馈信息
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
        {
          studentActive?
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
          :teacherActive?
          <AtList>
            <AtListItem
              arrow='right'
              title='李强'
              note='To: 小明'
              extraText='3条最新反馈'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}
            />
            <AtListItem
              arrow='right'
              title='王东'
              note='To: 小红'
              extraText='5条最新反馈'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}
            />
            <AtListItem
              arrow='right'
              title='张宇'
              note='To: 王皓'
              extraText='已查看'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}            
            />
          </AtList>
          :''
        }
        </View>
      </View>
    )
  }
}
