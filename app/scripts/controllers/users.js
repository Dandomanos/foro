'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('UsersCtrl', ['$scope', 'Auth', 'Profile', '$location', function ($scope, Auth, Profile, $location) {

    Auth.checkUser();

    $scope.profile = Auth.profile;

    $scope.signedIn = function()
     {
         $scope.user = Auth.user;
        return Auth.signedIn();
        
     };



     $scope.profile.$loaded(function(){
      // console.log("profile.blind", $scope.profile.blind);
      // $scope.$apply();
     });

     $scope.blinding = function(){
      // console.log("profile.blind", $scope.profile.blind);
      if(Auth.profile.blind===undefined)
      {
        return false;
      } else
      {
        return Auth.profile.blind;
      }
     };
    

    $scope.checkRoute = function() {
      if($location.path() ==='/unlogged' || $location.path() === '/user-deleted' || $location.path() === '/forgetpassword') {
        console.log("El usuario no debería ver el panel");
        $scope.autentified = false;
      } else {
        $scope.autentified = true;
      }
    };
    $scope.autentified = true;
    $scope.checkRoute();

    $scope.$on('$routeChangeStart', function() {
      $scope.checkRoute();
    });

  	$scope.users = Profile.getAll();

  	$scope.orden = 'lastConnection';

  	$scope.users.$loaded(function(data){
  		console.log("usuarios cargados",data);
      // $scope.users =  $scope.json2array(data);
  	});

    $scope.json2array = function (json){
      var result = [];
      var keys = Object.keys(json);
      keys.forEach(function(key){
          result.push(json[key]);
      });
      console.log("RESULT", result);
      return result;
    };

  	 $scope.fechar = function(milisecs)
     {
        var fecha = new Date(milisecs);
        // console.log("milisecs to fechar", milisecs)
        // console.log("fechar", fecha);
        return fecha;
     };

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

     $scope.signedIn = function()
     {
         // $scope.user = Auth.user;
        return Auth.signedIn();
        
     };

       
    
  }]);
