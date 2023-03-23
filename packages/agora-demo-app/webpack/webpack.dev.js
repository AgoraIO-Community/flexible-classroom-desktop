const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');
const { DEFAULT_PORT, ROOT_PATH, ALIAS } = require('./utils/index');
const { dev } = require('./utils/loaders');
const webpack = require('webpack');
const dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

const entryMap = {
  main: path.resolve(ROOT_PATH, './src/index.tsx'),
  classroom: path.resolve(ROOT_PATH, './src/dev/classroom/index.tsx'),
  onlineclass: path.resolve(ROOT_PATH, './src/dev/onlineclass/index.tsx'),
  proctor: path.resolve(ROOT_PATH, './src/dev/proctor/index.tsx'),
};
const template = path.resolve(ROOT_PATH, './public/index.html');

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: entryMap[process.env['FCR_ENTRY']],
  output: {
    publicPath: '/',
    filename: 'bundle-[contenthash].js',
  },
  resolve: {
    alias: { ...ALIAS },
  },
  devServer: {
    compress: true,
    port: DEFAULT_PORT,
    static: [
      {
        directory: path.resolve(ROOT_PATH, 'public'),
        publicPath: '/',
      },
      {
        directory: path.resolve(
          ROOT_PATH,
          '../../node_modules/agora-extension-ai-denoiser/external',
        ),
        publicPath: '/extensions/ai-denoiser',
      },
      {
        directory: path.resolve(
          ROOT_PATH,
          '../../node_modules/agora-extension-virtual-background/wasms',
        ),
        publicPath: '/extensions/agora-extension-virtual-background',
      },
    ],
  },
  module: {
    rules: [...dev],
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
