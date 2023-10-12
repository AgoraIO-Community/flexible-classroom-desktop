const path = require('path');
const { exec, getCmdArgs } = require('./exec');
const { exists, remove, move } = require('./fs');

const run = async () => {
  const chalk = require('chalk');
  const { fetchPackages, copyEnv, installModules, buildPackages } = require('./link-and-build');

  const args = getCmdArgs();
  const installAll = args.includes('all');
  const skipEnv = args.includes('skip-env');

  if (installAll) {
    await fetchPackages([
      'agora-rte-sdk',
      'agora-edu-core',
      'agora-common-libs',
      'agora-classroom-sdk',
      'agora-proctor-sdk',
      'agora-plugin-gallery',
      'fcr-ui-scene',
      'fcr-ui-kit',
    ]);

    await installModules();

    await buildPackages([
      'agora-rte-sdk',
      'agora-edu-core',
      'agora-common-libs',
      'agora-plugin-gallery',
      'agora-classroom-sdk',
      'agora-proctor-sdk',
      'fcr-ui-scene',
    ]);
  } else {
    await fetchPackages([
      'agora-classroom-sdk',
      'agora-proctor-sdk',
      'agora-plugin-gallery',
      'fcr-ui-scene',
      'fcr-ui-kit',
    ]);

    await installModules();

    await buildPackages([
      'agora-plugin-gallery',
      'agora-classroom-sdk',
      'agora-proctor-sdk',
      'fcr-ui-scene',
    ]);
  }

  !skipEnv && (await copyEnv());

  console.log(chalk.green('You are all set! Now you can run `yarn dev` to start the demo server.'));
};


(async function() {
  if (!exists('node_modules/simple-git') || !exists('node_modules/chalk')) {
    console.log('Installing tools...');
    const projectRootPath = path.resolve(__dirname, '..');
    await exec(
      `npm install -g --no-package-lock --no-save --prefix=${projectRootPath} simple-git@3.15.1 chalk@4.1.2`,
    );
    
    const libPath = path.resolve(projectRootPath, 'lib');
    const nestNodeModulePath = path.resolve(projectRootPath, 'lib/node_modules');
    const nodeModulePath = path.resolve(projectRootPath, 'node_modules');
    if (exists(nestNodeModulePath)) {
      move(nestNodeModulePath, nodeModulePath);
      remove(libPath);
    }
    run();
  } else {
    run();
  }
})();
