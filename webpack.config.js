const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    allowedHosts: ["smart-contest.com"],
  },
  entry: "./src/js/index.js",
  mode: "development",
  watch: true,
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Flip Clock",
      hash: true,
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "public" }],
    }),
  ],
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 1000,
  },
  output: {
    filename: "js/app.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: [":data-src"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
