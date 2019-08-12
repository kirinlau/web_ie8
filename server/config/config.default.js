'use strict'
const path = require('path')
const frontApi = require('../../common/front.api')
const backendApi = require('./backend.api')
const CONSTANTS = require('../../common/constant')

module.exports = appInfo => {
  console.log('app env',appInfo.env)
  const config = (exports = {})
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546266663807_4051'
  config.themeBase = appInfo.env == 'local' ? 'devtmp' : 'dist'
  if(appInfo.env == 'local'){
    const npmArgs = JSON.parse(process.env.npm_config_argv);
    let  theme = npmArgs.remain[1]
    config.theme = theme
  }
  config.frontApi = frontApi
  config.backendApi = backendApi

  config.myhost = CONSTANTS.myDomain
  config.logger = {
    outputJSON: true,
    dir: path.resolve(`./server/logs/${config.themeBase}`),
  };
  config.logrotator = {
    filesRotateByHour: [],           // list of files that will be rotated by hour
    hourDelimiter: '-',              // rotate the file by hour use specified delimiter
    maxFileSize: 50 * 1024 * 1024,   // Max file size to judge if any file need rotate
    maxFiles: 10,                    // pieces rotate by size
    rotateDuration: 60000,           // time interval to judge if any file need rotate
    maxDays: 31,                     // keep max days log files, default is `31`. Set `0` to keep all logs
  }
  config.view = {
    root:`${path.resolve(`./${config.themeBase}/ejs`)}`,
    defaultViewEngine: '.ejs',
    defaultExtension: '.ejs',
    mapping: {
      '.ejs': 'ejs',
      '.html': 'ejs'
    }
  }
  config.ejs= {
    cache: false,
  }
  config.security= {
    csrf: false
  }
  config.static={
    dir:[path.resolve(`./${config.themeBase}/assets`)]
  }
  // add your config here
  config.middleware = [ 'common','shopInfo','getUserInfo','customRender']

  return config
}
