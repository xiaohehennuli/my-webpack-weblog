/*
 * @Description: **博客生产环境配置**
 * @Author: heshuaishuai
 * @Date: 2022-1-19 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */

// 用于生产环境压缩css，以便在生产环境中节省加载时间，同时还可以将CSS文件抽离成一个单独的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
  //切换weiback内置模式
  mode: "production",
  // loader
  module: {
    rules: [
      {
        //告诉webpack,哪些文件需要使用该loader
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        //告诉webpack,用哪个loader
        use: {
          loader: "babel-loader",
          //每个loader有自己的option,以下为babel-loader的option
          options: {
            presets: [
              "@babel/preset-env",
              //这里一定要加runtime:automatic 否则每个tsx文件都要引入react
              //当设置为 automatic 时，将自动导入（import）JSX 转换而来的函数。当设置为 classic 时，不会自动导入（import）任何东西。
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
      // 采用css modules的解析方式时，排除对node_modules文件处理
      {
        use: [
          MiniCssExtractPlugin.loader,
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
        test: /\.less$/i,
        exclude: [/src/],
      },
      {
        use: [
          MiniCssExtractPlugin.loader,
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
        test: /\.less$/i,
        // 采用css modules的解析方式时，排除`对node_modules文件处理
        exclude: [/node_modules/],
      },
    ],
  },
  //插件
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
    }),
    new BundleAnalyzerPlugin(),
  ],
  // 在生成坏境使用threeshaking,来优化代码
  // threeshaking 必须采用esm语法编程
  optimization: {
    // 启动标记功能，threeshaking，实际导出的内容会被标记上，未使用的导出内容不会被生成,treeshaking必须开启这个选项
    usedExports: true,
    // 告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle。(treeking的必要条件之一)
    minimize: true,
  },
  output: {
    //多入口唯一名称，name是入口名称
    filename: "scripts/[name].[contenthash].js",
  },
  //这些选项可以控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」
  performance: {
    // 只对js给性能提示
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(".js")
    },
    maxAssetSize: 100000,
  },
}
