'use strict';

describe('Controller: SectionCtrl', function () {

  // load the controller's module
  beforeEach(module('blogApp'));

  var SectionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SectionCtrl = $controller('SectionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SectionCtrl.awesomeThings.length).toBe(3);
  });
});
