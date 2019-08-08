const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const mkdir = require('./mkdir');

const stat = promisify(fs.stat);
const rmdir = promisify(fs.rmdir);
const copyFile = promisify(fs.copyFile);
const rename = promisify(fs.rename);
const unlink = promisify(fs.unlink);

const wrap = fn => (src, dest) => {
  return stat(src).then(stats => {
    if (stats.isDirectory()) {
      return mkdir(dest);
    } else {
      const dir = path.dirname(dest);
      return mkdir(dir).then(() => fn(src, dest));
    }
  });
};

const remove = (src) => {
  return stat(src).then(stats => {
    if (stats.isDirectory()) {
      return rmdir(src);
    } else {
      return unlink(src);
    }
  });
};

module.exports = {
  stat: stat,
  mkdir: mkdir,
  mkdirp: mkdir,
  rmdir: rmdir,
  remove: remove,
  copy: wrap(copyFile),
  move: wrap(rename),
  write: promisify(fs.writeFile),
  read: promisify(fs.readFile)
};
