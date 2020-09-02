/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule performanceNow
 * @typechecks
 */

const performance = require('performance');

const loadTime = Date.now();

/**
 * Detect if we can use `window.performance.now()` and gracefully fallback to
 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
 * because of Facebook's testing infrastructure.
 */
module.exports = performance.now
  ? () => performance.now()
  : () => Date.now() - loadTime;
