/*
 * @Author: liuqingling
 * @Date: 2019-01-04 10:28:09
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-24 13:56:40
 */
const devMode = process.env.NODE_ENV === 'development'
const staticDir = devMode ? 'devtmp' : 'dist'
let  template = JSON.parse(process.env.npm_config_argv).remain[0]
let  themeDir = JSON.parse(process.env.npm_config_argv).remain[1]
template||(template = 'standard')
const path = require('path')
const webpack = require('webpack')
const es3ifyPlugin = require('es3ify-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpackCfg = {
  devtool: 'cheap-module-source-map',
  entry: {
    'base': path.resolve(__dirname, `../front/${template}/stylesheet/base.less`)
  },
  output: {
    path: path.resolve(__dirname, `../${staticDir}/assets/${themeDir||template}`),
    filename: '[name].js',
    publicPath: `/public/${themeDir||template}`,
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.json', '.css','.less'],
    alias: {
      '@stylesheet': path.resolve(__dirname, `../front/${template}/stylesheet`),
      '@components': path.resolve(__dirname, `../front/${template}/components`),
      '@template': path.resolve(__dirname, `../front/${template}/template`),
      '@common': path.resolve(__dirname, `../common`),
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  targets: {
                    browsers: ['last 2 versions', 'ie >= 7']
                  },
                  modules: 'commonjs',
                  useBuiltIns: true,
                  debug: false
                }
              ],
              'react',
              'stage-2'
            ],
           
            plugins: ['transform-runtime']
          }
        },
        exclude: /node_modules/
        // include: [path.resolve(__dirname, '../front/pages')]
      },
      {
        test: /\.ejs$/,
        loader: 'raw-loader',
      },
      // {
      //   test: /\.ejs$/,
      //   loader: 'compile-ejs-loader',
      //   options: {
      //     delimiter: '$',
      //     compileDebug:true
      //   }
      // },
      {
        test: /\.(le|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          // MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif|swf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              name: '/resources/[name].[ext]?v=[hash]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new es3ifyPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery',
      jquery:'jquery',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, `../front/${template}/template`),
        to: path.resolve(__dirname, `../${staticDir}/ejs/${themeDir||template}/template`),
        ignore: ['.*']
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, `../front/${template}/vendor`),
        to: path.resolve(__dirname, `../${staticDir}/assets/${template}/vendor`),
        ignore: ['.*']
      }
    ]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].css',
      chunkFilename: devMode ? '[id].css' : '[id].css'
    })
  ]
}
console.log('themeDirthemeDirthemeDir',themeDir)
if(themeDir){
  webpackCfg.entry['stylesheet-template'] = path.resolve(__dirname, `../front/${template}/stylesheet/${themeDir}/index.less`)
}
module.exports = webpackCfg
