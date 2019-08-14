module.exports = {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    filename: "[name].[contentHash].js"
  }
};
