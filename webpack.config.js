const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/js/main.js'],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './img/',
              esModule: false,
              useRelativePath: true
            }
          },
        ]
      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css"
    })
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    // })
  ],
}
