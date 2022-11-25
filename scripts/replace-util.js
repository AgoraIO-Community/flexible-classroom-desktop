const { readFileSync, writeFileSync } = require('fs');

function replaceInPlace(list = []) {
  const filename = '.gitmodules';

  let content = readFileSync(filename, { encoding: 'utf-8' });

  list.forEach(({ find, replaceWith }) => {
    content = content.replace(find, replaceWith);
  });

  writeFileSync(filename, content, { encoding: 'utf-8' });
}

replaceInPlace([{ find: 'apaas-widgets-web.git', replaceWith: 'open-apaas-widgets-web.git' }]);
