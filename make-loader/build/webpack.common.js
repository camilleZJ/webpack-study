const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [
    new cleanWebpackPlugin({
      root: path.resolve(__dirname, "../")
    }),
    new htmlWebpackPlugin({
      template: "./src/asset/index.html"
    })
  ],
  resolveLoader: {
      modules: ["node_modules", "./loaders"]  //注意：优先级从前到后
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "../src"),
        use: [
          {
            loader: "replaceLoader",
            options: {
              name: "world"
            }
          },
          {
            loader: "replaceLoaderAsync",
            options: {
              name: "dell"
            }
          }
        ]
      }
    ]
  }
};
