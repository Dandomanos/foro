'use strict';

describe('Filter: hostnameFromUrl', function () {

  // load the filter's module
  beforeEach(module('blogApp'));

  // initialize a new instance of the filter before each test
  var hostnameFromUrl;
  beforeEach(inject(function ($filter) {
    hostnameFromUrl = $filter('hostnameFromUrl');
  }));

  it('should return the input prefixed with "hostnameFromUrl filter:"', function () {
    var text = 'angularjs';
    expect(hostnameFromUrl(text)).toBe('hostnameFromUrl filter: ' + text);
  });

});
