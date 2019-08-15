const path = require("path");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    open: true
  },
  output: {
    filename: "[name].js"
  },
  optimization: {
    usedExports: true
  }
});
