/*
 * @Author: liuqingling 
 * @Date: 2019-01-05 16:37:27 
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-09 22:24:12
 */

module.exports = 
  async function (ctx, next) {
    var domainName = ctx.getShopTag() 
    try {
      let result =  await ctx.getJSON(ctx.app.config.backendApi.baseURL + ctx.app.config.backendApi.nav.path,{
        domainName:domainName,
      })
      result.data.Result.activeUrl = ctx.request.path
      ctx.Nav = result.data

    } catch (error) {
      ctx.logger.error(error)
    }
    await next();
    ctx.Nav = null

  };
