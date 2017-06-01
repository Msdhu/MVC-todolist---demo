const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 定义一些文件夹的路径
// "__dirname" 是node.js中的一个全局变量,指向当前执行脚本所在的绝对路径
// path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'mvc');
const JS_PATH = path.resolve(APP_PATH, 'scripts');
const CSS_PATH = path.resolve(APP_PATH, 'styles');
const HTML_PATH = path.resolve(APP_PATH, 'html');
const ENTRY_PATH = path.resolve(JS_PATH, 'index.js');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dict');

module.exports = {
    // 项目的入口文件
    entry: {
        app: ENTRY_PATH
        // vendors: ['jquery'],
    },
    // 输出的文件名 合并以后的js会命名为bundle.js
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader', publicPath: BUILD_PATH }), include: CSS_PATH },
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, include: JS_PATH, options: { presets: ['env'], plugins: ['transform-runtime', 'transform-class-properties'] } }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(HTML_PATH, 'index.html'),
            hash: true
        }),
        new ExtractTextPlugin({
            filename: 'index.css',
            disable: false,
            allChunks: true
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss() {
                    return [autoprefixer];
                }
            }
        }),
        // provide $, jQuery and window.jQuery to every script
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};
