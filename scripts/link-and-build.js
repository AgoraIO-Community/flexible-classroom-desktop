const { exec, question } = require('./exec');
const { copy, exists } = require('./fs');
const { initSubModules } = require('./git');
const path = require('path');
const chalk = require('chalk');

async function fetchOpenSourcePackages() {
  try {
    console.log(chalk.yellowBright('Start fetching packages...'), chalk.yellow('['));
    process.stdout.write(chalk.blue('\tFetching agora-classroom-sdk...'));
    await initSubModules('packages/agora-classroom-sdk');
    process.stdout.write(chalk.blue('\r\tFetched agora-classroom-sdk.'));
    console.log('');
    process.stdout.write(chalk.blue('\tFetching agora-proctor-sdk...'));
    await initSubModules('packages/agora-proctor-sdk');
    process.stdout.write(chalk.blue('\r\tFetched agora-proctor-sdk.'));
    console.log('');
    process.stdout.write(chalk.blue('\tFetching agora-onlineclass-sdk...'));
    await initSubModules('packages/agora-onlineclass-sdk');
    process.stdout.write(chalk.blue('\r\tFetched agora-onlineclass-sdk.'));
    console.log('');
    process.stdout.write(chalk.blue('\tFetching agora-plugin-gallery...'));
    await initSubModules('packages/agora-plugin-gallery');
    process.stdout.write(chalk.blue('\r\tFetched agora-plugin-gallery.'));
    console.log('');
    process.stdout.write(chalk.blue('\tFetching agora-scenario-ui-kit...'));
    await initSubModules('packages/agora-scenario-ui-kit');
    process.stdout.write(chalk.blue('\r\tFetched agora-scenario-ui-kit.'));
    console.log('');
    console.log(chalk.yellow(']'));
  } catch (e) {
    console.error(e);
    console.log(chalk.red('Failed to fetch packages, please try again.'));
    return 1;
  }
  return 0;
}

async function fetchAllPackages() {
  try {
    console.log(
      chalk.yellowBright(
        'Start fetching all packages, make sure you have the access rights of theses repos...',
      ),
    );
    await initSubModules();
  } catch (e) {
    console.error(e);
    console.log(chalk.red('Failed to fetch packages, please try again.'));
    return 1;
  }

  return 0;
}
async function buildPackages() {
  try {
    console.log(chalk.yellowBright('Building packages...'));
    const lernaPath = path.resolve(__dirname, '..', 'node_modules', '.bin', 'lerna');

    await exec(`${lernaPath} exec --scope=agora-rte-sdk 'yarn ci:build'`);
    await exec(
      `${lernaPath} exec --scope=agora-edu-core 'yarn ci:build'`,
    );
    await exec(`${lernaPath} exec --scope=agora-common-libs 'yarn ci:build'`);
  } catch (e) {
    console.error(e);
    console.log(chalk.red('Failed to build packages, please try again.'));
    return 1;
  }

  return 0;
}

async function installModules() {
  try {
    console.log(chalk.yellowBright('Installing node modules...'));
    await exec(`yarn install --check-files`);
  } catch (e) {
    console.error(e);
    console.log(chalk.red('Failed to install modules, please try again.'));
    return 1;
  }

  return 0;
}

async function linkPackages() {
  try {
    console.log(chalk.yellowBright('Linking packages...'));
    await exec(`yarn bootstrap`);
  } catch (e) {
    console.error(e);
    console.log(chalk.red('Failed to link packages, please try again.'));
    return 1;
  }

  return 0;
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
  fetchAllPackages,
  fetchOpenSourcePackages,
  linkPackages,
  installModules,
  buildPackages,
  copyEnv,
};
