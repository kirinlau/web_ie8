/*
 * @Author: liuqingling
 * @Date: 2019-01-07 00:02:00
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-15 15:52:27
 */

/**
 * 选择器一定要在init定义好，方便修改
 *
 * @var  {[type]}
 */
const BaseComponent = require("../BaseComponent");
require("./m-pop-login.less");
const tpl = require("./m-pop-login.ejs");
// const registerTpl  = require("./register.ejs");
class Login extends BaseComponent {
  constructor() {
    super();
    // this.init()
  }
  init() {
    this.el = `#${this.root} .js-login-pop`;
    this.tabContent = {
      0: this.el + " .js-login-pwd",
      1: this.el + " .js-login-sms"
    };
    /**
     * 显示login
     */
    this.$(window).on("show-login", () => {
      this.show();
    });
    /**
     * 关窗
     */
    this.$(window).on("close-login", () => {
      this.destroy();
    });
    this.autoLogin();
  }
  autoLogin() {
    let _this = this;
    let username = _this.$.cookie("username");
    let password = this.base64.decode(_this.$.cookie("password")||'').replace("Xuxian_kd","");
    if (!_this.isLogin() && username && password) {
      _this
        .http(_this.api.login, {
          Pwd: password,
          Source: "shop",
          UserName: username
        })
        .then(function(res) {
          if (res.Code === 0) {
            _this.saveUserToken(res.Result);
            // 选择自动登录，保存
          }
        });
    }
  }
  show() {
    this.render();
    this.initEvent();
  }
  render() {
    super.render(tpl);
  }
  initEvent() {
    this.$("#auto_login").on("click", e => {
      var isChecked = this.$("#auto_login").prop("checked");
      if (isChecked) {
        console.log("isChecked", isChecked);
      }
    });
    /**
     * 关窗
     */
    this.$(this.el + " .pop-login-close").on("click", () => {
      this.destroy();
    });
    /**
     * 切换注册模板
     */
    this.$(this.el + " .auto-line").on("click", e => {
      this.$(window).trigger("show-register");
      this.destroy();
    });

    /**
     * tab切换
     */
    this.$(this.el + " .pop-login-nav>div").on("click", e => {
      this.$(".pop-login-nav>div").removeClass("active");
      this.$(e.target).addClass("active");
      this.$(".js-login").hide();
      this.$(this.tabContent[this.$(e.target).data("tab")]).show();
      if (this.$(e.target).data("tab") == 1) {
        this.$(".auto-login").hide();
      } else {
        this.$(".auto-login").show();
      }
    });
    /**
     * 设置tab索引
     */
    this.$(this.el + " .pop-login-nav>div").each((index, el) => {
      console.log("index", index);
      this.$(el).data("tab", index);
    });
    /**
     * 获取验证码
     */

    this.$(this.el + " .login-code-button").on("click", e => {
      if (this.$(e.target).hasClass("disabled")) {
        return;
      }
      let $form = this.$(
        this.tabContent[this.$(this.el + " .pop-login-nav .active").data("tab")]
      );
      let _this = this;
      $form.validate().destroy();
      $form.validate({
        submitHandler: function(form) {
          let $form = _this.$(form);
          let params = {
            Phone: "",
            Source: "shop",
            ValidateType: 202
          };
          let formData = _this.$(form).serializeObject();
          params.Phone = formData.UserName;
          let tips = $form.find(".js-login-tips");
          _this.http(_this.api.loginCode, params).then(function(res) {
            if (res.Code === 0) {
              tips.text(res.Result.Message);
              _this.$(e.target).addClass("disabled");
              let time = 60;
              let timer = setInterval(function() {
                _this.$(e.target).text(time--);
                if (!time) {
                  clearInterval(timer);
                  _this.$(e.target).text("获取验证码");
                  _this.$(e.target).removeClass("disabled");
                }
              }, 1000);
            } else {
              tips.text(res.Message);
              tips.show();
            }
          });
        },
        rules: {
          UserName: {
            required: true,
            mobile: true
          }
        },
        messages: {
          UserName: "请输入手机号码"
        }
      });
      $form.submit();
    });
    /**
     * 密码登陆,验证码登录
     */
    this.$(this.el + " .pop-login-primary-button").on("click", () => {
      // 0为密码登录，1为验证码登录
      let formType = this.$(this.el + " .pop-login-nav .active").data("tab");
      let $form = this.$(this.tabContent[formType]);
      let _this = this;
      $form.find(".js-login-tips").text("");
      $form.validate().destroy();
      $form.validate({
        submitHandler: function(form) {
          let $form = _this.$(form);
          _this
            .http(
              +formType === 1 ? _this.api.loginByCode : _this.api.login,
              _this.$(form).serializeObject()
            )
            .then(function(res) {
              if (res.Code === 0) {
                _this.saveUserToken(res.Result);
                // 选择自动登录，保存
                if (+formType !== 1 && _this.$("#auto_login").prop("checked")) {
                  _this.$.cookie("username", $form.serializeObject().UserName);
                  
                  _this.$.cookie("password", _this.base64.encode($form.serializeObject().Pwd + "Xuxian_kd"));
                }
                window.location.reload()
              } else {
                let tips = $form.find(".js-login-tips");
                tips.text(res.Message);
                tips.show();
              }
            });
        },
        rules: {
          UserName: {
            required: true,
            mobile: true
          },
          Pwd: {
            required: true
          },
          Source: {
            required: true
          }
        },
        messages: {
          UserName: "请输入手机号码",
          Pwd: +formType === 1 ? "输入短信验证码" : "请输入密码"
          // UserName: {
          //   required: "请输入手机号码"
          // },
          // Pwd: {
          //   required: formType===1?"输入短信验证码":"请输入密码"
          // }
        }
      });
      $form.submit();
    });
  }
  destroy() {
    this.$(this.el).remove();
  }
}
module.exports = Login;
