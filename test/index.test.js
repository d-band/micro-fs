const path = require('path');
const assert = require('assert');
const mfs = require('../lib');
const { ROOT, init, clean } = require('./utils');

describe('lib/index.js', function () {
  this.timeout(0);

  before(() => init());
  after(() => clean());

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
