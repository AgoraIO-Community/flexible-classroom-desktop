const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const baseClassroomConfig = require('agora-classroom-sdk/webpack/webpack.base');
const baseProctorConfig = require('agora-proctor-sdk/webpack/webpack.base');
const path = require('path');
const { DEFAULT_PORT, ROOT_PATH, ALIAS } = require('./utils/index');
const { dev } = require('./utils/loaders');
const webpack = require('webpack');
const dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

const entry = path.resolve(ROOT_PATH, './src/index.tsx');
const template = path.resolve(ROOT_PATH, './public/index.html');

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: entry,
  output: {
    publicPath: '/',
    filename: 'bundle-[contenthash].js',
  },
  devServer: {
    compress: true,
    port: DEFAULT_PORT,
  },
  module: {
    rules: [...dev],
  },
  resolve: {
    alias: {
      '@classroom': path.resolve(ROOT_PATH, '../agora-classroom-sdk/src/'),
      '@proctor': path.resolve(ROOT_PATH, '../agora-proctor-sdk/src/'),
      '@app': path.resolve(ROOT_PATH, 'src'),
      '~app-ui-kit': path.resolve(ROOT_PATH, 'src/ui-kit'),
      '~app-components': path.resolve(ROOT_PATH, 'src/ui-kit/components'),
      '~app-styles': path.resolve(ROOT_PATH, 'src/ui-kit/styles'),
      '~app-utilities': path.resolve(ROOT_PATH, 'src/ui-kit/utilities'),
      '~widget-ui-kit': path.resolve(ROOT_PATH, '../agora-plugin-gallery/src/ui-kit'),
      '~widget-components': path.resolve(
        ROOT_PATH,
        '../agora-plugin-gallery/src/ui-kit/components',
      ),
      '~widget-utilities': path.resolve(ROOT_PATH, '../agora-plugin-gallery/src/ui-kit/utilities'),
      ...baseClassroomConfig.resolve.alias,
      ...baseProctorConfig.resolve.alias,
      ...ALIAS,
    },
  },
  optimization: {
    nodeEnv: 'development',
    // splitChunks: {
    //   chunks: 'all',
    // },
  },
  plugins: [
    new dotenv({
      path: path.resolve(ROOT_PATH, '../../.env'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: template,
      inject: true,
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
    }),
    new ESLintPlugin(),
  ],
  ignoreWarnings: [/createRoot/],
};

const mergedConfig = webpackMerge.merge(baseConfig, config);

module.exports = mergedConfig;
