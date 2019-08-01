const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    // host: '',
    // port: '',
    hot: true,
    hotOnly: true
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = merge(commonConfig, devConfig);
