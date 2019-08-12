module.exports = middlewareOptions =>
  async function customRender(ctx, next) {
    let _render = ctx.render
    /**
     * 拦截render函数，默认添加页面需要的信息。
     */
    ctx.render = async function(){
      if(!arguments[1]){
        arguments[1] = {}
      }
      ctx.theme?ctx.theme = 'standard/':''
      ctx.logger.error(ctx.theme)
      arguments[0] = 'standard/pages/'+arguments[0]
      try{
        await _render.apply(ctx,arguments)
      }catch(error){
        ctx.logger.error(error)
        ctx.body='程序员正在努力升级中。。。'
      }
    }
    await next();
  };
