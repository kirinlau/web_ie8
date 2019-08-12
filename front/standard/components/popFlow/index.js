/*
 * @Author: liuqingling
 * @Date: 2019-01-07 00:02:00
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-11 12:49:27
 */

/**
 * 选择器一定要在init定义好，方便修改
 *
 * @var  {[type]}
 */
const Pop = require("../pop");
require("./flow.less");
const tpl = require("./flow.ejs");
class PopFlow extends Pop {
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
    this.$('.pop-flow-close-button span').on('click',(e)=>{
      this.destroy()
    })
    this.$('.js-pop-close').on('click',()=>{

      this.destroy()
    })
  }
  destroy() {
    this.$(this.el).remove()
  }
}
module.exports = PopFlow;
