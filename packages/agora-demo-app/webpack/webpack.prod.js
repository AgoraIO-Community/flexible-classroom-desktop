const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { ROOT_PATH } = require('./utils/index');
const { prod } = require('./utils/loaders');

const entry = path.resolve(ROOT_PATH, './src/index.tsx');

const outHtml = 'index.html';
const htmlTemplate = path.resolve(ROOT_PATH, './public/index.html');

const config = {
  mode: 'production',
  entry: entry,
  output: {
    path: path.resolve(ROOT_PATH, './build'),
    publicPath: './',
    filename: 'static/bundle-[contenthash].js',
    clean: true,
  },
  module: {
    rules: [...prod],
  },
  optimization: {
    minimize: true,
    nodeEnv: 'production',
    minimizer: [
      new TerserPlugin({
        // parallel: require('os').cpus().length, // 多线程并行构建
        parallel: false,
        extractComments: false,
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
          compress: {
            warnings: false, // 删除无用代码时是否给出警告
            drop_debugger: true, // 删除所有的debugger
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: outHtml,
      template: htmlTemplate,
      inject: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(ROOT_PATH, './public'),
          to: path.resolve(ROOT_PATH, './build'),
          globOptions: {
            ignore: ['**/index.html'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
    }),
    // copy wasm files of Web RTC SDK extension from node_modules
    new CopyPlugin({
      patterns: [
        // ai denoiser
        {
          from: path.resolve(ROOT_PATH, '../../node_modules/agora-extension-ai-denoiser/external'),
          to: path.resolve(ROOT_PATH, './build/extensions/ai-denoiser'),
          noErrorOnMissing: true,
        },
        //virtual background
        {
          from: path.resolve(
            ROOT_PATH,
            '../../node_modules/agora-extension-virtual-background/wasms',
          ),
          to: path.resolve(ROOT_PATH, './build/extensions/agora-extension-virtual-background'),
          noErrorOnMissing: true,
        },
      ],
    }),
    // new BundleAnalyzerPlugin(),
  ],
};

const mergedConfig = webpackMerge.merge(baseConfig, config);
module.exports = mergedConfig;
