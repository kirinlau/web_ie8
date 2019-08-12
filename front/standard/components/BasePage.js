// require("@stylesheet/base.less");
const Login = require("@components/login");
const Register = require("@components/register");
const Top = require("@components/top");
const BaseComponent = require('./BaseComponent')
const Header = require("@components/Header");
const PopGuide = require("@components/popGuide");
const PopLoading = require("@components/popLoading");

class BasePage extends BaseComponent{
  constructor(){
    super()
  }
  init(){
    this.login = new Login();
    this.login.init()
    this.register = new Register()
    this.register.init()
    this.top =new Top()
    this.top.init()
    this.header = new Header()
    this.header.init()
    this.popGuide = new PopGuide()
    this.popGuide.init()
    this.popLoading = new PopLoading()
    this.popLoading.init()
    
  }
}

module.exports = BasePage;
