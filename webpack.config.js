const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./script.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  devServer: {
    port: 3000
  },
  devtool: "source-map"
};