const BaseComponent = require('./BaseComponent')
const PopFlow = require('./popFlow')
class Header extends BaseComponent{
  init(){
    const popFlow = new PopFlow()
    popFlow.init()
    this.showSearchPnael();
    this.closeSearchPanel();
    this.searchClick();

    this.$('.js-header-like').on('click',()=>{
      if(!this.isLogin()){
        this.$(window).trigger('show-login')
      }else{
        let params = {
					"UserId": this.$.cookie('auth'),
					"StippleGuid": this.$(".js-header-like").attr('StippleGuid'),
					"SourceType": "1"
				}
        this.http(this.api.follow,params).then(res=>{
          if(+res.Code === 0&& res.Result.code===100){
            this.$('.js-header-like').removeClass('header-unlike').addClass('header-unlike')
            window.location.reload()
          }else{
            popFlow.show()
          }
        })
      }
    })
  }

  //展示搜索面板
  showSearchPnael(){
    this.$("input[name='codes']").on('click',(e)=>{
      e.stopPropagation()
      this.$(".search-panel").css("display", "block");
      // this.$(".search-panel").show();
      this.$(".search-input").focus();
    })
  }

  //关闭搜索面板
  closeSearchPanel(){
    this.$('.search-panel').on('click',(e)=>{
      e.stopPropagation()
    })
     this.$('body').on('click',(e)=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
      this.$(".search-panel").css("display", "none");
    })
    this.$('#panel-close').on('click',(e)=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
      this.$(".search-panel").css("display", "none");
    })
  }

  searchClick(){
    this.$('.search-btn').on('click',(e)=>{ 
      this.$("input[name='codes']").val(this.$(".search-input ").val());                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
      this.$("#js-submit-button").click();
    })
  }
}
module.exports= Header