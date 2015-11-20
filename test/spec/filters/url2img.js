'use strict';

describe('Filter: url2img', function () {

  // load the filter's module
  beforeEach(module('blogApp'));

  // initialize a new instance of the filter before each test
  var url2img;
  beforeEach(inject(function ($filter) {
    url2img = $filter('url2img');
  }));

  it('should return the input prefixed with "url2img filter:"', function () {
    var text = 'angularjs';
    expect(url2img(text)).toBe('url2img filter: ' + text);
  });

});
