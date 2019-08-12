/*
 * @Author: liuqingling
 * @Date: 2019-01-07 00:02:00
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-11 12:55:44
 */

/**
 * 选择器一定要在init定义好，方便修改
 *
 * @var  {[type]}
 */
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
