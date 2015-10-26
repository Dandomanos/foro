'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:ForgetpasswordCtrl
 * @description
 * # ForgetpasswordCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('ForgetpasswordCtrl',['$scope', 'Auth', function ($scope, Auth) {

    $scope.mensajeResetPassword = '';
    $scope.tempEmail = '';
    $scope.error = false;
    $scope.success = false;
    $scope.resetPassword = function()
  	{
  		console.log("email", $scope.email);
  		$scope.tempEmail = $scope.email;
  		$scope.error = false;
    	$scope.success = false;
  		Auth.resetPass({email:$scope.email}, callbackReset);
  	};

  	var callbackReset = function(error)
  	{
  		if(error === null)
  		{
  			console.log("Se le ha enviado al correo su nueva contraseña.");
  			$scope.error = false;
    		$scope.success = true;

  			$scope.mensajeResetPassword = 'Se le ha enviado a "' + $scope.tempEmail + '" su nueva contraseña.';

  			console.log("success", $scope.success);
  			$scope.email = '';
  		} else
  		{
  			console.log("CODE", error.code);
  			$scope.error = true;
    		$scope.success = false;
  			switch(error.code)
  			{
  				case "INVALID_USER":
  					$scope.mensajeResetPassword =  'El email "' + $scope.tempEmail +'" no corresponde con ningún usuario.';
  					$scope.email = '';
  					break;
  				default:
  					$scope.mensajeResetPassword = "Se ha producido un error al intentar resetear su contraseña, por favor inténtelo más tarde.";
  					break;
  			}

  			console.log("error", $scope.error);
  			
  		}

  		$scope.$apply();

  	}

  }]);
