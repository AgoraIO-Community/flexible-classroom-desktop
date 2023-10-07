const fs = require('fs');
const path = require('path');
const { ENTRY, ROOT_PATH } = require('.');
const sdks = require('../../sdk.config');

let devEntry,
  devWebpackConfig,
  sdkDevServe,
  devRules = undefined;

let devAlias = {};

if (ENTRY === 'demo') {
  devEntry = path.resolve(ROOT_PATH, 'src/index');

  devWebpackConfig = {};
} else {
  const sdk = sdks.find(({ name }) => {
    return name === ENTRY;
  });

  if (!sdk) {
    throw new Error(`Cannot found [${ENTRY}] SDK in sdk.config.js`);
  }

  // check sdk config
  // if (!sdk.webpackConfig) {
  //   throw new Error(`Missing webpackConfig of [${ENTRY}] SDK in sdk.config.js`);
  // }

  devEntry = path.resolve(ROOT_PATH, 'src/dev', sdk.name);

  // devWebpackConfig = require(path.resolve(ROOT_PATH, '../', sdk.webpackConfig));

  // devRules = loaders.devSdk;

  if (sdk.assetsDir) {
    sdkDevServe = {
      directory: path.resolve(path.resolve(ROOT_PATH), '../', sdk.assetsDir),
      publicPath: '/',
    };
  }

  devAlias = Object.entries(sdk.sources).reduce((prev, [requirePath, resolvePath]) => {
    const libName = requirePath.split('/')[0];

    const libPath = path.resolve(ROOT_PATH, `../${libName}/${resolvePath}`);

    const libExists = fs.existsSync(libPath);

    if (libExists) {
      prev[requirePath] = libPath;
    }

    return prev;
  }, {});
  devAlias = Object.assign(devAlias, sdk.alias);
}

module.exports = { devEntry, devWebpackConfig, sdkDevServe, devAlias, devRules };
