/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @typechecks static-only
 */

'use strict';

/**
 * Combines multiple className strings into one.
 */

function joinClasses(className) {
  var newClassName = className || '';
  var argLength = arguments.length;

  if (argLength > 1) {
    for (var index = 1; index < argLength; index++) {
      var nextClass = arguments[index];
      if (nextClass) {
        newClassName = (newClassName ? newClassName + ' ' : '') + nextClass;
      }
    }
  }
  return newClassName;
}

module.exports = joinClasses;