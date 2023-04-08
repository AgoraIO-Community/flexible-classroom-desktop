const fs = require('fs');
const path = require('path');
const { ENTRY, ROOT_PATH } = require('.');
const sdks = require('../../sdk.config');
const loaders = require('./loaders');

let devEntry,
  devWebpackConfig,
  sdkDevServe,
  devRules = undefined;

let devAlias = {};

if (ENTRY === 'demo') {
  devEntry = path.resolve(ROOT_PATH, 'src/index');

  devRules = loaders.dev;

  devWebpackConfig = {};
} else {
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

  devEntry = path.resolve(ROOT_PATH, 'src/dev', sdk.name);

  devWebpackConfig = require(path.resolve(ROOT_PATH, '../', sdk.webpackConfig));

  devRules = loaders.devSdk;

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
}

module.exports = { devEntry, devWebpackConfig, sdkDevServe, devAlias, devRules };
