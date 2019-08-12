const BaseComponent = require('./BaseComponent')
class Top extends BaseComponent{
  init(){
    this.$('.js-top-login').on('click',()=>{
      this.$(window).trigger('show-login')
    })
    this.$('.js-top-register').on('click',()=>{
      this.$(window).trigger('show-register')
    })
    this.$('.js-top-logout').on('click',()=>{
      this.api.loginOut.path +='?token='+this.$.cookie('auth')
      this.http(this.api.loginOut).then(res=>{
        if(res.Code === 0){
          this.clearInfo()
          window.location.reload()
        }
      })
    })
  }
}
module.exports=Top