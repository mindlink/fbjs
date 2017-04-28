/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is utility that hanlds onWheel events and calls provided wheel
 * callback with correct frame rate.
 *
 * @typechecks
 */

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var emptyFunction = require('./emptyFunction');
var normalizeWheel = require('./normalizeWheel');
var requestAnimationFramePolyfill = require('./requestAnimationFramePolyfill');

var ReactWheelHandler = function () {
  /**
   * onWheel is the callback that will be called with right frame rate if
   * any wheel events happened
   * onWheel should is to be called with two arguments: deltaX and deltaY in
   * this order
   */
  function ReactWheelHandler(
  /*function*/onWheel,
  /*boolean|function*/handleScrollX,
  /*boolean|function*/handleScrollY,
  /*?boolean|?function*/stopPropagation) {
    _classCallCheck(this, ReactWheelHandler);

    this._animationFrameID = null;
    this._deltaX = 0;
    this._deltaY = 0;
    this._didWheel = this._didWheel.bind(this);
    if (typeof handleScrollX !== 'function') {
      handleScrollX = handleScrollX ? emptyFunction.thatReturnsTrue : emptyFunction.thatReturnsFalse;
    }

    if (typeof handleScrollY !== 'function') {
      handleScrollY = handleScrollY ? emptyFunction.thatReturnsTrue : emptyFunction.thatReturnsFalse;
    }

    if (typeof stopPropagation !== 'function') {
      stopPropagation = stopPropagation ? emptyFunction.thatReturnsTrue : emptyFunction.thatReturnsFalse;
    }

    this._handleScrollX = handleScrollX;
    this._handleScrollY = handleScrollY;
    this._stopPropagation = stopPropagation;
    this._onWheelCallback = onWheel;
    this.onWheel = this.onWheel.bind(this);
  }

  ReactWheelHandler.prototype.onWheel = function onWheel( /*object*/event) {
    var normalizedEvent = normalizeWheel(event);
    var deltaX = this._deltaX + normalizedEvent.pixelX;
    var deltaY = this._deltaY + normalizedEvent.pixelY;
    var handleScrollX = this._handleScrollX(deltaX, deltaY);
    var handleScrollY = this._handleScrollY(deltaY, deltaX);
    if (!handleScrollX && !handleScrollY) {
      return;
    }

    this._deltaX += handleScrollX ? normalizedEvent.pixelX : 0;
    this._deltaY += handleScrollY ? normalizedEvent.pixelY : 0;
    event.preventDefault();

    var changed = void 0;
    if (this._deltaX !== 0 || this._deltaY !== 0) {
      if (this._stopPropagation()) {
        event.stopPropagation();
      }
      changed = true;
    }

    if (changed === true && this._animationFrameID === null) {
      this._animationFrameID = requestAnimationFramePolyfill(this._didWheel);
    }
  };

  ReactWheelHandler.prototype._didWheel = function _didWheel() {
    this._animationFrameID = null;
    this._onWheelCallback(this._deltaX, this._deltaY);
    this._deltaX = 0;
    this._deltaY = 0;
  };

  return ReactWheelHandler;
}();

module.exports = ReactWheelHandler;