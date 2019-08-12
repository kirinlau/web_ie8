# 兼容ie8 node项目

基于webpack4 兼容 ie7-8 的配置

该 webpack.config 只考虑了对 ie7 ie8 进行配置。

## 使用方法
打开c:\windows\system32\drivers\etc\hosts
修改hosts：127.0.0.1 vip.kdfafa.com

```
// 安装依赖
npm i
cd server
npm i
// 开启默认主题开发模式
npm run dev
// template 模板  主题
npm run dev [template] [theme]
// 构建模板，主题
npm run build [template] [theme]
// 测试环境
npm run server:test
// 线上环境
npm run server:prod
// 浏览器访问
http://vip.kdfafa.com:8888

```
## 表单验证方法
http://www.runoob.com/jquery/jquery-plugin-validate.html

项目中的插件列表
1.jquery.validate
2.jquery
2.swiper
## 模板设计问题
1.每套模板资源各自独立
2.基础组件共享
3.同时升级所有模板，怎么办
4.多套模板存放
=======================
1.遍历主题文件夹或者从主题总表里面拿所有的主题，
2.启动时候，把路径加到静态资源里面去
## 发布流程
1.cd 项目文件夹
2.npm run build
3.npm run prod
## 项目停止
npm stop
## 框架功能
框架的目的：告诉你如何去做！并且还能获取好的成果
0.框架原理
1.环境区分
2.前端打包
3.组件开发
4.后端接口自动代理
5.日志
6.seo
7.自定义模板
8.前后端js共用
## 具体业务逻辑实现
1.全局登录注册
2.数据校验
3.编写路由

## 