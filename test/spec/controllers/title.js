'use strict';

describe('Controller: TitleCtrl', function () {

  // load the controller's module
  beforeEach(module('blogApp'));

  var TitleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TitleCtrl = $controller('TitleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TitleCtrl.awesomeThings.length).toBe(3);
  });
});
