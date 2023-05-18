const path = require('path');
const webpack = require('webpack');
const webpackbar = require('webpackbar');
const eduCoreVersion = require('agora-edu-core/package.json').version;
const rteVersion = require('agora-rte-sdk/package.json').version;
const { base } = require('./utils/loaders');
const { ROOT_PATH, ALIAS } = require('./utils/index');

const classroomSdkVersion = require('agora-classroom-sdk/package.json').version;
const proctorSdkVersion = require('agora-proctor-sdk/package.json').version;
const demoVersion = require('../package.json').version;
module.exports = {
  externals: {
    'agora-electron-sdk': 'commonjs2 agora-electron-sdk',
    'agora-rdc-core': 'commonjs2 agora-rdc-core',
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@classroom': path.resolve(ROOT_PATH, '../agora-classroom-sdk/src/'),
      '@proctor': path.resolve(ROOT_PATH, '../agora-proctor-sdk/src/'),
      '@app': path.resolve(ROOT_PATH, 'src'),
      ...ALIAS,
    },
  },
  module: {
    unknownContextCritical: false,
    rules: [...base],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpackbar(),
    new webpack.DefinePlugin({
      RTE_SDK_VERSION: JSON.stringify(rteVersion),
      EDU_SDK_VERSION: JSON.stringify(eduCoreVersion),
      CLASSROOM_SDK_VERSION: JSON.stringify(classroomSdkVersion),
      PROCTOR_SDK_VERSION: JSON.stringify(proctorSdkVersion),
      DEMO_VERSION: JSON.stringify(demoVersion),
      BUILD_TIME: JSON.stringify(Date.now()),
      BUILD_COMMIT_ID: JSON.stringify(process.env.FCR_BUILD_COMMIT_ID),
    }),
  ],
  stats: {
    children: true,
  },
};
