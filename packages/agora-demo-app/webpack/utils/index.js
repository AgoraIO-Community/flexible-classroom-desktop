const path = require('path');
const fs = require('fs');
const PUBLIC_PATH = path.resolve(__dirname, '../../', 'public');
const ROOT_PATH = path.resolve(__dirname, '../../');
const DEFAULT_PORT = 3000;

const libs = {
  'agora-rte-sdk': '../agora-rte-sdk/src',
  'agora-edu-core': '../agora-edu-core/src',
  'agora-common-libs': '../agora-common-libs/src',
  'agora-classroom-sdk': '../agora-classroom-sdk/src/infra/api',
  'agora-proctor-sdk': '../agora-proctor-sdk/src/infra/api',
};

let ALIAS = {};

// only load from source in development env
if (process.env.NODE_ENV === 'development') {
  ALIAS = Object.keys(libs).reduce((prev, cur) => {
    const libName = cur;

    const libPath = path.resolve(ROOT_PATH, libs[libName]);

    const libExists = fs.existsSync(libPath);

    if (libExists) {
      prev[libName] = libPath;
    }

    return prev;
  }, {});
}

module.exports = {
  PUBLIC_PATH,
  ROOT_PATH,
  DEFAULT_PORT,
  ALIAS,
};
