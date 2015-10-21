'use strict';
/* global $:false */
/**
 * @ngdoc function
 * @name blogApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('ChatCtrl', ['$scope', 'Auth', 'Chat', '$location', '$anchorScroll', function ($scope, Auth, Chat, $location, $anchorScroll) {
 
  	$scope.profile = Auth.getProfile(Auth.user.uid);
  	$scope.mensaje = {};
  	// $scope.conversacion = Chat.all;
    $scope.enterTime = new Date().getTime();
    $scope.conversacion = Chat.filterMessages($scope.enterTime - 1);

    $scope.conectados = Chat.getConnected();

    $scope.conectados.$loaded(function(){
      console.log("Conectados", $scope.conectados);
    });

  	$scope.conversacion.$loaded(function(){
      console.log("Conversación Filtrada", $scope.conversacion);
      console.log("Location Path", $location.path());
  		// console.log("conversación cargada", $scope.conversacion);
  		// // $scope.conexion = new Date().getTime();
  		// console.log("lastEntry", $scope.conversacion.lastEntry);
  		


  	});

    $scope.$on('$routeChangeStart', function() { 
      var entrada = {
          username: 'Sistema',
          uid: $scope.profile.uid,
          email: $scope.profile.email,
          date: new Date().getTime(),
          content: $scope.profile.username + " ha abandonado la sala",
          rango: $scope.profile.rango,
          system:true
      };
      Chat.sendMessage(entrada).then(function()
      {
        console.log("Usuario sale del Chat");
        Chat.removeUserFromChat($scope.profile.username, function()
        {
          console.log("usuario eliminado del panel del chat", $scope.profile.username);
        });
      });
    });

    window.onbeforeunload = function () {
      // event.preventDefault();
      var entrada = {
          username: 'Sistema',
          uid: $scope.profile.uid,
          email: $scope.profile.email,
          date: new Date().getTime(),
          content: $scope.profile.username + " ha abandonado la sala",
          rango: $scope.profile.rango,
          system:true
      };
      Chat.sendMessage(entrada).then(function()
      {
        console.log("Usuario sale del Chat");
      });
      Chat.removeUserFromChat($scope.profile.username, function()
      {
        console.log("usuario eliminado del panel del chat", $scope.profile.username);
      });
    };

     // $scope.conversacionFiltrada.$loaded(function(){
     //  console.log("Conversación Filtrada", $scope.conversacionFiltrada);
     // });

  	$scope.profile.$loaded(function(){
  		console.log("Perfil cargado", $scope.profile);
  		var entrada = {
	  			username: 'Sistema',
	  			uid: $scope.profile.uid,
	  			email: $scope.profile.email,
	  			date: $scope.enterTime,
	  			content: $scope.profile.username + " ha entrado en la sala",
	  			rango: $scope.profile.rango,
	  			system:true
  		};
  		Chat.sendMessage(entrada).then(function()
  		{
  			console.log("Usuario Entra en el chat");
        var user =
        {
          username: $scope.profile.username,
          uid: $scope.profile.uid,
          email: $scope.profile.email,
          rango: $scope.profile.rango,
          date: $scope.enterTime
        };
        Chat.addUserToChat(user, function()
          {
            console.log("usuario añadido al panel del chat", user);
          });
  		});

  		// Chat.enterChat($scope.conversacion.lastEntry, Auth.user);
  	});

  	$scope.scrollTo = function(id) {
      var old = $location.hash();
      $location.hash(id);
      $anchorScroll();
      //reset to old to keep any additional routing logic from kicking in
      $location.hash(old);
    };

    $scope.sendMessage = function()
    {
    	$scope.mensaje =
  		{
  			username: $scope.profile.username,
  			uid: $scope.profile.uid,
  			email: $scope.profile.email,
  			date: new Date().getTime(),
  			content: $scope.message,
  			rango: $scope.profile.rango,
  			system:false
  		};
    	console.log("mensaje", $scope.mensaje);
    	$scope.message = '';
    	Chat.sendMessage($scope.mensaje).then(function(ref)
    	{
    		console.log("mensaje guardado con id", ref.key());
    		$('#campoEntrada').focus();
    		// Chat.lastEntry(ref.key(), callbackMessage);
    		// document.getElementById("mytext").focus();

    	});
    	
    };

    $scope.fechar = function(milisecs)
     {
        var fecha = new Date(milisecs);
        return fecha;
     };
  }]);
