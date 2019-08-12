/*
 * @Author: your name 
 * @Date: 2019-01-02 13:40:36 
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-03-05 12:23:33
 */
'use strict';

const Controller = require('egg').Controller;
const path = require('path')
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { dotShopIndexSeo} = ctx.app.config.backendApi;
    const shopTag = ctx.getShopTag()
    let data=null
    try {
      data = await ctx.http(dotShopIndexSeo, {
       domainName: shopTag,
       // stippleGuid:ctx.ShopInfo.Result.StippleGuid,
       allowPaging:false
     })
   } catch (error) {
     ctx.logger.error(error)
   }
    await ctx.render('home/index',{
      data:data
    });
  }

}

module.exports = HomeController;
