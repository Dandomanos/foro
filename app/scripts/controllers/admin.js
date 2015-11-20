'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('AdminCtrl',['$scope', 'Profile', 'Chat', 'Post', 'Auth', 'Title', function ($scope, Profile, Chat, Post, Auth, Title) {
    
   Auth.checkUser();


  Title.setTitle("Foro CAOS: Administración");

   var unDia = 86400000;
   var tresHoras = 3600000*3;

   $scope.today = new Date();

   // $scope.today.setDate($scope.today.getDate()-1);
   $scope.today.setMilliseconds(0);
   $scope.today.setSeconds(0);

   $scope.From = new Date($scope.today.getTime() - unDia - tresHoras);

   $scope.To = new Date($scope.today.getTime() - tresHoras);
   // $scope.To = $scope.today;

   $scope.postLoaded = {};

   $scope.stockChat = {};
   $scope.stockLoaded = false;

   $scope.loadOldChat = function()
   {
      $scope.stockLoaded = false;
      $scope.stockChat = Chat.loadStockChat($scope.From.getTime(), $scope.To.getTime());
      $scope.stockChat.$loaded(function(error){
        if(error === null){
          // console.log("Se ha producido un error al cargar los mensajes del chat", error.code);
          //gestionar error en pantalla
        } else
        {
          // console.log("Mensajes cargados correctamente", $scope.stockChat);
          $scope.stockLoaded = true;
        }
      });

   };

   //Paginado
    $scope.currentPage = 0;
    $scope.pageSize = 14;
    $scope.numberOfPosts = 0;
    $scope.numberOfPages = function()
    {
        return Math.ceil($scope.stockChat.length/$scope.pageSize);
    };

   $scope.unloadStock = function()
   {
    // console.log("Stock Eliminado");
      $scope.stockChat = {};
      $scope.stockLoaded = false;
   };

   $scope.loadSection = function(section)
   {
    // console.log("Cargando sección", section.title);
    $scope.postLoaded = Post.getSection(section.section);
    $scope.postLoaded.$loaded(function(){
      // console.log("Cargado", $scope.postLoaded);
      // $scope.$apply();
    });
   };

   $scope.open = function(post)
    {
        // console.log("POST", post);
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
   	// console.log("Users", authData);
   })
   .catch(function(error){
   		if(error) {
   			// console.log("Error", error);
        //gestionar error en pantalla
   		}

   });

   var callbackDelete = function(error)
   {
   	if(error === null)
   	{
   		// console.log("mensajes borrados correctamente");

   	} else
   	{
   		// console.log("Error borrando mensajes", error);
      //gestionar error en pantalla
   	}
   };

   $scope.deleteChat = function()
   {
   		var tope = $scope.today.getTime();
   		// console.log("Tope", tope);
   		Chat.deleteMessagesBefore(tope, callbackDelete);
   };

   
   $scope.fechar = function(milisecs)
     {
        var fecha = new Date(milisecs);
        // console.log("milisecs to fechar", milisecs)
        // console.log("fechar", fecha);
        return fecha;
     };

     $scope.binding = function() {
      if(Auth.profile.blind===undefined)
      {
        return false;
      } else{
        return Auth.profile.blind;
      }
     };

     $scope.isAdmin = function(){
      
       // console.log("Profile", $scope.profile.rango);
       // console.log("Auth.user.uid", Auth.user.uid);
       if(Auth.profile)
       {
          if(Auth.profile.rango==='admin')
          {
            return true;
          } else
          {
            return false;
          }
        }
      };

  }]);
