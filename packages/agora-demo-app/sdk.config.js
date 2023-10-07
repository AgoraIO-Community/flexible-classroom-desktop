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
    alias: {
      '@classroom': path.resolve(ROOT_PATH, '../agora-classroom-sdk/src'),
    },
    sources: {
      'agora-rte-sdk/lib': 'src',
      'agora-rte-sdk': 'src',
      'agora-edu-core/lib': 'src',
      'agora-edu-core': 'src',
      'agora-common-libs/presets': 'presets',
      'agora-common-libs': 'src',
      'agora-classroom-sdk': 'src/infra/api',
      'agora-plugin-gallery/classroom': 'src/classroom.tsx',
    },
  },
  {
    name: 'proctor',
    alias: {
      '@proctor': path.resolve(ROOT_PATH, '../agora-proctor-sdk/src'),
    },
    sources: {
      'agora-rte-sdk/lib': 'src',
      'agora-rte-sdk': 'src',
      'agora-edu-core/lib': 'src',
      'agora-edu-core': 'src',
      'agora-common-libs/presets': 'presets',
      'agora-common-libs': 'src',
      'agora-proctor-sdk': 'src/infra/api',
      'agora-plugin-gallery/proctor': 'src/proctor.tsx',
    },
  },
  {
    name: 'scene',
    alias: {
      '@ui-scene': path.resolve(ROOT_PATH, '../fcr-ui-scene/src'),
      '@components': path.resolve(ROOT_PATH, '../fcr-ui-kit/src/components'),
      '@res': path.resolve(ROOT_PATH, '../fcr-ui-scene/src/resources'),
    },
    sources: {
      'agora-rte-sdk/lib': 'src',
      'agora-rte-sdk': 'src',
      'agora-edu-core/lib': 'src',
      'agora-edu-core': 'src',
      'agora-common-libs/presets': 'presets',
      'agora-common-libs': 'src',
      'fcr-ui-scene': 'src',
      'agora-plugin-gallery/scene': 'src/scene.tsx',
    },
    assetsDir: 'fcr-ui-scene/src/resources',
  },
];
