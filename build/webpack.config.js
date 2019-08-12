/*
 * @Author: liuqingling 
 * @Date: 2019-01-04 10:28:12 
 * @Last Modified by:   liuqingling 
 * @Last Modified time: 2019-01-04 10:28:12 
 */
const generator = require('./generator')
const webpackCfg = require('./webpack.base.config')
webpackCfg.mode='development'
generator.initPage(webpackCfg)
module.exports = webpackCfg
