const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
// 引入webpack核心库

const ENV = process.env.NODE_ENV;
// cross-env 用于区分开发环境与生产环境
const config = {
  // 入口文件
  entry: { main: path.resolve(__dirname, './src/main.js') },
  // 出口文件
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, './dist')
  },
  plugins: [new HtmlWebpackPlugin({
    // 将打包后的html文件与js关联起来
    template: path.resolve(__dirname, './public/index.html'),
    title: 'element'
    // 配置网站标题，需要在html文件中使用ejs模板
  }),
  ],
  // 模块化，在webpack中，一切文件都是模块
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], exclude: '/node_modules/' }
      // 打包时，当检测到是.js文件时，就用babel-loader来进行加载，使用babel编译器进行代码编译，但是其中将导入的模块包排除在外
    ]
  }
}

if (ENV === "production") {
  // 使用mode去添加开发或者生产环境，在选项中添加
  // 获取当前环境是开发环境还是生产环境
  config.mode = "production";
  // 每次构建生成前删除上一次构建打包的内容
  config.plugins.push(new CleanWebpackPlugin())
}

if (ENV === "devlopment") {
  config.mode = "development";
  config.devServer = {
    // 配置启动一个本地服务器
    port: 8001,
    open: true,
    hot: true,
    // 开启热更新，服务器启动时创建一个websocket长链接
    // 当代码有变化时，将变化的数据推送到客户端进行代码替换
    contentBase: path.resolve(__dirname, 'public')
  };
  config.plugins.push(new webpack.NamedModulesPlugin());
  // 给所有的模块命个名
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config