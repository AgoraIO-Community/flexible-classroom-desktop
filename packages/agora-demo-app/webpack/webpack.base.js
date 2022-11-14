const path = require('path');
const webpack = require('webpack');
const webpackbar = require('webpackbar');
const eduCoreVersion = require('agora-edu-core/package.json').version;
const rteVersion = require('agora-rte-sdk/package.json').version;
const baseClassroomConfig = require('agora-classroom-sdk/webpack/webpack.base');
const baseProctorConfig = require('agora-proctor-sdk/webpack/webpack.base');
const { base } = require('./utils/loaders');
const { ALIAS } = require('./utils/index');

const classroomSdkVersion = require('agora-classroom-sdk/package.json').version;
const proctorSdkVersion = require('agora-proctor-sdk/package.json').version;

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
      ...baseClassroomConfig.resolve.alias,
      ...baseProctorConfig.resolve.alias,
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
      BUILD_TIME: JSON.stringify(Date.now()),
      BUILD_COMMIT_ID: JSON.stringify(process.env.FCR_BUILD_COMMIT_ID),
    }),
  ],
  stats: {
    children: true,
  },
};
