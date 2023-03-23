/**
 * SDK definitions
 * Description:
 *  name: SDK package name
 *  webpackConfig: SDK webpack config path, relative to packages directory
 */
module.exports = [
  {
    name: 'classroom',
    webpackConfig: 'agora-classroom-sdk/webpack/webpack.base.js',
  },
  {
    name: 'proctor',
    webpackConfig: 'agora-proctor-sdk/webpack/webpack.base.js',
  },
  {
    name: 'onlineclass',
    webpackConfig: 'agora-onlineclass-sdk/webpack/webpack.dev.js',
  },
];
