/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule removeFromArray
 * @typechecks
 * @flow
 */

/**
 * Removes an element from an array.
 */
function removeFromArray<T>(array: Array<T>, element: T): void {
  var index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

module.exports = removeFromArray;
