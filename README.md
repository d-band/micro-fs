micro-fs
========

> File system and globbing utilities

[![NPM version](https://img.shields.io/npm/v/micro-fs.svg)](https://www.npmjs.com/package/micro-fs)
[![NPM downloads](https://img.shields.io/npm/dm/micro-fs.svg)](https://www.npmjs.com/package/micro-fs)
[![Build Status](https://travis-ci.org/d-band/micro-fs.svg?branch=master)](https://travis-ci.org/d-band/micro-fs)
[![Coverage Status](https://coveralls.io/repos/github/d-band/micro-fs/badge.svg?branch=master)](https://coveralls.io/github/d-band/micro-fs?branch=master)
[![Dependency Status](https://david-dm.org/d-band/micro-fs.svg)](https://david-dm.org/d-band/micro-fs)
[![Greenkeeper badge](https://badges.greenkeeper.io/d-band/micro-fs.svg)](https://greenkeeper.io/)

---

## Install

```bash
$ npm install micro-fs -S
```

## Usage

```js
const mfs = require('micro-fs');

mfs.copy('src/**/*.js', 'lib').then(() => {
  console.log('copy done.');
});

mfs.move('src/**/*.js', 'lib').then(() => {
  console.log('move done.');
});

mfs.delete('dist/**').then(() => {
  console.log('delete done.');
});

mfs.zip('src/**/*.js', 'source.zip').then(() => {
  console.log('archive done.');
});

mfs.glob('src/**/*.js', options).then(files => {
  console.log(files);
  /**
   * [{ cwd, base, path }]
   */
});
```

## API

- `mfs.copy(src, dest, options) => Promise`
- `mfs.move(src, dest, options) => Promise`
- `mfs.zip(src, dest, options) => Promise`
- `mfs.glob(src, options) => Promise`
- `mfs.delete(src, options) => Promise`

> `src` is globs and `options` are documented in [glob-stream](https://www.npmjs.com/package/glob-stream).

## Report a issue

* [All issues](https://github.com/d-band/micro-fs/issues)
* [New issue](https://github.com/d-band/micro-fs/issues/new)

## License

micro-fs is available under the terms of the MIT License.
