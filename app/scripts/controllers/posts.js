'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('PostsCtrl',['$scope', 'Post', 'Auth', '$location', function ($scope, Post, Auth, $location) {

    

    $scope.post = {url: 'http://'};

    Auth.checkUser();

    if(Auth.user.uid!==undefined)
    {
        console.log("Auth.user.uid", Auth.user.uid);
        $scope.profile = Auth.getProfile(Auth.user.uid);

        $scope.profile.$loaded(function(){
          Auth.updateConnection(Auth.user.uid);
        });
          
    } else
    {
      console.log("No estás logado");
      $location.path("/unlogged");
      return;
    }




    $scope.sections = [
      {
        title: 'Temas Generales',
        section: 'general',
        posts: Post.getHomeSection('general')
      },
      {
        title: 'Batallas',
        section: 'batallas',
        posts: Post.getHomeSection('batallas')
      },
      {
        title: 'Piratería',
        section: 'pirateria',
        posts: Post.getHomeSection('pirateria')
      },
      {
        title: 'Comercio',
        section: 'comercio',
        posts: Post.getHomeSection('comercio')
      },
      {
        title: 'Cultura',
        section: 'cultura',
        posts: Post.getHomeSection('cultura')
      },
      {
        title: 'Taberna',
        section: 'taberna',
        posts: Post.getHomeSection('taberna')
      }
    ];

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
    };

    $scope.fechar = function(milisecs)
     {
        var fecha = new Date(milisecs);
        return fecha;
     };

     $scope.open = function(post)
    {
        console.log("POST", post);
        Post.setState(post, true);
    };

    $scope.close = function(post)
    {
        Post.setState(post, false);
    };

    $scope.deletePost = function(post)
    {
        Post.delete(post);
    };
  }]);
