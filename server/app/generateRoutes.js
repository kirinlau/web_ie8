/*
 * @Author: liuqingling 
 * @Date: 2019-01-05 12:37:40 
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-05 16:00:54
 */
/**
 * @param router [Object] [router对象]
 * @param app [Object] [应用对象] 
 * @description "自动生成路由"
 */
module.exports = (router,app) => {
  Object.keys(app.config.frontApi).forEach(el=>{
    if(typeof app.config.frontApi[el] === 'string') return
    const {method,path}=app.config.frontApi[el]
    const {controller} = app
    router[method.toLowerCase()](el,path,controller.frontApi.index)
  })
}