/*
 * @Author: liuqingling 
 * @Date: 2019-01-04 10:27:46 
 * @Last Modified by:   liuqingling 
 * @Last Modified time: 2019-01-04 10:27:46 
 */
const shell = require('shelljs');
const path = require('path');
const del = require('del');
del.sync([path.resolve('devtmp/**')]);
console.log('正在删除目录');
shell.exec('webpack --config ./build/webpack.prod.config', { async: true }, (code, stdout, stderr) => {
  console.log(stdout)
});
shell.exec('egg-bin dev  --port=8888 --baseDir=./server', { async: true }, (code, stdout, stderr) => {
  console.log(stdout)
});
