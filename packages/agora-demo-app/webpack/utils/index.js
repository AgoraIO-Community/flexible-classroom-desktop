const path = require('path');
const fs = require('fs');
const ROOT_PATH = path.resolve(__dirname, '../../');
const DEFAULT_PORT = 3000;
const ENTRY = process.env['FCR_ENTRY'];

const locateEnvFile = () => {
  const demoEnvPath = path.resolve(ROOT_PATH, '../../.env');
  if (fs.existsSync(demoEnvPath)) {
    return demoEnvPath;
  }
  console.warn('cannot locate env path');
  return '.env';
};

const locateModule = (path) => {
  return require.resolve(path);
};

module.exports = {
  ROOT_PATH,
  DEFAULT_PORT,
  ENTRY,
  locateEnvFile,
  locateModule,
};
