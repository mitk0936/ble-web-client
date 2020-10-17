var path = require('path');
var webpack = require('webpack');
var Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: [["@babel/preset-env", {
            "useBuiltIns": "usage",
            "targets": "> 0.25%, not dead"
          }]]
        }
      },
    ]
  },
  stats: {
    colors: true
  },
  plugins: [new Visualizer({
    filename: './statistics.html'
  })],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'lib'),
    compress: true,
    host: '0.0.0.0',
    https: true,
    port: 6821,
    hot: true
  }
};