/*
 * @Author: liuqingling 
 * @Date: 2019-01-05 16:37:27 
 * @Last Modified by: your name
 * @Last Modified time: 2019-01-16 12:00:12
 */
const path = require('path')
module.exports = middlewareOptions =>
  async function (ctx, next) {
    var domainName = ctx.getShopTag() 
    const { baseURL, shopInformation, } = ctx.app.config.backendApi

    try {
      let result =  await ctx.http(shopInformation,{
        domainName:domainName,
      })
      if(result.data.Code === 0){
        ctx.logger.info('ThemePath',result.data.Result.ThemePath)
        let theme = result.data.Result.ThemePath
        if(!theme){
          theme='standard'
          // theme='theme-longbang'
        }
        if(ctx.app.config.theme){
          theme = ctx.app.config.theme
        }
        ctx.theme=theme+'/pages/'
        result.data.Result.domainName = domainName
        ctx.ShopInfo = result.data
      }
      
    } catch (error) {
      ctx.logger.error(error)
    }
    await next();
    ctx.ShopInfo = null

  };
