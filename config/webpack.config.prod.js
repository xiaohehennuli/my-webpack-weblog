/*
 * @Description: **博客生产环境配置**
 * @Author: heshuaishuai
 * @Date: 2022-1-19 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */


// 用于生产环境压缩css，以便在生产环境中节省加载时间，同时还可以将CSS文件抽离成一个单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    //切换weiback内置模式
    mode: 'production',
    // loader
    module: {
        rules: [
            // 采用css modules的解析方式时，排除对node_modules文件处理
            {
                use: [MiniCssExtractPlugin.loader, "css-loader", {
                    loader: 'less-loader',
                    //允许链式调用的换行，否则ant.less引入会报错
                    options: {
                        lessOptions: {
                            javascriptEnabled: true
                        }
                    }
                }
                ],
                test: /\.less$/i,
                exclude: [/src/]
            },
            {
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },
                }, {
                    loader: 'less-loader',
                    //允许链式调用的换行，否则ant.less引入会报错
                    options: {
                        lessOptions: {
                            javascriptEnabled: true
                        }
                    }
                }
                ],
                test: /\.less$/i,
                // 采用css modules的解析方式时，排除对node_modules文件处理
                exclude: [/node_modules/],
            }
        ]
    },
    //插件
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css'
        })
    ],
    output: {
        //多入口唯一名称，name是入口名称
        filename: 'scripts/[name].[contenthash].js'
    },
    //这些选项可以控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」
    performance: {
        // 只对js给性能提示
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js');
        },
        maxAssetSize: 100000,
    },
}