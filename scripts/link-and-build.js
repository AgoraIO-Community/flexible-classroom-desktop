const { exec, question } = require('./exec');
const { copy, exists } = require('./fs');
const { initSubModules } = require('./git');
const path = require('path');
const chalk = require('chalk');

async function fetchPackages(packages) {
  try {
    console.log(chalk.yellowBright('Start fetching packages...'), chalk.yellow('['));
    for (const pkg of packages) {
      process.stdout.write(chalk.blue(`\tFetching ${pkg}...`));
      await initSubModules(`packages/${pkg}`);
      process.stdout.write(chalk.blue(`\r\tFetched ${pkg}.`));
      console.log('');
    }
    console.log(chalk.yellow(']'));
  } catch (e) {
    console.error(e);
    console.log(chalk.red('Failed to fetch packages, please try again.'));
    throw e;
  }
}

async function buildPackages(packages) {
  try {
    console.log(chalk.yellowBright('Building packages...'));
    const lernaPath = path.resolve(__dirname, '..', 'node_modules', '.bin', 'lerna');

    for (const pkg of packages) {
      const code = await exec(`${lernaPath} exec --scope=${pkg} yarn ci:build`);

      if (code) {
        throw new Error('Error building package: ', pkg);
      }
    }
  } catch (e) {
    console.error(e);
    console.log(chalk.red('Failed to build packages, please try again.'));
    throw e;
  }
}

async function installModules() {
  try {
    console.log(chalk.yellowBright('Installing node modules...'));
    const code = await exec(`yarn install --check-files`);

    if (code) {
      throw new Error('Error installing package');
    }
  } catch (e) {
    console.error(e);
    console.log(chalk.red('Failed to install modules, please try again.'));
    throw e;
  }
}

async function copyEnv() {
  const todo = () => {
    console.log(chalk.blue('Copy .env.example to .env'));
    copy('.env.example', '.env');
  };

  if (exists('.env')) {
    await question(
      `${chalk.yellow('.env')} existed, do you want to override it with ${chalk.yellow(
        '.env.example',
      )}? ${chalk.gray('[N/y]')}`,
      (answer) => {
        if (answer.toLowerCase() === 'y') {
          todo();
        }
      },
    );
  } else {
    todo();
  }

  return 0;
}

module.exports = {
  fetchPackages,
  installModules,
  buildPackages,
  copyEnv,
};
