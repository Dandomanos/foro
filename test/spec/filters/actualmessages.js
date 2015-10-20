'use strict';

describe('Filter: actualMessages', function () {

  // load the filter's module
  beforeEach(module('blogApp'));

  // initialize a new instance of the filter before each test
  var actualMessages;
  beforeEach(inject(function ($filter) {
    actualMessages = $filter('actualMessages');
  }));

  it('should return the input prefixed with "actualMessages filter:"', function () {
    var text = 'angularjs';
    expect(actualMessages(text)).toBe('actualMessages filter: ' + text);
  });

});
