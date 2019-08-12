/*
 * @Author: liuqingling 
 * @Date: 2019-01-04 10:27:41 
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-16 11:48:51
 */
const shell = require("shelljs");
const path = require("path");

const del = require("del");
const chokidar = require("chokidar");
/**
 * 获取主题参数
 */
const npmArgs = JSON.parse(process.env.npm_config_argv);
let  theme = npmArgs.remain[0]

theme||(theme = 'standard')
let child;
chokidar
  .watch([path.resolve(`./${theme}/pages`),path.resolve(`./${theme}/template`)], { ignored: /(^|[\/\\])\../ })
  .on("add", (filepath, event) => {
    const fileName = filepath.split(path.sep)
    if (fileName.indexOf("ejs") != -1|| fileName.indexOf("js")!=-1) {
      if (child) process.kill(child.pid);
      child = shell.exec(
        "webpack --config ./build/webpack.config  --watch",
        { async: true },
        (code, stdout, stderr) => {}
      );
    }
  })
child = shell.exec(
  "webpack --config ./build/webpack.config  --watch",
  {async:true}
);
shell.exec('egg-bin dev  --port=8888 --baseDir=./server',{async:true});


