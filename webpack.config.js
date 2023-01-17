const path = require("path");

module.exports = {
  entry: "./webpackage/index.js",
  output: {
    path: path.resolve(__dirname, "javascripts"),
    filename: "bundle.js"
  }
};
