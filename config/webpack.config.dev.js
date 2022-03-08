/*
 * @Description: **博客开发环境配置**
 * @Author: heshuaishuai
 * @Date: 2022-1-19 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */

const Package = require("../package.json")

const proxy = Package.proxy ?? {} // 获取 package.json 中的 代理配置

module.exports = {
  module: {
    rules: [
      // 解决使用css modules时antd样式不生效
      // node-modules 不采用css modlue的方式解析
      {
        test: /\.less$/i,
        // dev css-loader 支持css modlue
        // 采用css modules的解析方式时，排除对node_modules文件处理
        exclude: [/src/],
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            //允许链式调用的换行，否则ant.less引入会报错
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.less$/i,
        // dev css-loader 支持css modlue
        // 采用css modules的解析方式时，排除对node_modules文件处理
        exclude: [/node_modules/],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "less-loader",
            //允许链式调用的换行，否则ant.less引入会报错
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  devtool: "eval-cheap-module-source-map",
  mode: "development",
  devServer: {
    static: "../dist", // 将 ../dist 目录下的文件作为 web 服务的根目录。
    compress: true,
    port: 3000, // 设置端口号
    open: true, // 自动打开本地默认浏览器
    hot: true, // 开启热更新
    proxy,
    historyApiFallback: true,
  },
}
