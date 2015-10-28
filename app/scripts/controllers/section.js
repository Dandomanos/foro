'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:SectionCtrl
 * @description
 * # SectionCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('SectionCtrl',['$scope', '$routeParams', 'Post', 'Auth', '$location', function ($scope, $routeParams, Post, Auth, $location) {
    if(Auth.user.uid===undefined)
    {
      console.log("No estás logado");
      $location.path("/unlogged");
      return;
    }

    
  	$scope.section = $routeParams.section;
    $scope.profile = Auth.getProfile(Auth.user.uid);
    $scope.posts = Post.section($scope.section);

    $scope.profile.$loaded(function(){
      Auth.updateConnection(Auth.user.uid);
    });
    // $scope.post = {comments: '', author:'', title: '', section:$scope.section, sectionTittle:returnTitle() };
    
    var returnTitle = function()
    {
    	switch($scope.section)
    	{
    		case "general":
    			return "Temas Generales";

            case "batallas":
                return "Batallas";

            case "pirateria":
                
                return "Piratería";

            case "comercio":
                return "Comercio";

            case "cultura":
                return "Cultura";

            case "taberna":
                return "Taberna";

    		default:  return "Temas Generales";
    	}
    };
    $scope.post = {comment: '', author:'', title: '', section:$scope.section, date:new Date().getTime(), sectionTitle:returnTitle(), open:true};
    console.log("postObject", $scope.post);
    $scope.nuevoPost = function()
    {
        $scope.posting = true;
        console.log("POSTING", $scope.posting);
    };
    $scope.cerrarPost = function()
    {
        $scope.posting = false;
    };
    $scope.posting = false;

    $scope.title = returnTitle();
    console.log("POST", $scope.posts);

    $scope.submitPost = function () {
        $scope.post.author = {username: $scope.profile.username, uid: $scope.profile.$id};
        $scope.post.date = new Date().getTime();
        console.log("FECHA", $scope.post.date);
        Post.create($scope.post, $scope.section).then(function (ref) {
            $location.path('/posts/' + $scope.section + "/" + ref.key());

            Auth.addPostToProfile($scope.profile.$id, ref.key(), $scope.post);

            var post = {
                $id: ref.key(),
                section: $scope.section
            };

            var comment = { author: $scope.post.author,
                            comment: $scope.post.comment,
                            date: $scope.post.date
                        };
            Post.addUpdate(post, comment);

            $scope.post = {comment: '', author:'', title: '', section:$scope.section, date:new Date() };
        });
     };
     $scope.fechar = function(milisecs)
     {
        var fecha = new Date(milisecs);
        return fecha;
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
