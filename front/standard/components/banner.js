/*
 * @Author: liuqingling 
 * @Date: 2019-01-07 00:01:54 
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-10 21:52:38
 */
require('./vendor/swiper-2.7.6/src/idangerous.swiper.css')
require('./vendor/swiper-2.7.6/src/idangerous.swiper.js')
require('@stylesheet/components/banner.less')

const BaseComponent = require('./BaseComponent')

class Banner extends BaseComponent {
  constructor () {
    super()
    this.init()
  }
  init () {
    if(this.$('.banner-swiper-container .swiper-slide').length>0){
      this.$('.banner-swiper-container').swiper({
        loop: true,
        pagination: '.pagination',
        paginationClickable: true,
        autoplay: 2000,
        speed:1000,
        
        // spaceBetween: 100000,
        // moveStartThreshold: 100
  
      })
    }
  
  }
  async go () {
    let func = await this.asyncTest()
    console.log(func)
  }
  asyncTest () {
    return new Promise((resovle, reject) => {
      setTimeout(() => {
        console.log('2222')
        resovle(3333)
      }, 1000)
    })
  }
}
module.exports = Banner

