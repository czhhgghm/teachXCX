# 开发环境

## 微信开发工具
- [下载微信开发工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

## 安装项目依赖
npm install(npm版本为6.10.3)

## 打开微信开发者工具
* 目录指向 `dist`
* appid: wxb606392a692583e6

## 微信小程序
npm run dev:weapp

### 开发主要目录说明
    
    - project
    |———— src
    |   |———— assets    //  本地资源目录
    |   |———— config    //  接口配置
    |   |———— models    //  数据管理
    |   |———— pages        //  页面文件目录
    |   |———— utils     //   公共函数
    |   app.jsx     //项目入口文件
    |   app.scss    //项目总通用样式
    |   index.html   //  html模板
    |
    |———— dist              // 打包输出目录

# taro 相关文档
[taro官网](https://taro.jd.com/)
[taro-ui官网](https://taro-ui.aotu.io/#/)

入口文件会包含一个 config 配置项，这个配置是整个应用的全局的配置，配置规范基于微信小程序的全局配置进行制定，所有平台进行统一。
入口文件中的全局配置，在编译后将生成全局配置文件 app.json。