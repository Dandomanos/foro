'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  	.controller('ProfileCtrl', ['$scope', '$routeParams', 'Post', 'Auth', '$anchorScroll', '$location', function ($scope, $routeParams, Post, Auth, $anchorScroll, $location) {
 	$scope.profile = Auth.getProfile($routeParams.uid);
 	$scope.profile.$loaded(function() {
 		console.log("cargo el perfil");
 		console.log("Número de comentarios", $scope.profile.comments);
 		// $scope.gotoAnchor('inicio');
 		Auth.updateConnection(Auth.user.uid);

 		$location.hash("inicio");
 		$anchorScroll();
 	});
 	console.log("Profile uid", $routeParams.uid);
 	console.log("Auth uid", Auth.user.uid);


 	$scope.isConnected = function(milisecs) {
                // console.log("milisecs", milisecs);
                var actualDate = new Date().getTime();
                var diferencia = actualDate - milisecs;
                // console.log("Diferencia", diferencia);
                if(diferencia<=300000)
                {
                    return true;
                } else
                {
                    return false;
                }
            };
 	       	
      
    

 	$scope.canEdit = function()
 	{
 		if($routeParams.uid===Auth.user.uid)
 		{
 			return true;
 		} else
 		{
 			return false;
 		}
 	};

 	$scope.fechar = function(milisecs)
     {
        var fecha = new Date(milisecs);
        return fecha;
     };

     $scope.cerrarOptions = function()
     {
        $scope.avatarOptions = false;
        $scope.passwordOptions = false;
        $scope.profileOptions = false;
        console.log("cierro todas las ventanas");
     }

     $scope.openOptions = function(menu)
     {
        $scope.cerrarOptions();
        
        switch(menu)
        {
          case 'pass':
            $scope.passwordOptions = true;
          break;
          case 'avatar':
            $scope.avatarOptions = true;
            break;
          case 'profile':
            $scope.profileOptions = true;
            break;
           default:
           $scope.cerrarOptions();
           break;
        }
     }
     $scope.cerrarOptions();
  }]);
