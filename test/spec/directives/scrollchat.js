'use strict';

describe('Directive: scrollChat', function () {

  // load the directive's module
  beforeEach(module('blogApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<scroll-chat></scroll-chat>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scrollChat directive');
  }));
});
