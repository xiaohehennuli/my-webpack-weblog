const Package = require('../package.json')

const proxy = Package.proxy ?? {} // 获取 package.json 中的 代理配置

module.exports = {
  module: {
    rules: [
        {
            test: /\.less$/i,
            // dev css-loader 支持css modlue
            use: ["style-loader", {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },'less-loader'],
          },
    ]
  },
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  devServer: {
    static: '../dist', // 将 ../dist 目录下的文件作为 web 服务的根目录。
    compress: true,
    port : 3000, // 设置端口号
    open : true, // 自动打开本地默认浏览器
    hot: true, // 开启热更新
    proxy,
    historyApiFallback: true
  }
}
