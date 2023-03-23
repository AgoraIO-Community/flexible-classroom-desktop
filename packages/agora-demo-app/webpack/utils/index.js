const path = require('path');
const PUBLIC_PATH = path.resolve(__dirname, '../../', 'public');
const ROOT_PATH = path.resolve(__dirname, '../../');
const DEFAULT_PORT = 3000;
const ENTRY = process.env['FCR_ENTRY'];

module.exports = {
  PUBLIC_PATH,
  ROOT_PATH,
  DEFAULT_PORT,
  ENTRY
};
