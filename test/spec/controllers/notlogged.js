'use strict';

describe('Controller: NotloggedCtrl', function () {

  // load the controller's module
  beforeEach(module('blogApp'));

  var NotloggedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotloggedCtrl = $controller('NotloggedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NotloggedCtrl.awesomeThings.length).toBe(3);
  });
});
