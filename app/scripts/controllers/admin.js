'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('AdminCtrl',['$scope', 'Profile', 'Chat', function ($scope, Profile, Chat) {
   $scope.today = new Date();

   $scope.today.setDate($scope.today.getDate()-1);
   $scope.today.setMilliseconds(0);
   $scope.today.setSeconds(0);

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

   $scope.silenciar = function(uid)
   {
   	console.log("Silenciar user con ID", uid);
   };
   
   $scope.fechar = function(milisecs)
     {
        var fecha = new Date(milisecs);
        // console.log("milisecs to fechar", milisecs)
        // console.log("fechar", fecha);
        return fecha;
     };

  }]);
