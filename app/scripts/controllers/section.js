'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:SectionCtrl
 * @description
 * # SectionCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('SectionCtrl',['$scope', '$routeParams', 'Post', function ($scope, $routeParams, Post) {
  	$scope.section = $routeParams.section;
    $scope.posts = Post.section($scope.section);
    var returnTitle = function()
    {
    	switch($scope.section)
    	{
    		case "general":
    			console.log("Temas Generales case");
    			return "Temas Generales:";
    			break;
    		default:  return "Temas Generales:";
    	}
    };
    $scope.title = returnTitle();
    console.log("POST", $scope.posts);
  }]);
