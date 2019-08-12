/*
 * @Author: liuqingling
 * @Date: 2019-01-07 00:02:00
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-16 18:36:10
 */

/**
 * 选择器一定要在init定义好，方便修改
 *
 * @var  {[type]}
 */
const Pop = require("../pop");
require("./loading.less");
const tpl = require("./loading.ejs");
class Loading extends Pop {
  constructor() {
    super();
  }
  init(){
    super.init()
    this.el = `#${this.root}` 
    this.$(window).on('show-loading',()=>{
      this.show()
    })
    this.$(window).on('close-loading',()=>{
      this.destroy()
    })
  }
  show(){
    super.render(tpl);
    this.initEvent()
  }
  initEvent(){
  }
  destroy() {
    this.$(this.el).remove()
  }
}
module.exports = Loading;
