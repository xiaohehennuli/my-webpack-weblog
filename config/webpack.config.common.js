/*
 * @Description: **博客通用配置**
 * @Author: heshuaishuai
 * @Date: 2022-1-19 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */


const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CracoLessPlugin = require('craco-less');
const webpack = require('webpack');

module.exports = {
    //webpack配置
    //入口
    entry:'./src/index.tsx',
    //输出：
    output:{
        // publicPath:resolve(__dirname,'../dist'),
        // 输出文件名
        filename:'./index.js',
        //输出路径
        path:resolve(__dirname,'../dist'),
        //生成打包文件前，清空需要打包到的目录的文件夹
        clean:true
    },
    //loader：
    module: {
        rules:[
            //ts 相关loader,关于css的loader单独抽离到dev和prod的配置中了,放到common中会有css打包bug
            {
                //告诉webpack,哪些文件需要使用该loader
                test:/\.(ts|js)x?$/i,
                exclude:/node_modules/,
                //告诉webpack,用哪个loader
                use:{
                    loader:"babel-loader",
                    //每个loader有自己的option,以下为babel-loader的option
                    options:{
                        presets: [
                            "@babel/preset-env",
                            //这里一定要加runtime:automatic 否则每个tsx文件都要引入react
                            //当设置为 automatic 时，将自动导入（import）JSX 转换而来的函数。当设置为 classic 时，不会自动导入（import）任何东西。
                            ["@babel/preset-react",{"runtime": "automatic"}],
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
                    }
                }         
            },
            // 资源模块
            {
                test:/\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/[hash][ext][query]'
                },
            },
        ]
    },
    //解析相关配置：
    resolve:{
        //解析文件的顺序
        extensions:[".tsx",".ts",".jsx",".js"]
    },
    //plugins
    plugins:[
        // 此插件用来查看webpack在打包中的进度
        new webpack.ProgressPlugin(),
        // 此插件会生成一个html文件，用来引入打包了的js和css文件
        new HtmlWebpackPlugin({
            //复制的html模板
            template:"index.html",
            // filename:path.resolve(__dirname,'../index.html')
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false
        })
    ]
}