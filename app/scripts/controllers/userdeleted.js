'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:UserdeletedCtrl
 * @description
 * # UserdeletedCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('UserdeletedCtrl',['$scope', 'Title', function ($scope, Title) {
    
	Title.setTitle("Foro CAOS: Usuario Eliminado");
  }]);
