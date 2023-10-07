const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const ROOT_PATH = path.resolve(__dirname, './');
const entry = path.resolve(ROOT_PATH, './src/index.tsx');
const baseConfig = require('agora-common-libs/presets/webpack.config.base.js');
const { locateEnvFile } = require('./webpack/utils/index');
const dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const version = require('./package.json').version;
const { sdkDevServe } = require('./webpack/utils/development-config');

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
  entry: entry,
  resolve: {
    alias: {
      '@app': path.resolve(ROOT_PATH, './src'),
      '@ui-kit-utils': path.resolve(ROOT_PATH, '../fcr-ui-kit/src/utils'),
    },
  },
  module: {
    unknownContextCritical: false,
  },

  output: {
    publicPath: '/',
    filename: 'bundle-[contenthash].js',
  },
  devServer: {
    compress: true,
    port: 3000,
    static: devServes,
  },
  plugins: [
    new dotenv({
      path: locateEnvFile(),
    }),
    new HtmlWebpackPlugin({
      filename: outHtml,
      template: htmlTemplate,
      inject: true,
    }),

    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
      DEMO_VERSION: JSON.stringify(version),
    }),
  ],
};

module.exports = webpackMerge.merge(baseConfig, config);
