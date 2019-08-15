const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    react: ["react", "react-dom"],
    vendors: ["lodash"]
  },
  output: {
    filename: "[name].dll.js", //name:vendors
    path: path.resolve(__dirname, "../dll"),
    library: "[name]" //以全局变量vendors暴露出去
  },
  plugins: [
      new webpack.DllPlugin({
          name: "[name]",
          path: path.resolve(__dirname, '../dll/[name].manifest.json') //在给定的 path 路径下创建一个名为 manifest.json 的文件
      })
  ]
};
