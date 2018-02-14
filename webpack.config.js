var path = require('path');

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

class SkrollrStylesheetsPlugin {
    constructor(options) {}

    apply(compiler) {
        this.compiler = compiler;
        compiler.plugin('compilation', (compilation) => this.onCompilation(compilation));
    }

    onCompilation(compilation) {
        compilation.plugin('html-webpack-plugin-after-html-processing', this.onAfterHtmlProcessing);
    }

    onAfterHtmlProcessing(htmlPluginData, callback) {
        let html = htmlPluginData.html;

        html = html.replace(/(link.*href="app\.bundle\.css")/g, '$1 data-skrollr-stylesheet');
        htmlPluginData.html = html;
        callback(null, htmlPluginData);
    }
}

module.exports = {
    entry: {
        app: './src/app.js',
        // vendors: ['bootstrap', 'popper.js', 'jquery']
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
        new SkrollrStylesheetsPlugin({options: ''}),
        new HtmlWebpackPlugin({
            template: 'src/index.hbs',
            inject: 'body',
            xhtml: true
        }),
        new webpack.ProvidePlugin({
            Popper: "popper.js",
            $: "jquery",
            jQuery: "jquery",
            skrollr: "skrollr"
        }),
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: path.resolve(__dirname, 'dist/assets')
        }])
    ]
};