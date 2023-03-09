const childProcess = require('child_process');
const path = require('path');
const readline = require('readline');

/**
 * Execute a shell command.
 * @param {*} command
 */
function exec(command, { stdout, stderr } = { stdout: false, stderr: false }) {
  if (process.platform === 'win32') {
    // Windows OS
    const stream = childProcess.exec(command, {});

    return _handleOutput(stream, { stdout, stderr });
  } else {
    const stream = childProcess.exec(command, {});

    return _handleOutput(stream, { stdout, stderr });
  }
}

function _handleOutput(stream, { stdout, stderr }) {
  return new Promise((resolve, reject) => {
    var twirlTimer = (function () {
      var P = ['\\', '|', '/', '-'];
      var x = 0;
      return setInterval(function () {
        process.stdout.write('\r' + P[x++]);
        x &= 3;
      }, 250);
    })();
    stream.stdout.on('data', (data) => {
      if (stdout) {
        console.log(data.toString());
      }
    });

    stream.stderr.on('data', (data) => {
      if (stderr) {
        console.log(data.toString());
      }
    });

    stream.on('close', () => {
      clearInterval(twirlTimer);
      process.stdout.write('\r');
      resolve();
    });

    stream.on('error', (err) => {
      clearInterval(twirlTimer);
      process.stdout.write('\r');
      reject(err);
    });
  });
}

/**
 * Prompt a question and get a user input
 * @param {*} quest
 * @param {*} cb
 * @returns
 */
async function question(quest, cb) {
  return new Promise((r) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    rl.question(quest, (answer) => {
      try {
        cb(answer);
      } finally {
        rl.close();
        r();
      }
    });
  });
}

module.exports = {
  exec,
  question,
};
