const path = require('path');
const assert = require('assert');
const mkdir = require('../lib/mkdir');
const { ROOT, init, clean } = require('./utils');

describe('lib/mkdir.js', function () {
  this.timeout(0);

  before(() => init());
  after(() => clean());

  it('mkdir error exist', () => {
    return mkdir(path.join(ROOT, 'a0/d.js')).then(() => {
      assert.fail();
    }).catch(e => {
      assert.ok(/ENOTDIR|EEXIST/.test(e.code));
    });
  });

  it('mkdir error notdir', () => {
    return mkdir(path.join(ROOT, 'a0/d.js/e')).then(() => {
      assert.fail();
    }).catch(e => {
      assert.ok(/ENOTDIR|EEXIST/.test(e.code));
    });
  });
});
