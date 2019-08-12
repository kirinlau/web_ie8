/*
 * @Author: liuqingling
 * @Date: 2019-01-07 00:02:00
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-15 12:36:26
 */

/**
 * 选择器一定要在init定义好，方便修改
 *
 * @var  {[type]}
 */
const Pop = require("../pop");
require("./m-pop-guide.less");
const tpl = require("./guide.ejs");
class PopGuide extends Pop {
  constructor() {
    super();
  }
  init(){
    super.init()
    this.el = `#${this.root}` 
    if(!this.$.cookie('guide')){
      this.show()
      this.$.cookie('guide',1)
    }
      
  }
  show(){
    let img = this.$('.header-right img').attr('src')
    super.render(tpl,{img:img});
    this.initEvent()
  }
  initEvent(){
    this.$('#guide-but').on('click',(e)=>{
      this.destroy()
    })
  }
  destroy() {
    this.$(this.el).remove()
  }
}
module.exports = PopGuide;
