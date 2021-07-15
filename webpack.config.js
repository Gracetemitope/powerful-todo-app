const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  /* eslint-disable */

  plugins: [new StylelintPlugin()],
  plugins: [new ESLintPlugin()],
  /* eslint-enable */

  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  /* eslint-disable */

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Document',
      template: './src/index.html',
    }),
  ],
  /* eslint-enable */

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
      },
    ],
  },

};