const fs = require('fs');
const path = require('path');
const { promisify } = require('es6-promisify');

const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const rmdir = promisify(fs.rmdir);
const copyFile = promisify(fs.copyFile);
const rename = promisify(fs.rename);
const unlink = promisify(fs.unlink);
const mkdirp = src => mkdir(src, { recursive: true });

const wrap = fn => (src, dest) => {
  return stat(src).then(stats => {
    if (stats.isDirectory()) {
      return mkdirp(dest);
    } else {
      const dir = path.dirname(dest);
      return mkdirp(dir).then(() => fn(src, dest));
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
  mkdirp: mkdirp,
  rmdir: rmdir,
  remove: remove,
  copy: wrap(copyFile),
  move: wrap(rename),
  write: promisify(fs.writeFile),
  read: promisify(fs.readFile)
};
