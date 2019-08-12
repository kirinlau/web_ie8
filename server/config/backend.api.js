/*
 * @Author: liuqingling 
 * @Date: 2019-01-05 12:56:52 
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-03-05 11:58:40
 */
// var baseURL = "http://api.kdfafa.com";
var base = {
  production:'http://api.kdfafa.com',
  // testing:'http://139.199.77.96:50000',
  testing:'http://192.168.0.222:50000',
  // development:'http://192.168.1.69'
  development:'http://192.168.0.222:50000'
}
var get_url = {
  // baseURL: 'http://139.199.77.96:50000',
  baseURL: base[process.env.EGG_SERVER_ENV||process.env.NODE_ENV],

  // 登陆接口
  /**
   * application/x-www-form-urlencoded
   */
  login: {
    method: 'POST',
    contentType: 'json',
    path: '/account/UserInfo/LoginByPwd'
  },
  dotShopIndexSeo: {
    method: 'GET',
    contentType: 'json',
    path: '/network/DotShopSEO/DotShopIndexSeo',
    pageUrl: '/'

  }
}
module.exports = get_url
