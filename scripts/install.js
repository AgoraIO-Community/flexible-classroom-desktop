const { exec, getCmdArgs } = require('./exec');
const { exists } = require('./fs');

const run = async () => {
  const chalk = require('chalk');
  const {
    fetchAllPackages,
    fetchOpenSourcePackages,
    linkPackages,
    copyEnv,
    installModules,
    buildPackages,
  } = require('./link-and-build');

  const args = getCmdArgs();
  const installAll = args.includes('all');
  const skipEnv = args.includes('skip-env');
  let r = 0;
  if (installAll) {
    r = await fetchAllPackages();

    if (r) {
      return;
    }

    r = await installModules();

    if (r) {
      return;
    }

    r = await buildPackages();
  } else {
    r = await fetchOpenSourcePackages();

    if (r) {
      return;
    }

    r = await installModules();
  }

  if (r) {
    return;
  }

  !(await linkPackages()) && !skipEnv && (await copyEnv());

  console.log(chalk.green('You are all set! Now you can run `yarn dev` to start the demo server.'));
};

if (!exists('node_modules/simple-git') || !exists('node_modules/chalk')) {
  console.log('Installing tools...');
  exec(`npm install --no-package-lock --no-save --force simple-git chalk`).then(run);
} else {
  run();
}
