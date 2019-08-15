const path = require("path");
const copyrightWebpackPlugin = require("./plugins/copyright-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
      new copyrightWebpackPlugin(
      )
    ]
};
