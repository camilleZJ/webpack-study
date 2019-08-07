const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true
  },
  //   externals: "lodash",  //字符串"lodash"、数组["lodash"]、对象{lodash: "lodash"}，打包的时候遇到lodash忽略，不把lodash大包到输出文件中  这样输出的库在使用时需要引入lodash
  //   externals: {
  //     lodash: { //commonjs环境下引入lodash必须叫lodash不能叫_等其他名
  //       root: "_", //通过script标签引用而不是ES import、commonjs、AMD方式，必须像全局注入_变量，
  //       commonjs: "lodash" //lodash库在commonjs环境中使用
  //     }
  //   },
  entry: "./src/index.js",
  output: {
    // filename: "library.js",
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
    // library: "library",
    // libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // presets: [
            //   [
            //     "@babel/preset-env",
            //     {
            //       useBuiltIns: "usage"
            //     }
            //   ],
            //   "@babel/preset-react"
            // ]
          }
        }
      }
      // {
      //     test: /\.tsx?$/, //?:0或1个  即.ts/.tsx
      //     use: 'ts-loader',
      //     exclude: /node_modules/
      // }
    ]
  },
  plugins: [
    new cleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: "./src/index.html"
    })
    //   new WorkboxPlugin.GenerateSW({  //SW:service worker
    //     clientsClaim: true,
    //     skipWaiting: true
    //   })
  ]
};
