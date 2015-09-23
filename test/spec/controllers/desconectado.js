'use strict';

describe('Controller: DesconectadoCtrl', function () {

  // load the controller's module
  beforeEach(module('blogApp'));

  var DesconectadoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DesconectadoCtrl = $controller('DesconectadoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DesconectadoCtrl.awesomeThings.length).toBe(3);
  });
});
