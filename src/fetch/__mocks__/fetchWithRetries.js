/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

'use strict';

var Deferred = require.requireActual('Deferred');

function fetchWithRetries(...args): Promise {
  var deferred = new Deferred();
  fetchWithRetries.mock.calls.push(args);
  fetchWithRetries.mock.deferreds.push(deferred);
  return deferred.getPromise();
}

fetchWithRetries.mock = {
  calls: [],
  deferreds: [],
};

module.exports = fetchWithRetries;
