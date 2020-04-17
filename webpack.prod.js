const path                      = require('path');
const CopyWebpackPlugin         = require('copy-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const HtmlWebpackPlugin         = require('html-webpack-plugin');
const { CleanWebpackPlugin }    = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: ['@babel/polyfill', './src/main.js'],
        // main: './src/main.js',
        thirdparty: './src/thirdparty.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        runtimeChunk: 'single'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            },
            {
                test: /\.(sa|sc|c)ss/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            // post css plugins, can be exported to postcss.config.js
                            plugins: () => ( [ require('precss'), require('autoprefixer') ] )
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /.(png|svg|jpg|gif)$/,
                use: [
                   'file-loader' 
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'src/assets/img',
                to: 'assets/img'
            }
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false,
        }),
        new HtmlWebpackPlugin({
            template: './src/index.hbs'
        }),
        new CleanWebpackPlugin()
    ]
}