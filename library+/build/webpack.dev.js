const merge = require("webpack-merge");
const Webpack = require("webpack");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./dist",
    open: true
    // historyApiFallback: true,
    // hot: true,
    // hotOnly: true,
    // overlay: {
    //     warnings: true,
    //     errors: true
    // },
    // index: "",
    // proxy: {
    //   "/": {
    //     target: "http://local.h5.ispeak.cn/",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "info.json": "test.json"
    //     },
    //     bypass: function(req, res, proxyOptions) {
    //       console.log(req);
    //       return false;
    //     }
    //     // secure: false,
    //   }
    // }
  },
  output: {
    filename: "[name].js"
  },
  optimization: {
    usedExports: true
  }
  //   plugins: [
  //       new Webpack.HotModuleReplacementPlugin()
  //   ]
});
