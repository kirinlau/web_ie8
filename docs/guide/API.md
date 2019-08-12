# BaseComponent 核心api
## getUserInfo  
获取用户信息
```js
const BaseComponent = require('./BaseComponent')
class Top extends BaseComponent{
  init(){
     let userinfo =  this.getUserInfo()
     console.log(userinfo)
  }
}
module.exports=Top
```
## isLogin   
判断是否登录
```js
const BaseComponent = require('./BaseComponent')
class Top extends BaseComponent{
  init(){
     let isLogin =  this.isLogin()
     if(isLogin){
         console.log('i am logined')
     }else{
        console.log('i am not login')
     }
  }
}
module.exports=Top
```
## getUrlParamJson    
获取window.location.search 后面的参数转化成obj  

```js
const BaseComponent = require('./BaseComponent')
class Top extends BaseComponent{
  init(){
     let UrlParamJson =  this.getUrlParamJson()
    console.log(UrlParamJson)
  }
}
module.exports=Top
```
## render   
写组件神器，渲染函数
```js
require("./success.less");

const Pop = require("../pop");
const tpl = require("./success.ejs");
class PopSuccess extends Pop {
  constructor() {
    super();
  }
  init(){
    super.init()
    this.el = `#${this.root}` 
  }
  show(){
    // 活生生的把当前组件搞进Pop组件里面去了
    super.render(tpl);
    this.initEvent()
  }
  initEvent(){
    this.$('.pop-success-close-button span').on('click',(e)=>{
      this.destroy()
    })
    this.$('.js-pop-close').on('click',(e)=>{
      this.destroy()
    })
  }
  destroy() {
    this.$(this.el).remove()
  }
}
module.exports = PopSuccess;
```
## getCookie   
获取，写入cookie值
```js
const BaseComponent = require('./BaseComponent')
class Top extends BaseComponent{
  init(){
     let token =  this.getCookie('token')
    console.log(token)
  }
}
module.exports=Top
```