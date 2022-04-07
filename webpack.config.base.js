const webpack = require('webpack');
const path = require('path');
const WebpackBarPlugin = require('webpackbar');
const FriendlyErrorsPlugin = require('friendly-errors-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        main: path.resolve(__dirname, './examples/render/index.tsx'),
    },
    cache: {
        type: 'filesystem',
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss', '.sass', '.less'],
    },
    module: {
        rules: [
            {
                test: /\.worker(\.ts$|\.js$)/i,
                loader: 'worker-loader',
            },
            {
                test: /\.tsx?$|\.js$/,
                use: ['cache-loader', 'thread-loader', { loader: 'babel-loader' }],
                exclude: /(node_modules)/,
            },
            {
                test: /\.css$/,
                use: [
                    'cache-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                            modules: {
                                mode: 'local',
                                auto: true,
                                localIdentName: '[name]_[local]_[hash:base64:5]',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'cache-loader',
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
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
    plugins: [
        new WebpackBarPlugin(),
        new FriendlyErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, './dist/index.html'),
            templateParameters: {
                // platform_env: process.env.PLANTFORM_ENV,
            },
            template: './index.ejs',
            inject: 'body',
        }),
    ],
};
