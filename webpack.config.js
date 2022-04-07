const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

const devServer = {
    hot: true,
    port: 12306,
    host: '0.0.0.0',
};

module.exports = webpackMerge.merge(baseConfig, {
    mode: 'development',
    devServer,
    optimization: {
        runtimeChunk: true,
        concatenateModules: true,
    },
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                ENV: '"dev"',
            },
        }),
    ],
})