const path = require("path");
const publicPath = path.resolve(process.cwd(), 'public');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSExtract = new ExtractTextPlugin('styles.css');
const isProduction = process.env.NODE_ENV==='production';
const webpack = require("webpack");

require("dotenv").config();

module.exports = {
    mode:process.env.NODE_ENV,
    entry:[
        "babel-polyfill",
        path.resolve(__dirname,"src","app.jsx")
    ],
    output:{
        path:path.resolve(__dirname,"public"),
        filename:"bundle.js",
        publicPath:publicPath,
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude:[
                    path.resolve(__dirname,"node_modules")
                ],
                loader: "babel-loader"
            },
            {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                  use: [
                    {
                      loader: 'css-loader',
                      options: {
                        sourceMap: true
                      }
                    },
                    {
                      loader: 'sass-loader',
                      options: {
                        sourceMap: true
                      }
                    }
                  ]
                })
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '/assets/[name].[ext]',
                }
            }
        ]
    },
    optimization:{
      splitChunks: {
          chunks:'all'
      }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        CSSExtract
    ],
    devtool: isProduction?"source-map":"inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
      historyApiFallback: true, // true for index.html upon 404, object for multiple paths
      https: false, // true for self-signed, object for cert authority,
      hot: true
    }
};