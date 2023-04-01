const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const { DEFAULT_PORT, ROOT_PATH } = require('./utils/index');
const { dev } = require('./utils/loaders');
const { sdkDevEntry, sdkWebpackConfig, sdkDevServe } = require('./utils/development-config');

const outHtml = 'index.html';
const htmlTemplate = path.resolve(ROOT_PATH, './public/index.html');

const devServes = [
  {
    directory: path.resolve(ROOT_PATH, 'public'),
    publicPath: '/',
  },
  {
    directory: path.resolve(ROOT_PATH, '../../node_modules/agora-extension-ai-denoiser/external'),
    publicPath: '/extensions/ai-denoiser',
  },
  {
    directory: path.resolve(
      ROOT_PATH,
      '../../node_modules/agora-extension-virtual-background/wasms',
    ),
    publicPath: '/extensions/agora-extension-virtual-background',
  },
];

if (sdkDevServe) {
  devServes.push(sdkDevServe);
}

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: sdkDevEntry,
  resolve: {
    alias: {
      'agora-classroom-sdk': path.resolve(ROOT_PATH, '../agora-classroom-sdk/src/infra/api'),
      'agora-proctor-sdk': path.resolve(ROOT_PATH, '../agora-proctor-sdk/src/infra/api'),
      'agora-onlineclass-sdk': path.resolve(ROOT_PATH, '../agora-onlineclass-sdk/src'),
    },
  },
  module: {
    rules: [...dev],
  },
  output: {
    publicPath: '/',
    filename: 'bundle-[contenthash].js',
  },
  devServer: {
    compress: true,
    port: DEFAULT_PORT,
    static: devServes,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: outHtml,
      template: htmlTemplate,
      inject: true,
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
    }),
  ],
};

module.exports = webpackMerge.merge(baseConfig, sdkWebpackConfig, config);
