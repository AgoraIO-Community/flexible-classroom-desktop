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

module.exports = { sdkDevEntry, sdkWebpackConfig };
