'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('LoginCtrl',['$scope', 'Auth', function ($scope, Auth) {

  	$scope.login = function()
  	{
  	Auth.login($scope.user);
  	};
   
  }]);
