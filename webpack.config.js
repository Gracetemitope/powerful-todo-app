const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');



module.exports = {
  plugins: [new StylelintPlugin(options)],
  plugins: [new ESLintPlugin(options)],


  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Document',
      template: './src/index.html',
    }),
  ],
  
  output: {
    filename: '[name].bundle.js',


    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',

  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
  
  
};