const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    filename: "[name]_[contenthash].js",
    chunkFilename: "[name].chunk.[contenthash].js"
  }
};

module.exports = merge(commonConfig, prodConfig);
