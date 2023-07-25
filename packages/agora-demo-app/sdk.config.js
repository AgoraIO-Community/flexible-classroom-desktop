/**
 * SDK definitions
 * Description:
 *  name: SDK package name
 *  webpackConfig: SDK webpack config path, relative to packages directory
 */
const path = require('path');
const ROOT_PATH = path.resolve(__dirname, './');
module.exports = [
  {
    name: 'classroom',
    sources: {
      'agora-rte-sdk': 'src',
      'agora-edu-core': 'src',
      'agora-common-libs/lib': 'src',
      'agora-classroom-sdk': 'src/infra/api',
    },
  },
  {
    name: 'proctor',
    sources: {
      'agora-rte-sdk': 'src',
      'agora-edu-core': 'src',
      'agora-common-libs/lib': 'src',
      'agora-proctor-sdk': 'src/infra/api',
    },
  },
  {
    name: 'onlineclass',
    alias: {
      '@onlineclass': path.resolve(ROOT_PATH, '../agora-onlineclass-sdk/src'),
      '@components': path.resolve(ROOT_PATH, '../agora-scenario-ui-kit/src/components'),
      '@res': path.resolve(ROOT_PATH, '../agora-onlineclass-sdk/src/resources'),
    },
    sources: {
      'agora-rte-sdk/lib': 'src',
      'agora-rte-sdk': 'src',
      'agora-edu-core/lib': 'src',
      'agora-edu-core': 'src',
      'agora-common-libs/lib': 'src',
      'agora-onlineclass-sdk': 'src',
      'agora-plugin-gallery/onlineclass': 'src/onlineclass.tsx',
    },
    assetsDir: 'agora-onlineclass-sdk/src/resources',
  },
];
