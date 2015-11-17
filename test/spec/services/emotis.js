'use strict';

describe('Service: emotis', function () {

  // load the service's module
  beforeEach(module('blogApp'));

  // instantiate service
  var emotis;
  beforeEach(inject(function (_emotis_) {
    emotis = _emotis_;
  }));

  it('should do something', function () {
    expect(!!emotis).toBe(true);
  });

});
