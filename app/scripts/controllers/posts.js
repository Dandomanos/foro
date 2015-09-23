'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('PostsCtrl',['$scope', 'Post', 'Auth', function ($scope, Post, Auth) {

    $scope.posts = Post.all;
    $scope.postGeneral = Post.general;
    console.log("POSTS", Post.all);
    console.log("POST general", Post.all.general);

    $scope.post = {url: 'http://'};

    $scope.profile = Auth.getProfile(Auth.user.uid);

    /*
    $scope.submitPost = function() {
	  Post.create($scope.post).then(function(ref){
	  	// $scope.post = {url: 'http://', title:''};
	  	$location.path('/posts/'+ref.key());
	  });
    };
    */

    $scope.deletePost = function(post) {
    	Post.delete(post);
    };

    $scope.signedIn = function()
     {
         $scope.user = Auth.user;
        return Auth.signedIn();
        
     };

     $scope.isAdmin = function(){
      
       if($scope.profile)
       {
          if($scope.profile.rango==='admin')
          {
            return true;
          } else
          {
            return false;
          }
      }
    }
  }]);
