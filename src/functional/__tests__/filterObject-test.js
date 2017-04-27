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

'use strict';

jest.unmock('filterObject');

var filterObject = require('filterObject');

describe('filterObject', () => {
  var mockObject;
  var mockCallback;

  beforeEach(() => {
    mockObject = {
      foo: 1,
      bar: 2,
      baz: 3
    };
    mockCallback = jest.fn();
  });

  it('should accept null', () => {
    expect(filterObject(null, mockCallback)).toBeNull();
    expect(mockCallback).not.toBeCalled();
  });

  it('should return true to create copy', () => {
    var filtered = filterObject(mockObject, mockCallback.mockImplementation(
      () => true
    ));

    expect(filtered).not.toBe(mockObject);
    expect(filtered).toEqual(mockObject);
  });

  it('should return empty object for a falsey func', () => {
    var filtered = filterObject(mockObject, mockCallback.mockImplementation(
      () => false
    ));

    expect(filtered).toEqual({});
  });

  it('should filter based on value', () => {
    var filtered = filterObject(mockObject, mockCallback.mockImplementation(
      value => value > 1
    ));

    expect(filtered).toEqual({
      bar: 2,
      baz: 3
    });
  });

  it('should filter based on key', () => {
    var filtered = filterObject(mockObject, mockCallback.mockImplementation(
      (value, key) => key[0] === 'b'
    ));

    expect(filtered).toEqual({
      bar: 2,
      baz: 3
    });
  });
});
