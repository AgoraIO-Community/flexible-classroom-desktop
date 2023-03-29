const path = require('path');
const webpack = require('webpack');
const webpackbar = require('webpackbar');
const dotenv = require('dotenv-webpack');
const { ROOT_PATH } = require('./utils/index');

module.exports = {
  resolve: {
    alias: {
      '@app': path.resolve(ROOT_PATH, 'src'),
    },
  },
  plugins: [
    new dotenv({
      path: path.resolve(ROOT_PATH, '../../.env'),
    }),
    new webpackbar(),
  ],
  stats: {
    children: true,
  },
};
