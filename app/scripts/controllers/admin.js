'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('AdminCtrl',['$scope', 'Profile', 'Chat', 'Post', function ($scope, Profile, Chat, Post) {
   $scope.today = new Date();

   $scope.today.setDate($scope.today.getDate()-1);
   $scope.today.setMilliseconds(0);
   $scope.today.setSeconds(0);

   $scope.postLoaded = {};

   $scope.loadSection = function(section)
   {
    console.log("Cargando sección", section.title);
    $scope.postLoaded = Post.getSection(section.section);
    $scope.postLoaded.$loaded(function(authData){
      console.log("Cargado", $scope.postLoaded);
      // $scope.$apply();
    });
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

    $scope.silenciar = function(uid, state)
    {
      Profile.setSilenceState(uid, state);
    };

    $scope.cegar = function(uid, state)
    {
      Profile.setBlindState(uid, state);
    };

    $scope.deletePost = function(post)
    {
      Post.delete(post);
    };

    $scope.eliminar = function(uid)
    {
      Profile.deleteProfile(uid);
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

   $scope.users = Profile.getAll();

   $scope.users.$loaded()
   .then(function(authData){
   	console.log("Users", authData);
   })
   .catch(function(error){
   		if(error) {
   			console.log("Error", error);
   		}

   });

   var callbackDelete = function(error)
   {
   	if(error === null)
   	{
   		console.log("mensajes borrados correctamente");
   	} else
   	{
   		console.log("Error borrando mensajes", error);
   	}
   };

   $scope.deleteChat = function()
   {
   		var tope = $scope.today.getTime();
   		console.log("Tope", tope);
   		Chat.deleteMessagesBefore(tope, callbackDelete);
   };

   
   $scope.fechar = function(milisecs)
     {
        var fecha = new Date(milisecs);
        // console.log("milisecs to fechar", milisecs)
        // console.log("fechar", fecha);
        return fecha;
     };

  }]);
