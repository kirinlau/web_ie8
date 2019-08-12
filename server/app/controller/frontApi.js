'use strict';

const Controller = require('egg').Controller;
const contentType = require('../../../common/contentType')
class ApiController extends Controller{
  async index(){
      const {ctx,app} = this
      const {baseURL} = app.config.frontApi
      let result = await ctx.curl(baseURL+ctx.request.path+ctx.request.search, {
        method: ctx.request.method,
        data: ctx.request.body,
        dataType: "json",
        headers: {
          auth: ctx.get("auth"),
          'content-type': ctx.request.headers['content-type'],
        },
        timeout: 60000,
      });
      ctx.body = result.data
    }
}
module.exports = ApiController;
