const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    // publicPath: "../dist/",
    open: true,
    // host: '',
    // port: '',
    hot: true,
    hotOnly: true
  },
  entry: {
    main: "./src/js/index.js"
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "dist")
    // publicPath: "../dist/"
  },
  module: {
    rules: [
      //   {
      //     test: /\.(eot|ttf|woff|woff2|svg)$/,
      //     use: {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[contenthash].js",
      //         outputPath: "fonts/",
      //         publicPath: "fonts/"
      //       }
      //     }
      //   },
      //   {
      //     test: /\.(png|jpg|gif|svg)$/,
      //     use: {
      //       loader: "url-loader",
      //       options: {
      //         name: "[name].[contenthash].js",
      //         outputPath: "imgs/",
      //         publicPath: "imgs/",
      //         limit: 2048
      //       }
      //     }
      //   },
      //   {
      //     test: /\.(sc|sa|c)ss$/,
      //     use: [
      //       "style-loader",
      //       {
      //         loader: "css-loader",
      //         options: {
      //           importLoaders: 2
      //         }
      //       },
      //       {
      //         loader: "sass-loader"
      //         // options: {
      //         //     sourceMap: true
      //         // }
      //       },
      //       {
      //         loader: "postcss-loader",
      //         options: {
      //           plugins: [require("autoprefixer")]
      //         }
      //       }
      //     ]
      //   }
    ]
  },
  plugins: [
    // new cleanWebpackPlugin({
    // }),
    new htmlWebpackPlugin({
    //   filename: path.resolve(__dirname, "dist"),
      template: "./src/assets/index.html"
    }),
    // new miniCssExtractPlugin({
    //   filename: "css/[name].[contenthash].css",
    //   chunkfilename: "css/[id].[contenthash].css"
    // })
    new webpack.HotModuleReplacementPlugin()
  ]
};
