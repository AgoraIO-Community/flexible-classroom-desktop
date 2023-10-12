const {
  createReadStream,
  readFileSync,
  writeFileSync,
  copyFileSync,
  renameSync,
  rmSync,
  existsSync,
} = require('fs');
const readline = require('readline');

/**
 * Iterate every line in the given file.
 * @param {*} filename
 */
function traverseLines(filename, cb) {
  return new Promise((r) => {
    const stream = createReadStream(filename, { encoding: 'utf-8' });

    const rl = readline.createInterface({
      input: stream,
    });

    let skip = 0;

    const skipLine = (step) => {
      skip = step;
    };

    rl.on('line', (line) => {
      if (skip > 0) {
        skip--;
      } else {
        cb(line, skipLine);
      }
    });

    rl.on('close', r);
  });
}

/**
 * Find and replace according to object in the given list.
 * @param {*} list
 */
function replaceInPlace(filename, list = []) {
  let content = readFileSync(filename, { encoding: 'utf-8' });

  list.forEach(({ find, replaceWith }) => {
    content = content.replace(find, replaceWith);
  });

  writeFileSync(filename, content, { encoding: 'utf-8' });
}

/**
 * Copy a file from srcPath to destPath
 * @param {*} srcPath
 * @param {*} destPath
 */
function copy(srcPath, destPath) {
  copyFileSync(srcPath, destPath);
}

/**
 * Move a file from oldPath to newPath
 * @param {*} oldPath
 * @param {*} newPath
 */
function move(oldPath, newPath) {
  renameSync(oldPath, newPath);
}

/**
 * Remove a file
 * @param {*} path
 */
function remove(path) {
  rmSync(path, { recursive: true, force: true });
}

/**
 * Whether the file exists
 * @param {*} path
 * @returns
 */
function exists(path) {
  return existsSync(path);
}

module.exports = {
  traverseLines,
  replaceInPlace,
  copy,
  move,
  remove,
  exists,
};
