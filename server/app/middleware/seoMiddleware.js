/*
 * @Author: liuqingling 
 * @Date: 2019-01-05 16:37:27 
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-09 22:23:47
 */

module.exports = 
  async function seoMiddleware(ctx, next) {
    var domainName = ctx.getShopTag()    
    /**
     * 根据进来的页面判断使用哪个页面的seo
     */
    var page = ctx.request.path
    try {
      const apiObj = Object.keys(ctx.app.config.backendApi).find(el=>{
        return ctx.app.config.backendApi[el].pageUrl === page
      })
      let result=null;
      if (apiObj) {
         result =  await ctx.http(ctx.app.config.backendApi[apiObj],{
          domainName:domainName,
        })
      }else {
        result =  await ctx.http(ctx.app.config.backendApi.dotShopDefaultSeo,{
          domainName:domainName,
        })
      }
      if(result&&result.data.Code===0){
        ctx.Seo = result.data
      }
    } catch (error) {
      ctx.logger.error(error)
    }
    await next();
    ctx.Seo = null
  };
