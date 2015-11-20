'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('AuthCtrl',['$scope', '$location', 'Auth', 'Title', function ($scope, $location, Auth, Title) {
  	
    Auth.checkUser();

    Title.setTitle("Foro CAOS: Registrar Usuario");

    $scope.user = {email:'', password:'', username:'', uid:'', rango:'user', silenced:false, blind:false};

    $scope.registroRealizado = false;
    $scope.registros = {};

    $scope.profile = Auth.getProfile(Auth.user.uid);

    
  	var callbackRegister = function(error, authData)
     {
        if(error)
        {
            // console.log("Error al crear usuario", error);
            // console.log("errorCode", error.code);

            switch(error.code)
            {
              case "EMAIL_TAKEN":
                $scope.mensajeDeError = 'Ya existe un usuario con ese correo electrónico.';
                // console.log("Ya existe un usuario con ese correo electrónico.");
                break;
              case "INVALID_EMAIL":
                $scope.mensajeDeError = 'Introduce un formato de correo electrónico válido por favor.';
                // console.log("Introduce un formato de correo electrónico válido por favor.");
                break;
              case "INVALID_PASSWORD":
                $scope.mensajeDeError = 'Introduce una contraseña válida por favor.';
                // console.log('Introduce una contraseña válida por favor.');
                break;
              default:
                $scope.mensajeDeError = 'Se ha producido un error en el registro, inténtelo de nuevo más tarde.';
                // console.log("Se ha producido un error en el registro, inténtelo de nuevo más tarde.");
                break;
            }
            $scope.error = true;
            $scope.$apply();
        } else
        {
            // console.log("Registrado correctamente, procedemos a crear el Perfil", authData);
            $scope.error = false;
            $scope.user.uid = authData.uid;
            $scope.registros.uid = authData.uid;
            Auth.createProfile($scope.user, callbackProfile);
            // console.log("userProfile", $scope.userProfile);
            // Auth.login($scope.user, callbackLogin);
        }
        // $scope.$apply();
     };

     



     var callbackProfile = function(error)
     {
        if(error)
        {
          // console.log("Fallo en la sincronización", error);
          // console.log("errorCode", error.code);
          //gestionar error en pantalla
        } else
        {
          // console.log("Perfil creado correctamente", $scope.user.username);
          $scope.registros.user = $scope.user.username;
          $scope.registroRealizado = true;
          // console.log("registros.user", $scope.registros);
          $scope.user.username = '';
          $scope.user.email = '';
          $scope.user.password = '';
          $scope.$apply();
        }

     };


    $scope.register = function(){
      // console.log("Proceso de registro");
      $scope.registroRealizado = false;
      Auth.register($scope.user, callbackRegister);
    };

    $scope.isAdmin = function(){
      
       // console.log("Profile", $scope.profile.rango);
       // console.log("Auth.user.uid", Auth.user.uid);
      if($scope.profile.rango==='admin')
      {
        return true;
      } else
      {
        return false;
      }
    };



  }]);
