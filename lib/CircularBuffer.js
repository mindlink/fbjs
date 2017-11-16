'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

var invariant = require('./invariant');

var CircularBuffer = function () {
  function CircularBuffer(size) {
    _classCallCheck(this, CircularBuffer);

    !(size > 0) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Buffer size should be a positive integer') : invariant(false) : void 0;
    this._size = size;
    this._head = 0;
    this._buffer = [];
  }

  CircularBuffer.prototype.write = function write(entry) {
    if (this._buffer.length < this._size) {
      this._buffer.push(entry);
    } else {
      this._buffer[this._head] = entry;
      this._head++;
      this._head %= this._size;
    }
    return this;
  };

  CircularBuffer.prototype.read = function read() {
    return this._buffer.slice(this._head).concat(this._buffer.slice(0, this._head));
  };

  CircularBuffer.prototype.clear = function clear() {
    this._head = 0;
    this._buffer = [];
    return this;
  };

  return CircularBuffer;
}();

module.exports = CircularBuffer;