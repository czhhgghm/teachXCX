import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtFab, AtTag, AtSearchBar, AtList, AtListItem } from 'taro-ui'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      managerActive: true,
      studentActive: false,
      teacherActive: false,
      searchValue: ''
    }
  };

  config = {
    navigationBarTitleText: '用户管理'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onButtonClick() {
    Taro.navigateTo({
      url: '../../pages/addUsers/index',
    })
  }

  studentOnClick() {
    this.setState({
      studentActive: true,
      teacherActive: false,
      managerActive: false
    })
  }

  teacherOnClick() {
    this.setState({
      studentActive: false,
      teacherActive: true,
      managerActive: false
    })
  }

  managerOnClick() {
    this.setState({
      studentActive: false,
      teacherActive: false,
      managerActive: true
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
    const {managerActive,studentActive,teacherActive} = this.state
    return (
      <View className='index'>
        <View>
          <AtTag
            className="tagStyle"
            name='manager' 
            active={managerActive}
            onClick={this.managerOnClick.bind(this)}
          >
            管理员
          </AtTag>
          <AtTag
            className="tagStyle"
            name='student' 
            active={studentActive}
            onClick={this.studentOnClick.bind(this)}
          >
            学生/家长
          </AtTag>
          <AtTag
            className="tagStyle"
            name='teacher' 
            active={teacherActive}
            onClick={this.teacherOnClick.bind(this)}
          >
            老师
          </AtTag>
        </View>
        <AtSearchBar
          value={this.state.searchValue}
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
        
        <View>
        {
          managerActive?
          <AtList>
            <AtListItem
              arrow='right'
              title='管理员A'
              note='15622286923'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}            
            />
            <AtListItem
              arrow='right'
              title='管理员B'
              note='13352719939'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}
            />
            <AtListItem
              arrow='right'
              title='管理员C'
              note='13343819939'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}
            />
            <AtListItem
              arrow='right'
              title='管理员D'
              note='15622286923'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}            
            />
            <AtListItem
              arrow='right'
              title='管理员E'
              note='13329945878'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}            
            />
          </AtList>
          :studentActive?
          <AtList>
            <AtListItem
              arrow='right'
              title='小明'
              note='13352719939'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}
            />
            <AtListItem
              arrow='right'
              title='小红'
              note='13343819939'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}
            />
            <AtListItem
              arrow='right'
              title='小王'
              note='15622286923'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}            
            />
            <AtListItem
              arrow='right'
              title='小明'
              note='13352719939'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}
            />
            <AtListItem
              arrow='right'
              title='小红'
              note='13343819939'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}
            />
            <AtListItem
              arrow='right'
              title='李强'
              note='13352719939'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}
            />
            <AtListItem
              arrow='right'
              title='王东'
              note='13329945878'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}
            />
            <AtListItem
              arrow='right'
              title='张宇'
              note='13329945878'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}            
            />
          </AtList>
          :teacherActive?
          <AtList>
            <AtListItem
              arrow='right'
              title='老师A'
              note='13352719939'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}
            />
            <AtListItem
              arrow='right'
              title='老师B'
              note='13329945878'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}
            />
            <AtListItem
              arrow='right'
              title='老师C'
              note='13329945878'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}            
            />
            <AtListItem
              arrow='right'
              title='老师D'
              note='13329945878'
              onClick={this.changeDetail.bind(this,`/pages/profileHistory/index?key=$'{name}'`)}            
            />
          </AtList>
          :'系统出错'
        }
        </View>
        <AtFab onClick={this.onButtonClick.bind(this)}>
          <Text className='at-fab__icon at-icon at-icon-add' ></Text>
        </AtFab>
      </View>
    )
  }
}
