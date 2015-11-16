'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:SectionCtrl
 * @description
 * # SectionCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('SectionCtrl',['$scope', '$routeParams', 'Post', 'Auth', '$location', 'Title', function ($scope, $routeParams, Post, Auth, $location, Title) {
    
    Auth.checkUser();

    $scope.silenced = function()
    {
        if(Auth.profile.silenced === undefined)
        {
            return false;
        } else
        {
            return Auth.profile.silenced;
        }
    };

    $scope.sections = [
      {
        title: 'Temas Generales',
        section: 'general'
      },
      {
        title: 'Batallas',
        section: 'batallas'
      },
      {
        title: 'Piratería',
        section: 'pirateria'
      },
      {
        title: 'Comercio',
        section: 'comercio'
      },
      {
        title: 'Cultura',
        section: 'cultura'
      },
      {
        title: 'Taberna',
        section: 'taberna'
      }
    ];

    $scope.MovePostTo = function(post, section)
    {
        // console.log("mover post", post.title);
        // console.log("a la sección ", section);
        console.log("POSTID", post.$id);
        post.moving = false;
        Post.movePostTo(post, section, returnTitle(section));
    };


    
  	$scope.section = $routeParams.section;
    $scope.profile = Auth.getProfile(Auth.user.uid);
    $scope.posts = Post.section($scope.section);

    // $scope.posts.$loaded(function(){
    //     for(var post in $scope.posts)
    //     {
    //         post.moving = false;
    //     }
    // })

    //Paginado
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function()
    {
        return Math.ceil($scope.posts.length/$scope.pageSize);
    };

    $scope.profile.$loaded(function(){
      Auth.updateConnection(Auth.user.uid);
    });
    // $scope.post = {comments: '', author:'', title: '', section:$scope.section, sectionTittle:returnTitle() };
    
    var returnTitle = function(seccion)
    {
    	switch(seccion)
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

     Title.setTitle("Foro CAOS: " + returnTitle());
    $scope.post = {comment: '', author:'', title: '', section:$scope.section, date:new Date().getTime(), sectionTitle:returnTitle($scope.section), open:true};
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

    $scope.title = returnTitle($scope.section);
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

    $scope.move = function(post)
    {
        console.log("POST to Move", post);
        if(post.moving===undefined)
        {
            post.moving = true;
            return;
        } else {
            if(post.moving===false)
            {
                post.moving = true;
                return;
            } else
            {
                post.moving = false;
                return;
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
