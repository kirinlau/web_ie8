/*
 * @Author: your name 
 * @Date: 2019-01-03 09:59:57 
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-03-05 12:26:11
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const generateRoutes = require("./generateRoutes")
const seoMiddleware = require("./middleware/seoMiddleware")
const navMiddleware = require("./middleware/navMiddleware")
const shopInfo = require("./middleware/shopInfo")


module.exports = app => {

  const { router, controller ,config} = app;
  generateRoutes(router,app)
  /**
   * 首页
   */
  router.get('DotShopIndex',config.backendApi['dotShopIndexSeo'].pageUrl,controller.home.index);
};
