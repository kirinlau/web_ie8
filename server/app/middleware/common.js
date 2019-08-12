const contentType = require('../../../common/contentType')
module.exports = middlewareOptions =>
  async function commonRequest(ctx, next) {
    ctx.logger.info("request.url",ctx.request.url);
    ctx.logger.info("auth",ctx.get("auth"));
    ctx.getShopTag =()=> {
      return ctx.get('host').split(".")[0]
    }
    ctx.getPage =()=> {
      return ctx.request.path.replace("/","")
    }
    ctx.http = async (apiConfig,data)=>{
      let result =  await ctx.curl(ctx.app.config.backendApi.baseURL+apiConfig.path, {
        beforeRequest:options=>{
          ctx.logger.info('backend.api:',ctx.app.config.backendApi.baseURL+apiConfig.path)
        },
        method: apiConfig.method,
        data: data,
        contentType: contentType[apiConfig.contentType],
        dataType: "json",
        headers: {
          // auth: ctx.get("auth")
          auth:ctx.cookies.get('auth',{signed: false})
        },
        timeout: 60000,
      });
      ctx.logger.info('backend.api:',result.data)
      return result
    }
    ctx.postJSON = async (url, data) => {
      let result =  await ctx.curl(url, {
        beforeRequest:options=>{
          ctx.logger.info('backend.api:',options.path)
        },
        method: "POST",
        data: data,
        contentType: "json",
        dataType: "json",
        headers: {
          // auth: ctx.get("auth")
          auth:ctx.cookies.get('auth',{signed: false})
        },
        timeout: 60000,
      });
      ctx.logger.info('backend.api:',result.data)
      return result
    };
    ctx.postForm = async (url, data) => {
      ctx.logger.info('backend.api:',url)
      let result =  await ctx.curl(url, {
        beforeRequest:options=>{
          ctx.logger.info('backend.api:',options.path)
        },
        method: "POST",
        data: data,
        dataType: "json",
        headers: {
          // auth: ctx.get("auth")
          auth:ctx.cookies.get('auth',{signed: false})
        },
        timeout: 60000,
      });
      ctx.logger.info('backend.api:',result.data)
      return result
    };
    ctx.getJSON = async (url,data) => {
      let result =  await ctx.curl(url, {
        beforeRequest:options=>{
          ctx.logger.info('backend.api:',options.path)
        },
        method: "GET",
        dataType: "json",
        data:data,
        headers: {
          // auth: ctx.get("auth")
          auth:ctx.cookies.get('auth',{signed: false})
        },
        timeout: 60000,
      });
      ctx.logger.info('backend.api:',result.data)
      return result
    };
    await next();
  };
