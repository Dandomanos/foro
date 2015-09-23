'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:PostviewCtrl
 * @description
 * # PostviewCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('PostviewCtrl', ['$scope', '$routeParams', 'Post', function ($scope, $routeParams, Post) {
    $scope.post = Post.get($routeParams.postId, $routeParams.section);
  }]);
