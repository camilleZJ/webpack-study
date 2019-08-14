const path = require("path");

modules.exports = {
  mode: "develpoment",
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  }
};
