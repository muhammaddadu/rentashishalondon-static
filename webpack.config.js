var path = require('path');

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer]
                        }
                    }, 'sass-loader']
                })
            },
            {
                test: /\.(ttf|eot|woff2?)(\?v=[a-z0-9=\.]+)?$/i,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            },
            {
                test: /\.(jpg|svg|png?)(\?v=[a-z0-9=\.]+)?$/i,
                loader: 'file-loader?name=./img/[name].[ext]'
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                query: {
                    partialDirs: [
                        path.resolve(__dirname, 'src/components')
                    ]
                }
            },
            {
              test: /\.svg$/,
              loader: 'svg-inline-loader?classPrefix'
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].bundle.css'),
        new HtmlWebpackPlugin({
            template: 'src/index.hbs',
            inject: 'body',
            xhtml: true
        }),
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: path.resolve(__dirname, 'dist/assets')
        }])
    ]
};