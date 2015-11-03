'use strict';

describe('Filter: parseUrl', function () {

  // load the filter's module
  beforeEach(module('blogApp'));

  // initialize a new instance of the filter before each test
  var parseUrl;
  beforeEach(inject(function ($filter) {
    parseUrl = $filter('parseUrl');
  }));

  it('should return the input prefixed with "parseUrl filter:"', function () {
    var text = 'angularjs';
    expect(parseUrl(text)).toBe('parseUrl filter: ' + text);
  });

});
