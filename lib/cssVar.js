'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var fbCSSVars = require('fbjs-css-vars');
var invariant = require('./invariant');

/**
 * @param {string} name
 */
function cssVar(name) {
  !Object.prototype.hasOwnProperty.call(fbCSSVars, name) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Unknown key passed to cssVar: %s.', name) : invariant(false) : void 0;

  return fbCSSVars[name];
}

module.exports = cssVar;