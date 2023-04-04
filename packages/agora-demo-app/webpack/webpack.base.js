const path = require('path');
const webpackbar = require('webpackbar');
const dotenv = require('dotenv-webpack');
const { ROOT_PATH, locateEnvFile } = require('./utils/index');

module.exports = {
  resolve: {
    alias: {
      '@app': path.resolve(ROOT_PATH, 'src'),
      'agora-plugin-gallery': path.resolve(ROOT_PATH, '../agora-plugin-gallery/src'),
      'agora-classroom-sdk': path.resolve(ROOT_PATH, '../agora-classroom-sdk/src/infra/api'),
      'agora-proctor-sdk': path.resolve(ROOT_PATH, '../agora-proctor-sdk/src/infra/api'),
      'agora-onlineclass-sdk': path.resolve(ROOT_PATH, '../agora-onlineclass-sdk/src'),
    },
  },
  plugins: [
    new dotenv({
      path: locateEnvFile(),
    }),
    new webpackbar(),
  ],
  stats: {
    children: true,
  },
};
