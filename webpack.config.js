const webpack = require('webpack');
const path = require('path');

const config = {
  entry: path.join(__dirname, '/client/src/index.jsx'),
  output: {
    path: path.resolve(__dirname, '/client/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};

module.exports = config;