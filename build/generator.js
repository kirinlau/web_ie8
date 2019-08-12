/*
 * @Author: liuqingling
 * @Date: 2018-12-30 23:27:09
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-17 15:57:04
 */
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pageCfgs = []
let routes = {}
let  theme = JSON.parse(process.env.npm_config_argv).remain[0]
let  themeDir = JSON.parse(process.env.npm_config_argv).remain[1]
theme||(theme = 'standard')
const root = `./front/${theme}/pages`
const pattern = root + '/**/**.ejs'
const pages = glob.sync(pattern)

pages.forEach(page => {
  let _path = page.replace(root, '')
  let routerPath = _path.replace('.ejs','')
  let pageEntry = page.replace('.ejs','.js')
  routes[routerPath] = page
  pageCfgs.push({
    filename: path.join('/pages',_path),
    pageName: routerPath,
    template: page,
    pageEntry: fs.existsSync(pageEntry)?pageEntry:null
  })
})
module.exports = {
  routes: routes,
  pageCfgs: pageCfgs,
  initPage: function (webpackCfg) {
    this.pageCfgs.forEach(pageCfg => {
      if(pageCfg.pageEntry){
        webpackCfg.entry[pageCfg.pageName.substring(1,pageCfg.pageName.length)] = path.resolve(pageCfg.pageEntry)
      }
      let preDir=''
      let chunks=pageCfg.pageEntry?[pageCfg.pageName.substring(1,pageCfg.pageName.length)]:[]
      if(webpackCfg.mode==="development"){
        preDir=path.resolve(`./devtmp/ejs/${themeDir||theme}`)
      }else if(webpackCfg.mode==="production"){
        preDir=path.resolve(`./dist/ejs/${themeDir||theme}`)
      }
      webpackCfg.plugins.push(
        
        new HtmlWebpackPlugin({
          filename: preDir+pageCfg.filename,
          template: pageCfg.template,
          inject: 'body',
          hash: true,
          chunksSortMode:'manual',
          minify: {
            // 压缩HTML文件
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: false // 删除空白符与换行符
          },
          chunks: ['base'].concat(chunks.concat(['stylesheet-template']))
        })
      )
    })
  }
}
