const fs = require('fs');
const path = require('path');
const yazl = require('yazl');
const fsp = require('./fsp');
const glob = require('./glob');

exports.fsp = fsp;
exports.glob = glob;

const globWrap = (fn) => (src, dest, options) => {
  return glob(src, options).then((files) => {
    return Promise.all(files.map(file => {
      const relative = path.relative(file.base, file.path);
      const destPath = path.join(dest, relative);
      return fn(file.path, destPath);
    }));
  });
};

exports.copy = exports.cp = globWrap(fsp.copy);
exports.move = exports.mv = globWrap(fsp.move);

exports.delete = exports.rm = exports.del = (src, options) => {
  return glob(src, options).then((files) => {
    return files.reverse().reduce((p, file) => {
      return p.then(() => fsp.remove(file.path));
    }, Promise.resolve());
  });
};

exports.archive = exports.zip = (src, dest, options) => {
  options = Object.assign({}, options, { nodir: true });
  const zip = new yazl.ZipFile();
  return glob(src, options).then((files) => {
    files.forEach(file => {
      const relative = path.relative(file.base, file.path);
      zip.addFile(file.path, relative);
    });
    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(dest);
      stream.on('close', resolve);
      stream.on('error', reject);
      zip.outputStream.pipe(stream);
      zip.end();
    });
  });
};
