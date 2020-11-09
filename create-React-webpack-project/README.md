---
title: Webpack
date: 2020-08-15 10:13:26
categories: React
tags:
      - JavaScript框架
      - React
---

<div style="text-align: center;font-weight: 900;"> 项目环境构建 </div>


<!-- more -->

---
# Webpack
---
## 基本了解
---
1. Webpack是什么
- `Webpack` 是一个前端的项目构建工具，它是一个基于 `node.js` 开发的一个前端工具
2. 项目地址
- [github项目地址](https://github.com/L-hehuan/React/tree/master/webpack)
---
### Webpack支持的规范
---
1. CommonJS规范
- 同步加载模块，一般用于 `服务端`
```js
// 模块导出
module.exports = {

}
```
```js
// 模块导入
const module_name = require('module_name')
```
2. AMD规范
- 推崇 `依赖前置`，将文件的依赖通过数组的形式导入，然后当作函数的参数传递进函数使用
- 最后通过 `return` 来实现对外接口
- 属于 `异步加载模块`，一般用于客户端
```js
define(['jquery','main.js'],function($,main){
    // ...
    return module_name
})
```
3. CMD规范
- 推崇 `就近依赖`，异步加载模块，当模块需要被用到时再去加载
- 语法：`define(id?,deps?,factory)`，一个文件一个模块，因此常用文件名作为模块id，而依赖一般在 `factory` 中书写，而不写在参数中
- `factory` 是一个函数，提供三个参数，`funciton(require,exports,module)`。`require` (一个方法)是一个接收(引入)模块的标识，用于获取其他模块提供的接口；`exports` (一个对象)用于向外提供模块接口；`module` (一个对象)用于存储当前模块相关联的一些属性和方法
```js
define(function(require,exports,module){
    var $=require('juqery')
})
```
4. ES6规范
- 使用 `import` 来导入模块，使用 `exports` 来导出模块，异步加载模块
- `exports` 可以指定导出的内容是什么数据类型(函数、对象等)
```js
//... 此处为文件内定义内容

exports {
    fnc,
    obj
}
// OR
export fnc
export obj
```
```js
import {fnc,obj} from 'moduleA'
```
```js
exports default fnc
// 一个模块内只能存在一个
```
```js
import fnc from 'moduleA'
```
---
## 初步使用
---
### Webpack安装与相关命令
---
1. 全局安装
```bash
npm install -g webpack
// OR
cnpm install -g webpack
// OR
yarn add global webpack
```
2. 安装到项目依赖
```bash
npm install -D webpack
// OR
cnpm install -D webpack
// OR
yarn add -D webpack
```
3. 命令行的使用
- 查看 `Webpack` 版本信息
```bash
npm info webpack
```
- 安装指定版本
```bash
npm install webpack@'版本号'
```
---
### 项目进行
---
1. 初始化项目
- 使用 `npm init` 初始化项目的 `package.json`
```bash
// react-webpack目录下
npm init
```
2. 创建项目目录
```md
- webpack-react
  - public
    index.html
  - src
    main.js 
  package.json
  webpack.config.js
```
3. 安装相关依赖
- 安装 `webpack` 与 `webpack-cli`
```bash
npm install webpack webpack-cli -D
```
- 安装 `webpack-dev-server`
```bash
npm install webpack-dev-server -D
```
- 安装 `html-webpack-plugin`
```bash
npm install html-webpack-plugin
```
4. 配置package.json文件
```js
// package.json
{
  "name": "webpack-react",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js",
    // 指定构建打包的配置文件
    "serve": "webpack-dev-server --config webpack.config.js --open",
    // 指定本地服务启动的配置文件，默认为webpack.config.js，可省略，如为其他名字请指定配置文件名
    "start": "npm run serve"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^4.5.0",
    "webpack-dev-server": "^3.11.0",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12"
  }
}
```
5. 添加内容
- 添加 `html` 文件
```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">网页内容</div>
</body>
</html>
```
- 添加关联的 `js` 文件
```js
// src/main.js
console.log('hello world')
```
6. 配置webpack.config.js
```js
// webpack.config.js
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
mudole.exports ={
    // 人口文件
    entry:{
        main:path.resolve(__dirname,'./src/main.js');
    },
    // 出口文件
    output:{
        filename:"bundle.js",
        path:path.resolve(__dirname,'./dist');
    },
    // 配置启动一个本地服务器
    devServer:{
        port:8001,
        open:true,
        contentBase:path.resolve(__dirname,'public')
        // 设定自动打开浏览器后访问的内容/指定静态资源的目录
    },
    // 将打包后的html文件与js关联起来
    plugins:[new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'./public/index.html');
    })]
}
```
7. 安装clean-webpack-plugin
- 每次构建项目我们都需要把生成的 `dist` 删除，因此我们需要一个插件来代替我们完成
```bash
npm install clean-webpack-plugin -D
```
- 在 `webpack.config.js` 中引入
```js
// webpack.config.js
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports={
    // ...
    plugins: [
    new HtmlWebpackPlugin({
      // 将打包后的html文件与js关联起来
       template: path.resolve(__dirname, './public/index.html')
  }),
  // 每次构建生成前删除上一次构建打包的内容
   new CleanWebpackplugin()]
}
```
8. 安装并引入babel
- `babel` 是一个JavaScript编译器，它可以将我们的ES6/7/8语法，转化为浏览器中顺利运行的可识别的ES5语法
- 安装 `babel`
```bash
npm install babel-loader @babel/core @bable/preset-env -D
# babel-loader用于加载js文件，babel/core、preset-env才是真正用于编译js的
```
- 修改 `webpack.config.js`
```js
module.exports={
    module:{
        rules:[
            {
                test:/\.js$/,use:['babel-loader'],exclude:'/node_modules/'
                // 打包时，当检测到是.js文件时，就用babel-loader来进行加载，使用babel编译器进行代码编译，但是其中会把导入的模块包排除在外
            }
        ]
    }
    // ...

}
```
- 在当前项目下添加 `babel.config.json`
```json
// babel.fong.json
{
    "presets":[
        [
            "@babel/preset-env",
            {
                "targets":{
                    "esmodules":true
                }
            }
        ]
    ]
}
```
9. 对开发环境与生产环境进行区分
- 在打包构建时，如果我们将开发环境与生产环境需要的模块放置在同一个配置文件中，会导致代码臃肿，因此，需要对开发环境与生产环境进行区分
- 安装 `cross-env` 核心库
```bash
npm install cross-env -D
```
- 配置 `package.json` 与 入口 `index.html`
```json
// package.json
{
    // ...
    "scripts":{
        "test":"echo \"Error: no test specified\" && exit 1",
        "build":"cross-env NODE_ENV=production webpack --config webpack.config.js",
        "serve":"cross-env NODE_ENV=development webpack-dev-derver --config webpack.config.js --open",
        "start":"npm run start"
    }
    // ...
}
```
10. 配置项目热更新
- 引入 `webpack` 核心库
```js
// webpack.config.js
const webpack=require('webpack');
module.exports = {
    // ...
    devServer:{
        // ...
        hot:true
        // 开启热更新，服务器启动时会创建一个websocket长连接
        // 当代码有变化时，将变化的数据推送到客户端进行代码替换
    }
    plugins:[
        new webpack.NamedModulesPlugin();
          // 给所有的模块命个名
        new webpack.HotModuleReplacementPlugin();
    ]
}
```
11. 目前项目配置文件
- 项目目录
```md
- webpack-react
  - public
    index.html
  + node_modules
  - src
    main.js 
  package.json
  webpack.config.js
  babel.config.json
```
- package.json
```json
{
  "name": "webpack-react",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
    "serve": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js --open",
    "start": "npm run serve"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.11.6",
    "@babel/preset-env": "^7.11.5",
    "babel-loader": "^8.1.0",
    "clean-webpack-plugin": "^3.0.0",
    "cross-env": "^7.0.2",
    "html-webpack-plugin": "^4.5.0",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
  }
}
```
- webpack.config.js，对生产和开发环境进行优化
```js
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

if (ENV === "development") {
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
```
- bable.config.json
```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "esmodules": true
                }
            }
        ]
    ]
}
```
12. 关于mode选项

|选项|描述|
|:---:|:---:|
|development|在 `DefinePlugin` 中设置该值意为 `process.env.NODE` ，也就是当前环境为 `开发环境`|
|production|在 `DefinePlugin` 中设置该值意为 `process.env.NODE` ，也就是当前环境为 `生产环境`|
- 可以通过 `mode` 选项来设置当前环境为 `开发环境` 还是 `生产环境`
```js
// webpack.config.js
module.exports={
    // ...
    mode:"development"
    // mode:"production"
}
```
13. 安装并配置file-loader
```bash
npm install file-loader -D
```
- 对项目中的图片模块进行加载，打包或编译时，当检测到是图片后缀的模块时，就使用 `file-loader` 进行加载
```js
// webpack.config.js
module.exports={
  // ...
  const config={
    // ...
  module:[
    {test:/\.(png|svg|jpg|gif)$/,use:["file-loader"]}
  ]
  }
}
```
14. 安装并配置style-loader、css-loader、sass-loader
- `sass-loader` 将匹配的 ·`sass` 文件进行加载和处理，`css.loader` 将匹配到的 `css` 文件通过 `style-loader` 作为模块导出到DOM中
```bash
npm install style-loader css-loader sass-loader -D
```
```bash
npm install node-sass -D
```
```js
// webpack.config.js
module.exports={
  // ...
  module: {
    rules: [
      // 打包或编译时，当检测到是.js文件时，我就用babel-loader来进行加载，使用Babel编译器进行代码编译
      // 安装@babel/core  @babel/preset-env
      { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
      // 打包或编译时，当检测到是图片后缀的模块时，就使用file-loader进行加载
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
      // 如果是scss文件，必须使用这三个loader进行加载与处理
      // 要安装node-sass，它的作用是把浏览器识别不了sass文件转化成css
      { test: /\.(css|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader']}
    ]
  }
}
```
15. 安装并配置eslint
```bash
npm install eslint -D
```
```bash
npm install eslint-loader -D
```
- 配置开发环境独有的 `ESLINT`
- enforce='pre'，指定这个loader是前置loader，当它出错时，其他正常的loader是不工作的。同时需要安装 `eslint` ，它的作用是真正用于检测代码规范的，在 `..config.js` 下还需要添加 `.eslintrc.json` 这个配置文件
```js
// webpack.config.js
if(ENV==="development"){
  // ...
  config.module.rules.push({test:/\.js$/,use:['eslint-loader'],exclude:'/node_modules/',enforce:"pre"})
}
```
```json
// .eslintrc.json
{
  "parserOptions":{
    "esmaVersion":6,
    "sourceType":"module",
    "ecmaFeatures":{
      "jsx":true
    },
    "rules":{
      "semi":"off",
      "no-console":2
    }
  }
}
```
16. 安装并配置react相关依赖
- 安装 `React`、`ReactDOM`
```bash
npm install react react-dom -S
```
- 不同于 `Vue` 的 `模板语法` 与 `指令系统`，在 `React` 中，使用的是 `JSX`，因此，需要配置 `JSX` 预处理器
```bash
npm install @babel/preset-react -D
```
```json
// babel.config.json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "esmodules": true
                }
            }
        ],[
            "@babel/preset-react"
        ]
    ]
}
```
17. 最终配置文件
- package.json
```json
// package.js
{
  "name": "webpack-react",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
    "serve": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js --open",
    "start": "npm run serve"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.11.6",
    "@babel/preset-env": "^7.11.5",
    "@babel/preset-react": "^7.10.4",
    "babel-loader": "^8.1.0",
    "clean-webpack-plugin": "^3.0.0",
    "cross-env": "^7.0.2",
    "css-loader": "^4.3.0",
    "eslint": "^7.10.0",
    "eslint-loader": "^4.0.2",
    "file-loader": "^6.1.0",
    "html-webpack-plugin": "^4.5.0",
    "node-sass": "^4.14.1",
    "sass-loader": "^10.0.2",
    "style-loader": "^1.2.1",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
  },
  "dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  }
}
```
- webpack.config.js
```js
// webpack.config.js
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
      { test: /\.js$/, use: ['babel-loader'], exclude: '/node_modules/' },
      {test:/\.(jpg|png|svg|gif)$/,use:['file-loader']},
      {test:/\.(css|scss)$/,use:['style-loader','css-loader','sass-loader']}
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
  config.devTool='source-map';
  // 用于调试，当浏览器中报错，指定是源码中的报错位置，而不是编译后的代码中的位置
  config.devServer = {
    // 配置启动一个本地服务器
    port: 8001,
    open: true,
    hot: true,
    // 开启热更新，服务器启动时创建一个websocket长链接
    // 当代码有变化时，将变化的数据推送到客户端进行代码替换
    contentBase: path.resolve(__dirname, 'public'),
    overlay:{
      errors:true
    }
    // 当eslint报错时，让错误覆盖在视图之上
  };
  config.plugins.push(new webpack.NamedModulesPlugin());
  // 给所有的模块命个名
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.module.push({test:"/\.js$/",use:['eslint-loader'],exclude:'/node_modules/',enforce:'pre'})
}

module.exports = config
```
- .eslintrc.json
```json
// .eslintrc.json
{
  "parserOptions":{
    "esmaVersion":6,
    "sourceType":"module",
    "ecmaFeatures":{
      "jsx":true
    },
    "rules":{
      "semi":"off",
      "no-console":2
    }
  }
}
```
- babel.config.json
```json
// babel.config.json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "esmodules": true
                }
            }
        ],[
            "@babel/preset-react"
        ]
    ]
}
```
---
## 个人博客（持续学习并更新中）
---
[甲子光年](https://jetmine.cn)