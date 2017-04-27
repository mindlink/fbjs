/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails oncall+jsinfra
 */

jest
  .unmock('sprintf');

const sprintf = require('sprintf');

describe('sprintf', function() {

  it('works with %s', function() {
    expect(sprintf('aaa %s bbb %s ccc', '111', '222'))
      .toBe('aaa 111 bbb 222 ccc');
  });

});
