'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('NavCtrl',['$scope', '$location', 'Post', 'Auth', '$window', function ($scope, $location, Post, Auth, $window) {


    $scope.profile = Auth.getProfile(Auth.user.uid);

    $scope.checkRoute = function() {
      if($location.path() ==='/unlogged' || $location.path() === '/user-deleted') {
        console.log("El usuario no debería ver el panel");
        $scope.autentified = false;
      } else {
        $scope.autentified = true;
        //UpdateConnection
      }
    };
    $scope.autentified = true;
    $scope.checkRoute();

    $scope.$on('$routeChangeStart', function() {
      $scope.checkRoute();
    });



     $scope.post = {url: 'http://', author:'', title: '' };

     $scope.section = "general";

     $scope.submitPost = function () {
        $scope.post.author = {username: $scope.profile.username, uid: $scope.profile.$id};
     	Post.create($scope.post, $scope.section).then(function (ref) {
     		$location.path('/posts/' + $scope.section + "/" + ref.key());

            Auth.addPostToProfile($scope.profile.$id, ref.key(), $scope.post);
     		$scope.post = {url: 'http://', title: ''};
     	});
     };


     Auth.user.onChange = function()
     {
        console.log('ID DE USUARIO', Auth.user.uid);
     };
     

     $scope.signedIn = function()
     {
        if(Auth.user) {
         $scope.userData = Auth.user;
         // $scope.getProfile();
         
        }



        // if(Auth.user.uid)
        // {
        //     $scope.profile = Auth.getProfile(Auth.user.uid);
        // }
        
        return Auth.signedIn();
     };

     
            

     

     $scope.logout = function()
     {
        Auth.logout();
        $scope.user = {email:'', password:''};
     };

    $scope.user = {email:'', password:''};

     var callbackLogin = function(error, authData)
     {
        if(error)
        {
            switch (error.code)
                     {
                         case "INVALID_EMAIL":
                             $scope.mensajeDeError="Introduce una dirección de correo válida por favor";
                             // console.log("EIntroduce una dirección de correo válida por favor");
                             break;
                         case "INVALID_PASSWORD":
                             $scope.mensajeDeError="La contraseña introducida no es correcta";
                             // console.log("La contraseña introducida no es correcta");
                             break;
                         case "INVALID_USER":
                             $scope.mensajeDeError="El usuario introducido no está registrado";
                             // console.log("El usuario introducido no está registrado");
                             break;
                         default:
                             $scope.mensajeDeError="Se ha producido un error al autentificar el usuario";
                             // console.log("Se ha producido un error al autentificar el usuario", error);
                             break;
                     }
            console.log("Error ",error);
            $scope.error = true;
            $scope.user.password = '';

        } else
        {
            console.log("Success", authData);
            $scope.error = false;
            $scope.profile = Auth.getProfile(authData.uid);

           
        }

        $scope.$apply();

     };



     $scope.login = function()
     {
        $scope.mensajeDeError = '';
        $scope.error = false;
        Auth.login($scope.user, callbackLogin);
        
     };

     $scope.isAdmin = function(){
      
       // console.log("Profile", $scope.profile.rango);
       // console.log("Auth.user.uid", Auth.user.uid);
       if($scope.profile)
       {
          if($scope.profile.rango==='admin')
          {
            return true;
          } else
          {
            return false;
          }
      }
    };

    $window.onfocus = function(){
       console.log("focused");
       if(Auth.user.uid!==undefined && Auth.profile.username !== undefined && $location.path() !== '/unlogged' && $location.path()!=='user-deleted' && $location.path() !== '/forgetpassword')
       {
            Auth.updateConnection(Auth.user.uid); 
       } else
       {
        Auth.checkUser();
       }
       
     };



    }]);
