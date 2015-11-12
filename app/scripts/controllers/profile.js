'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  	.controller('ProfileCtrl', ['$scope', '$routeParams', 'Post', 'Auth', '$anchorScroll', '$location', 'Title', 'Profile', function ($scope, $routeParams, Post, Auth, $anchorScroll, $location, Title, Profile) {



    Auth.checkUser();

    Title.setTitle("Foro CAOS:");

    $scope.ownProfile = Auth.profile;

    $scope.created = 0;
    $scope.commented = 0;

    

    $scope.scrollTo = function(id) {
      var old = $location.hash();
      $location.hash(id);
      $anchorScroll();
      //reset to old to keep any additional routing logic from kicking in
      $location.hash(old);
    };

    var contarPost = function()
    {
        $scope.created = 0;
        angular.forEach($scope.profile.posts, function(){
            $scope.created++;
        });

        // for(var post in $scope.profile.posts)
        // {
        //     $scope.created +=1;
        // }
    };
    var contarComentarios = function()
    {
        $scope.commented = 0;
        angular.forEach($scope.profile.comments, function(){
            $scope.commented++;
        });
        // for(var comment in $scope.profile.comments)
        // {
        //     $scope.commented +=1;
        // }
    };

    $scope.returnState = function(estado)
    {
      if(estado===undefined)
      {
        return false;
      } else
      {
        return estado;
      }
    }
 	$scope.profile = Auth.getProfile($routeParams.uid);
 	$scope.profile.$loaded(function() {

    Title.setTitle("Foro CAOS: " + $scope.profile.username );

 		console.log("cargo el perfil");
        contarPost();
        contarComentarios();
 		console.log("Número de comentarios", $scope.profile.comments);
 		// $scope.gotoAnchor('inicio');
 		Auth.updateConnection(Auth.user.uid);

        $scope.passwordUpdate = {email:$scope.profile.email,  oldPassword: "", newPassword: ""};

        $scope.scrollTo("inicio");

 	});

  $scope.posts = Profile.getPosts($routeParams.uid);
  $scope.comments = Profile.getComments($routeParams.uid);
 	console.log("Profile uid", $routeParams.uid);
 	console.log("Auth uid", Auth.user.uid);

  //Paginado
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    
    $scope.numberOfPages = function()
    {
        return Math.ceil($scope.posts.length/$scope.pageSize);
    };

    $scope.currentCommentsPage = 0;
    $scope.numberOfCommentsPages = function()
    {
      var CommentsPages = Math.ceil($scope.comments.length/$scope.pageSize);
      // console.log("CommentsPages", CommentsPages);
      return CommentsPages;
    }



    $scope.error = false;
    $scope.success = false;
    $scope.mensajeDeError = '';
    $scope.errorNumber = 0;


    $scope.profileOptions = true;


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
     };

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
     };
     $scope.openOptions('profile');

     var callbackChangePass = function(error)
     {
        if(error)
        {
            switch (error.code) {
              case "INVALID_PASSWORD":
                console.log("La contraseña actual no es correcta");
                $scope.error = true;
                $scope.mensajeDeError = 'La contraseña actual no es correcta';
                $scope.errorNumber = 2;
                $scope.passwordUpdate.oldPassword = '';
                $scope.$apply();
                break;
              case "INVALID_USER":
                console.log("La dirección de correo electrónico no es correcta");
                $scope.error = true;
                $scope.mensajeDeError = 'La dirección de correo electrónica no es correcta';
                $scope.errorNumber = 3;
                break;
              default:
                console.log("Se ha producido un error inesperado al intentar cambiar la contraseña", error);
                $scope.error = true;
                $scope.mensajeDeError = 'Se ha producido un error inesperado al intentar cambiar la contraseña';
                $scope.errorNumber = 0;
            }
        } else
        {
            console.log("Contraseña cambiada correctamente");
            $scope.error = false;
            $scope.mensajeDeError = '';
            $scope.success = true;
            $scope.passwordUpdate.oldPassword = $scope.passwordUpdate.newPassword = $scope.passwordUpdate.newPassword2 = '';
            $scope.$apply();
        }
     };

     $scope.changePassword = function()
     {
        $scope.success = false;
        $scope.error = false;
        $scope.mensajeDeError = '';
        $scope.errorNumber = 0;
        if($scope.passwordUpdate.newPassword === $scope.passwordUpdate.newPassword2)
        {
            console.log("Update Object",$scope.passwordUpdate);
            
            Auth.changePass($scope.passwordUpdate, callbackChangePass);
        } else
        {
            console.log("La contraseña nueva no coincide");
            $scope.error = true;
            $scope.mensajeDeError = 'La contraseña nueva no coincide';
            $scope.errorNumber = 1;
            $scope.passwordUpdate.newPassword = $scope.passwordUpdate.newPassword2 = '';

        }
     };
  }]);
