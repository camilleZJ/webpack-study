const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const webpack = require("webpack");

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
        chunks: ['runtime', 'vendors', item]
      })
    );
  });

  const files = fs.readdirSync(path.resolve(__dirname, "../dll/"));
  files.forEach(file => {
    if (/.*\.dll.js/.test(file)) {
      plugins.push(
        new AddAssetHtmlWebpackPlugin({
          filepath: path.resolve(__dirname, "../dll", file)
        })
      );
    }
    if (/.*\.manifest.json/.test(file)) {
      plugins.push(
        new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, "../dll", file)
        })
      );
    }
  });

  return plugins;
};

// const plugins = [
//   new CleanWebpackPlugin({
//     root: path.resolve(__dirname, "../")
//   }),
//   new HtmlWebpackPlugin({
//     template: "./src/index.html",
//     filename: `index.html`
//   })
// ];
// const files = fs.readdirSync(path.resolve(__dirname, "../dll/"));
// // console.log(files);
// files.forEach(file => {
//   if (/.*\.dll.js/.test(file)) {
//     plugins.push(
//       new AddAssetHtmlWebpackPlugin({
//         filepath: path.resolve(__dirname, "../dll", file)
//       })
//     );
//   }
//   if (/.*\.manifest.json/.test(file)) {
//     plugins.push(
//       new webpack.DllReferencePlugin({
//         manifest: path.resolve(__dirname, "../dll", file)
//       })
//     );
//   }
// });

const configs = {
  entry: {
    index: "./src/index.js"
    // list: "./src/list.js",
    // detail: "./src/detail.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist")
  },
  resolve: {
    extensions: [".js", ".jsx"],
    // mainFiles: ['index', 'Child'],
    alias: {
      child: path.resolve(__dirname, "../src/child/Child")
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // exclude: /node_modules/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
  // plugins
};

configs.plugins = makePlugins(configs);
module.exports = configs;
