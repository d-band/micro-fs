const gs = require('glob-stream');

module.exports = (globs, options) => {
  const stream = gs(globs, options);
  return new Promise((resolve, reject) => {
    const list = [];
    const onData = v => list.push(v);
    const onEnd = (err) => {
      if (err) return reject(err);
      return resolve(list);
    };
    stream.on('data', onData);
    stream.on('end', onEnd);
    stream.on('error', onEnd);
    stream.on('close', onEnd);
  });
};
