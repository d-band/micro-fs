const os = require('os');
const path = require('path');
const assert = require('assert');
const mfs = require('../lib');

const ROOT = path.join(os.tmpdir(), 'micro-fs');

describe('lib/index.js', function () {
  this.timeout(0);

  before(() => {
    return Promise.all([
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
  });

  after(() => {
    return mfs.delete('**', { cwd: ROOT });
  });

  it('test mfs.copy function', () => {
    return mfs.copy('a0/**/*', path.join(ROOT, 'a1'), {
      cwd: ROOT
    }).then(() => {
      return mfs.glob('a1/**/*', { cwd: ROOT });
    }).then(files => {
      assert.strictEqual(files.length, 11);
      return mfs.glob('a1/**/*.js', { cwd: ROOT });
    }).then(files => {
      assert.strictEqual(files.length, 3);
    });
  });

  it('test mfs.move function', () => {
    return mfs.move('a1/**/*', path.join(ROOT, 'a2'), {
      cwd: ROOT
    }).then(() => {
      return mfs.glob('a2/**/*', { cwd: ROOT });
    }).then(files => {
      assert.strictEqual(files.length, 11);
      return mfs.glob('a2/**/*.js', { cwd: ROOT });
    }).then(files => {
      assert.strictEqual(files.length, 3);
    });
  });

  it('test mfs.delete function', () => {
    return mfs.delete('a1/**/*', {
      cwd: ROOT
    }).then(() => {
      return mfs.glob('a1/**/*', { cwd: ROOT });
    }).then(files => {
      assert.strictEqual(files.length, 0);
    });
  });

  it('test mfs.delete files function', () => {
    return mfs.delete('a2/**/*.js', {
      cwd: ROOT,
      nodir: true
    }).then(() => {
      return mfs.glob('a2/**/*', { cwd: ROOT });
    }).then(files => {
      assert.strictEqual(files.length, 8);
    });
  });

  it('test mfs.archive files function', () => {
    return mfs.archive('a0/**/*', path.join(ROOT, 'a0.zip'), {
      cwd: ROOT
    }).then(() => {
      return mfs.glob('a0.zip', { cwd: ROOT });
    }).then(files => {
      assert.strictEqual(files.length, 1);
    });
  });
});
