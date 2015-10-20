'use strict';

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
  	$scope.conversacion = Chat.all;

  	$scope.conversacion.$loaded(function(){
  		console.log("conversación cargada", $scope.conversacion);
  		$scope.conexion = new Date().getTime();
  		console.log("lastEntry", $scope.conversacion.lastEntry);
  		


  	});

  	$scope.profile.$loaded(function(){
  		console.log("Perfil cargado", $scope.profile);
  		var entrada = {
	  			username: 'Sistema',
	  			uid: $scope.profile.uid,
	  			email: $scope.profile.email,
	  			date: new Date().getTime(),
	  			content: $scope.profile.username + " ha entrado en la sala",
	  			rango: $scope.profile.rango,
	  			system:true
  		};
  		Chat.sendMessage(entrada).then(function()
  		{
  			console.log("Usuario Entra en el chat");
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
    var callbackMessage = function()
    {
    	console.log("Ultima entrada actualizada");
    }

    $scope.fechar = function(milisecs)
     {
        var fecha = new Date(milisecs);
        return fecha;
     };
  }]);
