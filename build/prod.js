/*
 * @Author: liuqingling 
 * @Date: 2019-01-04 10:28:01 
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-17 14:34:58
 */
const shell = require('shelljs');



shell.exec('webpack --config ./build/webpack.prod.config', { async: false }, (code, stdout, stderr) => {
});

