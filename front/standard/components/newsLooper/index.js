/*
 * @Author: liuqingling
 * @Date: 2019-01-07 00:02:00
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-11 17:32:12
 */

/**
 * 选择器一定要在init定义好，方便修改
 *
 * @var  {[type]}
 */
const BaseComponent = require("../BaseComponent");
require("./notice.less");
class Pop extends BaseComponent {
  constructor() {
    super();
  }
  init(selector) {
    this.x = this.$(".news_li");
    this.y = this.$(".swap");
    this.h = this.$(".news_li li").length * 20; //20为每个li的高度
    this.loop();
   
  }
  loop() {
    this.t = parseInt(this.x.css("top"));
    this.y.css("top", "20px");
    this.x.animate(
      {
        top: this.t - 20 + "px"
      },
      "slow"
    ); //20为每个li的高度
    if (Math.abs(this.t) == this.h - 20) {
      //20为每个li的高度
      this.y.animate(
        {
          top: "0px"
        },
        "slow"
      );
      this.z = this.x;
      this.x = this.y;
      this.y = this.z;
    }
    setTimeout(this.loop.bind(this), 3000); //滚动间隔时间 现在是3秒
  }
  destroy() {
    this.$(this.el).remove();
  }
}
module.exports = Pop;
