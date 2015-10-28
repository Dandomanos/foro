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

    // $scope.posts = Post.all;
    // $scope.postGeneral = Post.getSection('general');
    // $scope.postGeneral.$loaded(function(){
    //   console.log("$scope.postGeneral", $scope.postGeneral);
    // });
    // console.log("POSTS", Post.all);
    // console.log("POST general", Post.all.general);

    $scope.post = {url: 'http://'};

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
        posts: Post.getSection('general')
      },
      {
        title: 'Batallas',
        section: 'batallas',
        posts: Post.getSection('batallas')
      },
      {
        title: 'Piratería',
        section: 'pirateria',
        posts: Post.getSection('pirateria')
      },
      {
        title: 'Comercio',
        section: 'comercio',
        posts: Post.getSection('comercio')
      },
      {
        title: 'Cultura',
        section: 'cultura',
        posts: Post.getSection('cultura')
      },
      {
        title: 'Taberna',
        section: 'taberna',
        posts: Post.getSection('taberna')
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
