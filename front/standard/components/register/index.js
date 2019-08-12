/*
 * @Author: liuqingling
 * @Date: 2019-01-07 00:02:00
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-15 14:35:33
 */

/**
 * 选择器一定要在init定义好，方便修改
 *
 * @var  {[type]}
 */
const Pop = require("../pop");
require("./register.less");
const tpl = require("./register.ejs");
const PopSuccess = require("../popSuccess");
const popSuccess = new PopSuccess()
class Register extends Pop {
  constructor() {
    super();
  }
  init(){
    super.init()
    this.el = `#${this.root}` 
    /**
     * 
     */
    this.$(window).on('show-register',(e)=>{
      console.log(e.target)
      this.show()
    })
    /**
     * 关窗
     */
    this.$(window).on('close-register',()=>{
      this.destroy()
    })
    popSuccess.init()
  }
  show(){
    super.render(tpl);
    this.initEvent()
  }
  register(form){
    return new Promise((resolve,reject)=>{
      _this.http(_this.api.reg,_this.$(form).serializeObject()).then(function(res){
        if(res.Code===0){
          resolve()
        }else{
          reject()
          // let tips = $form.find('.js-login-tips')
          // tips.text(res.Message)
          // tips.show()
        }
     })
    })
  }
  initValidator(isGetCode){
    let _this = this;
    const $form = this.$('.js-register-sms')
    $form.validate().destroy()
    $form.validate({
      submitHandler: function(form) {
        let $form = _this.$(form)
        if(isGetCode){
          // 获取验证码
          let params = {
            Phone: '',
            Source: 'shop',
            ValidateType: 201
          }
          let formData = _this.$(form).serializeObject()
          params.Phone = formData.UserName
          let tips = $form.find('.js-register-tips')
          tips.text('')
         _this.http(_this.api.loginCode,params).then(function(res){
            if(res.Code===0){
              tips.text(res.Result.Message)
              _this.$(".register-code-button").addClass('disabled')
              let time = 60;
              let timer= setInterval(function(){
                _this.$(".register-code-button").text(time--)
                if(!time){
                  clearInterval(timer)
                  _this.$(".register-code-button").text('获取验证码')
                  _this.$(".register-code-button").removeClass('disabled')
                }
              },1000)
            }else{
              tips.text(res.Message)
              tips.show()
            }
         })
        }else{
          // 注册接口
          _this.http(_this.api.reg,_this.$(form).serializeObject()).then(function(res){
            if(res.Code===0){
              popSuccess.show()
            }else{
              let tips = $form.find('.js-register-tips')
              tips.text(res.Message)
              tips.show()
            }
         })
        }
      
      },
      rules: {
        UserName: {
          required: true,
          mobile:true
        },
        Pwd: {
          required: !isGetCode
        },
        ValidateCode:{
          required: !isGetCode
        },
        Source: {
          required: !isGetCode
        }
      },
      messages: {
        UserName: "请输入手机号码",
        ValidateCode:'输入短信验证码',
        Pwd:"请输入密码",
      }
    });
    $form.submit()
  }
  initEvent(){
      /**
     * 跳转登录
     */
    this.$('#click_z_login').on('click',()=>{
        this.destroy()
        this.$(window).trigger('show-login')
    })
    this.$(this.el+' .pop-register-close').on('click',()=>{
      this.destroy()
    })
    this.$(this.el).find('.pop-register-primary-button').on('click',(e)=>{
      if(this.$(e.target).hasClass('register-disabled')){
        return
      }
      this.initValidator()
    })
   this.$(this.el).find('.register-code-button').on('click',(e)=>{
    if(this.$(e.target).hasClass('disabled')){
      return
    }
    this.initValidator(true)
   })
    this.$('#agree').on('click',(e)=>{
      var isChecked = this.$('#agree').prop('checked') 
      if(isChecked){
        this.$(this.el).find('.pop-register-primary-button').removeClass('register-disabled')
      }else{
        this.$(this.el).find('.pop-register-primary-button').addClass('register-disabled')
      }
    })
  }
  destroy() {
    this.$(this.el).remove()
  }
}
module.exports = Register;
