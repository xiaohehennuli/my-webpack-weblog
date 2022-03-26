/*
 * @Description: **博客通用配置**
 * @Author: heshuaishuai
 * @Date: 2022-1-19 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */

const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  //webpack配置
  //入口
  entry: "./src/index.tsx",
  //输出：
  output: {
    // publicPath:resolve(__dirname,'../dist'),
    // 输出文件名
    filename: "./index.js",
    //输出路径
    path: resolve(__dirname, "../dist"),
    //生成打包文件前，清空需要打包到的目录的文件夹
    clean: true,
    // 这个非常重要,webdevsever会根据这个设置来访问目录,静态资源加载也会依赖它
    publicPath: "/",
  },

  //loader：
  module: {
    rules: [
      //关于ts和css的loader单独抽离到dev和prod的配置中了,放到common中会有css打包bug
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },

      // 资源模块
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/[hash][ext][query]",
        },
      },
    ],
  },
  //解析相关配置：
  resolve: {
    //解析文件的顺序
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  //plugins
  plugins: [
    // 此插件用来查看webpack在打包中的进度
    new webpack.ProgressPlugin(),
    // 此插件会生成一个html文件，用来引入打包了的js和css文件
    new HtmlWebpackPlugin({
      //复制的html模板
      template: "index.html",
      // filename:path.resolve(__dirname,'../index.html')
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ],
}
