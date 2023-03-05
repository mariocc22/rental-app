const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: "./scripts/index.js",
    aboutUs: "./scripts/about-us.js",
    explore: "./scripts/explore.js",
    property: "./scripts/property.js",
    listmyspace: "./scripts/list-my-space.js",
    loginModal: "./query/auth.js",
    phoneVer: "./query/phone-verification.js",
    showcase: "./scripts/showcase.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js",
    publicPath: "/",
    assetModuleFilename: "assets/img/[name][ext]",
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader
      //     },
      //     "css-loader"
      //   ]
      // }
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // instead of style-loader
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg|eot|ttf|woff)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    // ADD CSS FILES AS SUCH
    new MiniCssExtractPlugin(),

    // Add All HTML PAGES AS SUCH
    new HtmlWebpackPlugin({
      template: "./pages/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/about-us.html",
      filename: "about-us.html",
      chunks: ["aboutUs"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/all-places.html",
      filename: "all-places.html",
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/explore.html",
      filename: "explore.html",
      chunks: ["explore"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/property.html",
      filename: "property.html",
      chunks: ["property"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/list-my-space.html",
      filename: "list-my-space.html",
      chunks: ["listmyspace"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/login-modal.html",
      filename: "login-modal.html",
      chunks: ["loginModal"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/phone-auth.html",
      filename: "phone-auth.html",
      chunks: ["phoneVer"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/showcase.html",
      filename: "showcase.html",
      chunks: ["showcase"],
    }),
  ],
  devServer: {
    port: 5000,
  },
  devtool: "source-map",
};
