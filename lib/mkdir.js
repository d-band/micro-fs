const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);

function exists (p) {
  return path.dirname(p) === p || fs.existsSync(p);
}

module.exports = async (p, opts) => {
  opts = Object.assign({
    mode: 0o777 & (~process.umask())
  }, opts);
  let cur = p;
  const stack = [];
  while (!exists(cur)) {
    stack.push(cur);
    cur = path.dirname(cur);
  }
  if (stack.length === 0) {
    stack.push(p);
  }

  while (stack.length) {
    cur = stack.pop();
    try {
      await mkdir(cur, opts.mode);
    } catch (err) {
      const stats = await stat(cur);
      if (!stats.isDirectory()) {
        throw err;
      }
    }
  }
};
