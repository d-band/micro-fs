const os = require('os');
const path = require('path');
const mfs = require('../lib');

const ROOT = path.join(os.tmpdir(), 'micro-fs');

exports.ROOT = ROOT;
exports.init = () => Promise.all([
  mfs.fsp.mkdirp(path.join(ROOT, 'a0/b0/c0')),
  mfs.fsp.mkdirp(path.join(ROOT, 'a0/b0/c1')),
  mfs.fsp.mkdirp(path.join(ROOT, 'a0/b1/c0')),
  mfs.fsp.mkdirp(path.join(ROOT, 'a0/b1/c1'))
]).then(() => {
  return Promise.all([
    mfs.fsp.write(path.join(ROOT, 'a0/d.js'), 'data: a0/d.js'),
    mfs.fsp.write(path.join(ROOT, 'a0/d.css'), 'data: a0/d.css'),
    mfs.fsp.write(path.join(ROOT, 'a0/b0/d.js'), 'data: a0/b0/d.js'),
    mfs.fsp.write(path.join(ROOT, 'a0/b1/d.css'), 'data: a0/b0/d.css'),
    mfs.fsp.write(path.join(ROOT, 'a0/b1/c1/d.js'), 'a1/b1/c1/d.js')
  ]);
});
exports.clean = () => mfs.delete('**', { cwd: ROOT });
