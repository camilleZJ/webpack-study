const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    // overlay: true,
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    contentBase: "./dist",
    open: true,
    // port: 8082,
    // hot: true,
    // hotOnly: true,
    // proxy: [
    //   {
    //     context: ["/api", "/api2"],
    //     target: "http://local.h5.ispeak.cn/",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "info.json": "test.json"
    //     }
    //   }
    // ]
    historyApiFallback: true
    // proxy: {
    //   index: "",
    //   "/": {
    //     target: "http://local.h5.ispeak.cn/",
    //     changeOrigin: true,
    //     // secure: false,   //代理到https请求下
    //     pathRewrite: {
    //       "info.json": "test.json"
    //     },
    //     bypass: function(req, res, proxyOptions) {
    //       if (req.headers.accept.indexOf("html") !== -1) {
    //         console.log("Skipping proxy for brower request");
    //         return "/index.html";
    //       }
    //     }
    //   }
    // }
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
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      //   options: {
      //     fix:true,
      //     emitWarning:true,
      //   }
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
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
        ]
      },
      // {
      //     test: /\.tsx?$/, //?:0或1个  即.ts/.tsx
      //     use: 'ts-loader',
      //     exclude: /node_modules/
      // }
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new cleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: "./src/index.html"
    })
    // new webpack.HotModuleReplacementPlugin()
    //   new WorkboxPlugin.GenerateSW({  //SW:service worker
    //     clientsClaim: true,
    //     skipWaiting: true
    //   })
  ],
  optimization: {
    usedExports: true
  }
};
