const path                      = require('path');
const CopyWebpackPlugin         = require('copy-webpack-plugin');
const HtmlWebpackPlugin         = require('html-webpack-plugin');
const { CleanWebpackPlugin }    = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './src/main.js'],
        // main: './src/main.js',
        thirdparty: './src/thirdparty.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        open: true,
        hot: true,
        before(app, server, compiler) {
            compiler.plugin('done', () => {

                const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);

                if( this.hot &&
                    changedFiles.some(filePath => ['.hbs'].includes(path.parse(filePath).ext )) ) {

                    server.sockWrite(server.sockets, 'content-changed');
                }
            });
        }
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
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
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
        new HtmlWebpackPlugin({
            template: './src/index.hbs'
        }),
        new CleanWebpackPlugin(),
    ]
}