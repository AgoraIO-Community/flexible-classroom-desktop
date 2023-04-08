const path = require('path');
const webpack = require('webpack');
const webpackbar = require('webpackbar');
const dotenv = require('dotenv-webpack');
const { ROOT_PATH, locateEnvFile } = require('./utils/index');
const classroomPkg = require('../../agora-classroom-sdk/package.json');
const proctorPkg = require('../../agora-proctor-sdk/package.json');
const onlineclassPkg = require('../../agora-onlineclass-sdk/package.json');

module.exports = {
  externals: {
    'agora-electron-sdk': 'commonjs2 agora-electron-sdk',
    'agora-rdc-core': 'commonjs2 agora-rdc-core',
  },
  resolve: {
    alias: {
      '@app': path.resolve(ROOT_PATH, 'src'),
      '@components': path.resolve(ROOT_PATH, '../agora-scenario-ui-kit/src/components'),
      '@ui-kit-utils': path.resolve(ROOT_PATH, '../agora-scenario-ui-kit/src/utils'),
      'agora-plugin-gallery': path.resolve(ROOT_PATH, '../agora-plugin-gallery/src'),
    },
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new dotenv({
      path: locateEnvFile(),
    }),
    new webpackbar(),
    new webpack.DefinePlugin({
      CLASSROOM_SDK_VERSION: JSON.stringify(classroomPkg.version),
      PROCTOR_SDK_VERSION: JSON.stringify(proctorPkg.version),
      ONLINECLASS_SDK_VERSION: JSON.stringify(onlineclassPkg.version),
    }),
  ],
  stats: {
    children: true,
  },
};
