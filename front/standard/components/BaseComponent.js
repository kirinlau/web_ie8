/*
 * @Author: liuqingling 
 * @Date: 2019-01-21 13:49:26 
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-24 11:37:33
 */
/**
 * 组件的写法，如果达不到复用，等于白搞，通用（弹窗，分页，表格，左侧菜单，）
 * css 组件（写成函数，直接使用less调用）
 * 
 */
const api = require("@common/front.api");
const CONSTANS = require("@common/constant.js");

const contentType = require("@common/contentType");
const Base64 = require("./vendor/base64");
const validateExtend = require('../utils/validateExtend')
const UUID = require('../utils/uuid')


class BaseComponent {
  constructor() {
    this._init();
  }
  _init() {
    this.$ = window.$;
    this._ = window._;
    validateExtend(this.$)
    this.api = api;
    this.base64 = new Base64()
    this.contentType = contentType;
    this.root = this.randID()
    this.$.cookie.defaults={
      expires: 365
    }
    this.$.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      window.$.each(a, function() {
        if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || "");
        } else {
          o[this.name] = this.value || "";
        }
      });
      return o;
    };
  }
   urlEncode(param, key, encode) {
    if (param==null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '='  + ((encode==null||encode) ? encodeURIComponent(param) : param); 
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
            paramStr += this.urlEncode(param[i], k, encode)
        }
    }
    return paramStr;
}
  /**
   * [http 请求封装]
   *
   * @return  {[type]}  [return description]
   */
  async http(apiConfig, data) {
    let _resolve;
    let _reject;
    const promise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    let urlString = this.api.baseURL + apiConfig.path
    if(apiConfig.method.toLowerCase() === 'get'){
      urlString += '?'+ this.urlEncode(data)
      data = null
    }
    this.$.ajax({
      url: urlString,
      type: apiConfig.method,
      data: apiConfig.contentType === 'json'&& data?JSON.stringify(data):data,
      dataType: "json",
      headers: {
        "Content-Type": apiConfig.contentType
          ? this.contentType[apiConfig.contentType]
          : "application/x-www-form-urlencoded; charset=UTF-8",
        auth: this.getCookie('wddp_user_app_Token')
      },
      success: function(ajaxData) {
        _resolve(ajaxData);
      },
      error: function(err) {
        _reject(err);
      }
    });
    return promise;
  }
  getUserInfo(){
    if(this.$.cookie("userInfo")){
      return JSON.parse(decodeURIComponent(this.$.cookie("userInfo")))
    }else{
      return null
    }
  }
  isLogin(){
    return this.$.cookie("auth")||this.getCookie('wddp_user_app_Token')
  }
  clearInfo(){
    this.$.cookie("wddp_user_app_Token", '',{domain:CONSTANS.myDomain});
    this.$.cookie("auth", '',{domain:CONSTANS.myDomain});
    this.$.cookie("userInfo", '',{domain:CONSTANS.myDomain});
    this.$.cookie("username", '');
    this.$.cookie("password", '');
  }
  saveUserToken(userInfo){
    var _base = new Base64();
    this.$.cookie("wddp_user_app_Token", _base.encode(userInfo.Token + "Xuxian_kd"),{expires:new Date(userInfo.ExpriedTime),domain:CONSTANS.myDomain});
    this.$.cookie("auth", userInfo.Token,{expires:new Date(userInfo.ExpriedTime),domain:CONSTANS.myDomain});
  }
  /**获取cookie */
  getCookie(name) {
    var _base = new Base64();
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) {
      var name_a = unescape(arr[2]);
      name_a = _base.decode(name_a);
      name_a = name_a.replace("Xuxian_kd", "");
      return name_a;
    } else return null;
  }
  randID() {
		return new UUID().id
  }
  getDomain(){
    return window.location.host.split('.')[0]
  }
  html_encode(str){
		var s = "";
		if (str.length == 0) return ""
		s = str.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
		return s;
	}
  render(domString,data){
    let domCompile = this._.template(this.html_encode(domString))
    let dom = domCompile(data||{})
    this.componentWarpper = `<div id="${this.root}"></div>`
    if(this.$(`#${this.root}`).length>0){
      this.$(`#${this.root}`).append(dom)
    }else{
      this.$('body').append(this.$(this.componentWarpper).append(dom))
    }
  }
  getUrlParamJson = function() {
		// 获取url中"?"符后的字串
		const url = location.search;
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			var strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
  
}
module.exports = BaseComponent;
