'use strict';

describe('Controller: UserdeletedCtrl', function () {

  // load the controller's module
  beforeEach(module('blogApp'));

  var UserdeletedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserdeletedCtrl = $controller('UserdeletedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserdeletedCtrl.awesomeThings.length).toBe(3);
  });
});
