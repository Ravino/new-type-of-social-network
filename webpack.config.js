// const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

window.console.log('webpack config!');

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    // mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new VueLoaderPlugin()
    ]
};
