/**
 * 用户信息直接保存在cookie里面，前端可以直接获取
 */
module.exports = middlewareOptions =>
  async function (ctx, next) {
    var domainName = ctx.getShopTag() 
    const { baseURL, getUserInfo, lastLoginTime } = ctx.app.config.backendApi
    try {
      let result =  await ctx.http(getUserInfo)
      let data = result.data
      if(+data.Code===0){
        ctx.cookies.set('userInfo',encodeURIComponent(JSON.stringify(data.Result)),{domain:ctx.app.config.myhost,httpOnly:false,signed: false})
        ctx.UserInfo = data.Result
          //上次登陆时间
      let response = await ctx.http(lastLoginTime,{
        domainName:domainName,
        pageIndex:2,
        pageSize:1,
        allowPaging:true
      })
      console.log(" lastLoginTime response",response)
      let res = response.data
      if(res.Code===0){
        ctx.UserInfo.lastTime = res.Result.ResultList[0]
        // ctx.UserInfo.lastTime = "2018-10-21 12:23:23"
      }
      }else{
        ctx.cookies.set('userInfo',null,{domain:ctx.app.config.myhost,httpOnly:false,signed: false})
        ctx.cookies.set('auth','',{domain:ctx.app.config.myhost,httpOnly:false,signed: false})
      }
      
    
    } catch (error) {
      ctx.logger.error(error)
    }
    await next();

    ctx.UserInfo = null
    // ctx.lastTime = null

  };