const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('agora-common-libs/presets/webpack.config.base.js');
const ROOT_PATH = path.resolve(__dirname, './');
const dotenv = require('dotenv-webpack');
const { locateEnvFile } = require('./webpack/utils/index');
const entry = path.resolve(ROOT_PATH, './src/index.tsx');
const version = require('./package.json').version;
const outHtml = 'index.html';
const htmlTemplate = path.resolve(ROOT_PATH, './public/index.html');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  entry: entry,
  output: {
    path: path.resolve(ROOT_PATH, './build'),
    publicPath: './',
    filename: 'static/bundle-[name]-[contenthash].js',
    clean: true,
  },
  resolve: {
    alias: {
      '@app': path.resolve(ROOT_PATH, './src'),
      '@ui-kit-utils': path.resolve(ROOT_PATH, '../fcr-ui-kit/src/utils'),
    },
  },
  module: {
    unknownContextCritical: false,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: /widget/,
      }),
    ],

    splitChunks: {
      cacheGroups: {
        scene_widget: {
          test: /scene_widget/,
          name: 'scene_widget',
          chunks: 'all',
        },
        proctor_widget: {
          test: /proctor_widget/,
          name: 'proctor_widget',
          chunks: 'all',
        },
        edu_widget: {
          test: /edu_widget/,
          name: 'edu_widget',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new dotenv({
      path: locateEnvFile(),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: outHtml,
      template: htmlTemplate,
      inject: true,
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
      DEMO_VERSION: JSON.stringify(version),
    }),
    // copy wasm files of Web RTC SDK extension from node_modules
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
