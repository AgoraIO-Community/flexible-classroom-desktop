const childProcess = require('child_process');
const readline = require('readline');

/**
 * Execute a shell command.
 * @param {*} command
 */
function exec(command, { stdout, stderr } = { stdout: true, stderr: true }) {
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
  const args = getCmdArgs();
  const disableLoading = args.includes('disable-loading');
  return new Promise((resolve, reject) => {
    let twirlTimer = 0;
    if (!disableLoading) {
      twirlTimer = (function () {
        var P = ['\\', '|', '/', '-'];
        var x = 0;
        return setInterval(function () {
          process.stdout.write('\r' + P[x++]);
          x &= 3;
        }, 250);
      })();
    }

    stream.stdout.on('data', (data) => {
      if (stdout) {
        console.log(data.toString());
      }
    });

    stream.stderr.on('data', (data) => {
      if (stderr) {
        console.error(data.toString());
      }
    });

    stream.on('close', () => {
      clearInterval(twirlTimer);
      process.stdout.write('\r');
      resolve(stream.exitCode);
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

const getCmdArgs = () => {
  const [cmd, path, ...others] = process.argv;
  return others;
};

module.exports = {
  exec,
  question,
  getCmdArgs,
};
