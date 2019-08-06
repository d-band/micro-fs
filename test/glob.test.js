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

  it('test glob all', () => {
    return mfs.glob('a0/**/*', {
      cwd: ROOT
    }).then(files => {
      assert.strictEqual(files.length, 11);
    });
  });

  it('test glob files', () => {
    return mfs.glob('a0/**/*.js', {
      cwd: ROOT
    }).then(files => {
      assert.strictEqual(files.length, 3);
    });
  });

  it('test glob dirs', () => {
    return mfs.glob('a0/**/*/', {
      cwd: ROOT
    }).then(files => {
      assert.strictEqual(files.length, 6);
    });
  });

  it('test glob array', () => {
    return mfs.glob(['a0/**/*.js', 'a0/**/*.css'], {
      cwd: ROOT
    }).then(files => {
      assert.strictEqual(files.length, 5);
    });
  });

  it('test glob error', () => {
    return mfs.glob('a100', {
      cwd: ROOT
    }).then(() => {
      assert.fail();
    }).catch(() => {
      assert.ok(true);
    });
  });
});
