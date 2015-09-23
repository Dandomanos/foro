'use strict';

describe('Controller: PostviewCtrl', function () {

  // load the controller's module
  beforeEach(module('blogApp'));

  var PostviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PostviewCtrl = $controller('PostviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PostviewCtrl.awesomeThings.length).toBe(3);
  });
});
