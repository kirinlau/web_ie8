/*
 * @Author: liuqingling
 * @Date: 2019-01-07 00:02:00
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-15 12:35:11
 */

/**
 * 选择器一定要在init定义好，方便修改
 *
 * @var  {[type]}
 */
const BaseComponent = require("../BaseComponent");
require("./pop.less");
const tpl = require("./pop.ejs");
class Pop extends BaseComponent {
  constructor() {
    super();
  }
  init() {
    this.el = '#'+this.root+' .js-pop' ;
    
  }
  render(dom,data){
    super.render(this.$(tpl).append(dom).prop("outerHTML"),data);
  }
  destroy() {
    this.$(this.el).remove()
  }
}
module.exports = Pop;
