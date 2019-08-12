require("./index.less");
const Banner = require("@components/banner");
const BasePage = require("@components/BasePage");
const Map = require('@components/map')
const PopSuccess = require('@components/popSuccess')
const NewsLooper = require('@components/newsLooper')

class Index extends BasePage {
  constructor() {
    super();
  }
  init() {
    super.init();
    index.visitRecord();
    this.banner = new Banner()
    this.map = new Map()
    this.map.init('baidumap')
    this.$('.js-home-show-map-button').on('click',(e)=>{
      if(this.$('.home-show-map-button').hasClass('open')){
        this.$('.home-show-map-button').removeClass('open')
        this.$('.js-map-tips').hide()
        this.$('.home-show-map-button a').text('展开')
      }else{
        this.$('.home-show-map-button').addClass('open')
        this.$('.js-map-tips').show()
        this.$('.home-show-map-button a').text('收起')
      }
    })

  }
  remove(){
      
  }

  //访问记录
  visitRecord(){
    // alert(returnCitySN['cip'] + returnCitySN['cname']);
    var domain = document.domain.split(".")[0];
    try {
      this.http(this.api.visitRecord, {
        DomainName:domain,
        IPAddress:returnCitySN['cip']
      }).then(res=>{
        //  console.log("res==========",res)
      })
    } catch (error) {
      console.log(error);
    }
  }
}
let nl = new NewsLooper()
nl.init('.news-looper')
let index = new Index()
index.init()

