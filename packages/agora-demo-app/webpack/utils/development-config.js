const fs = require('fs');
const path = require('path');
const { ENTRY, ROOT_PATH } = require('.');
const sdks = require('../../sdk.config');

const sdk = sdks.find(({ name }) => {
  return name === ENTRY;
});

if (!sdk) {
  throw new Error(`Cannot found [${ENTRY}] SDK in sdk.config.js`);
}

// check sdk config
if (!sdk.webpackConfig) {
  throw new Error(`Missing webpackConfig of [${ENTRY}] SDK in sdk.config.js`);
}

const sdkDevEntry = path.resolve(ROOT_PATH, 'src/dev', sdk.name);

const sdkWebpackConfig = require(path.resolve(ROOT_PATH, '../', sdk.webpackConfig));

let sdkDevServe = undefined;

if (sdk.assetsDir) {
  sdkDevServe = {
    directory: path.resolve(path.resolve(ROOT_PATH), '../', sdk.assetsDir),
    publicPath: '/',
  };
}

const libs = ['agora-rte-sdk', 'agora-edu-core'];

let devAlias = libs.reduce((prev, cur) => {
  const libName = cur;

  const libPath = path.resolve(ROOT_PATH, `../${libName}/src`);

  const libExists = fs.existsSync(libPath);

  if (libExists) {
    prev[libName] = libPath;
  }

  return prev;
}, {});

const commonLibsSrcPath = path.resolve(ROOT_PATH, `../agora-common-libs/src`);

if (fs.existsSync(commonLibsSrcPath)) {
  devAlias['agora-common-libs/lib'] = commonLibsSrcPath;
}

module.exports = { sdkDevEntry, sdkWebpackConfig, sdkDevServe, devAlias };
