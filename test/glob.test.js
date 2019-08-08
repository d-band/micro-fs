const assert = require('assert');
const glob = require('../lib/glob');
const { ROOT, init, clean } = require('./utils');

describe('lib/glob.js', function () {
  this.timeout(0);

  before(() => init());
  after(() => clean());

  it('test glob all', () => {
    return glob('a0/**/*', {
      cwd: ROOT
    }).then(files => {
      assert.strictEqual(files.length, 11);
    });
  });

  it('test glob files', () => {
    return glob('a0/**/*.js', {
      cwd: ROOT
    }).then(files => {
      assert.strictEqual(files.length, 3);
    });
  });

  it('test glob dirs', () => {
    return glob('a0/**/*/', {
      cwd: ROOT
    }).then(files => {
      assert.strictEqual(files.length, 6);
    });
  });

  it('test glob array', () => {
    return glob(['a0/**/*.js', 'a0/**/*.css'], {
      cwd: ROOT
    }).then(files => {
      assert.strictEqual(files.length, 5);
    });
  });

  it('test glob error', () => {
    return glob('a100', {
      cwd: ROOT
    }).then(() => {
      assert.fail();
    }).catch(() => {
      assert.ok(true);
    });
  });
});
