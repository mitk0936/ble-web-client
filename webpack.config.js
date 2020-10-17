const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const STATIC_MAPS_FOLDER = 'maps';
const STATIC_CSS_FOLDER = 'src/css';

const staticMapsFolders = fs.readdirSync(path.resolve(__dirname, STATIC_MAPS_FOLDER));

console.log(staticMapsFolders);

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
  plugins: [
    new Visualizer({
      filename: './statistics.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, STATIC_MAPS_FOLDER), to: 'maps' },
        { from: path.resolve(__dirname, STATIC_CSS_FOLDER), to: 'css' },
      ],
      options: {
        concurrency: 100,
      },
    }),
    new webpack.DefinePlugin({
      STATIC_MAPS_FOLDERS: JSON.stringify(staticMapsFolders)
    })
  ],
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