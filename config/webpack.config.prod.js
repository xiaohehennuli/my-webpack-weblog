/** @author henanjie
 *  生产环境独有配置
 *  update-time:2022-2-8 8:00
 */

// 用于生产环境压缩css，以便在生产环境中节省加载时间，同时还可以将CSS文件抽离成一个单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

 module.exports = {
    //切换weiback内置模式
    mode:'production',
    // loader
    module: {
        rules:[
            {
                use:[MiniCssExtractPlugin.loader, {
                    loader:'css-loader',
                    options: {
                        modules: true,
                    },
                }, 'less-loader'],
                test: /\.less$/i
            }
        ]
    },
    //插件
    plugins:[
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css'
          })
    ],
    output:{
        //多入口唯一名称，name是入口名称
        filename:'scripts/[name].[contenthash].js'
    }
}