'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  	.controller('ProfileCtrl', ['$scope', '$routeParams', 'Post', 'Auth', function ($scope, $routeParams, Post, Auth) {
 	$scope.profile = Auth.getProfile($routeParams.uid);
 	console.log("Profile uid", $routeParams.uid);
 	console.log("Auth uid", Auth.user.uid);

 	$scope.canEdit = function()
 	{
 		if($routeParams.uid===Auth.user.uid)
 		{
 			return true;
 		} else
 		{
 			return false;
 		}
 	}
  }]);
