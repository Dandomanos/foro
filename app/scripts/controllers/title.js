'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:TitleCtrl
 * @description
 * # TitleCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('TitleCtrl', ['$scope', 'Title', function ($scope, Title) {
   	$scope.title="Foro CAOS";

   	Title.setTitle($scope.title);
  }]);
