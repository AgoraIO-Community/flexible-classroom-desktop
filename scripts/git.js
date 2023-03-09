const simpleGit = require('simple-git');
const git = simpleGit.default();

async function initSubModules(moduleName) {
  if (moduleName) {
    await git.submoduleInit(moduleName);
    await git.submoduleUpdate(moduleName);
  } else {
    await git.submoduleInit();
    await git.submoduleUpdate();
  }
}

async function checkout(branchName) {
  await git.checkout(branchName);
}

module.exports = {
  initSubModules,
  checkout,
};
