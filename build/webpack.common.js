const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const makePlugins = configs => {
  const plugins = [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "../")
    })
  ];

  Object.keys(configs.entry).forEach(item => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: `${item}.html`,
        chunks: [item]
      })
    )
  })

  return plugins;
}

const configs = {
  entry: {
    index: "./src/index.js",
    list: "./src/list.js",
    detail: "./src/detail.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist")
  },
  resolve: {
    extensions: [".js", ".jsx"],
    // mainFiles: ['index', 'Child'],
    alias: {
      child: path.resolve(__dirname, '../src/child/Child')
    }
  },   
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
};

configs.plugins = makePlugins(configs);
module.exports = configs;