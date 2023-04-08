/**
 * SDK definitions
 * Description:
 *  name: SDK package name
 *  webpackConfig: SDK webpack config path, relative to packages directory
 */
module.exports = [
  {
    name: 'classroom',
    webpackConfig: 'agora-classroom-sdk/webpack/webpack.dev.js',
    sources: {
      'agora-rte-sdk': 'src',
      'agora-edu-core': 'src',
      'agora-common-libs/lib': 'src',
      'agora-classroom-sdk': 'src/infra/api',
    },
  },
  {
    name: 'proctor',
    webpackConfig: 'agora-proctor-sdk/webpack/webpack.dev.js',
    sources: {
      'agora-rte-sdk': 'src',
      'agora-edu-core': 'src',
      'agora-common-libs/lib': 'src',
      'agora-proctor-sdk': 'src/infra/api',
    },
  },
  {
    name: 'onlineclass',
    webpackConfig: 'agora-onlineclass-sdk/webpack/webpack.dev.js',
    sources: {
      'agora-rte-sdk': 'src',
      'agora-edu-core': 'src',
      'agora-common-libs/lib': 'src',
      'agora-onlineclass-sdk': 'src',
    },
    assetsDir: 'agora-onlineclass-sdk/src/resources',
  },
];
