'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('UsersCtrl', ['$scope', 'Auth', 'Profile', function ($scope, Auth, Profile) {

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

       
    
  }]);
