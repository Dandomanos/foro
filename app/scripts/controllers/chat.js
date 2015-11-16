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
  .controller('ChatCtrl', ['$scope', 'Auth', 'Chat', '$location', '$anchorScroll', '$window', 'Title', function ($scope, Auth, Chat, $location, $anchorScroll, $window, Title) {


    var animarTab;
    var mensajes = ["Foro CAOS: Chat", "Mensajes sin leer"];
    var mensajeSelected = 0;
    var parpadeando = false;


    $scope.userBlinded = function(estado)
    {
      if(estado===undefined)
      {
        console.log("blinded user", false);
        return false;
      } else
      {
        console.log("blinded user", estado);
        return estado;
      }
    };


    Auth.checkUser();

    Title.setTitle(mensajes[mensajeSelected]);

    var focused = true;

    $scope.silenced = function() {
      if(Auth.profile.silenced === undefined)
      {
        return false;
      } else
      {
        return Auth.profile.silenced;
      }
    };

    $scope.autentified = function() {
        // console.log("Auth.autentified", Auth.autentified)
        return Auth.autentified;
    };

    $scope.signedIn = function()
     {
        return Auth.signedIn(); 
     };

    $scope.scrollTo = function(id) {
      var old = $location.hash();
      $location.hash(id);
      $anchorScroll();
      //reset to old to keep any additional routing logic from kicking in
      $location.hash(old);
    };

    $scope.sendMessage = function()
    {
      console.log("scopeProfile", $scope.profile);
      if($scope.profile.username===undefined)
      {
        Auth.checkUser();
      } else
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

      // for(var i=0; i<100; i++)
      // {
        Chat.sendMessage($scope.mensaje).then(function(ref)
        {
          console.log("mensaje guardado con id", ref.key());
          $('#campoEntrada').focus();
          Auth.updateChatConnection($scope.profile.uid, $scope.profile.username);
          // Chat.lastEntry(ref.key(), callbackMessage);
          // document.getElementById("mytext").focus();
          // Chat.cleanChat();
          });
        }


      // }
    };

    $scope.isConnected = function(milisecs) {
                // console.log("milisecs", milisecs);
                var actualDate = new Date().getTime();
                var diferencia = actualDate - milisecs;
                // console.log("Diferencia", diferencia);
                // if(diferencia<=300000)
                if(diferencia<=300000)
                {
                    return "";
                } else
                {
                    return "ausente";
                }
            };

    $scope.fechar = function(milisecs)
     {
        var fecha = new Date(milisecs);
        return fecha;
     };

     var parpadeo = function()
     {
      if(mensajeSelected===0)
      {
        mensajeSelected = 1;
      } else
      {
        mensajeSelected = 0;
      }
        Title.setTitle(mensajes[mensajeSelected]);
        console.log("parpadeo", mensajes[mensajeSelected]);

        $scope.$apply();
     };





     //Chequeo de usuario
    
      // console.log("Tengo usuario, continuo ", Auth.user);
  	 $scope.profile = Auth.getProfile(Auth.user.uid);

     $scope.cargarEstados = function(){
      for(var i=0; i<$scope.conectados.length; i++)
      {
        $scope.conectados[i].profile = Auth.getProfile($scope.conectados[i].uid);
      }
     };

  	$scope.mensaje = {};
  	// $scope.conversacion = Chat.all;
    $scope.enterTime = new Date().getTime();
    $scope.conversacion = Chat.filterMessages($scope.enterTime - 1);

    $scope.conectados = Chat.getConnected();

    $scope.conectados.$loaded(function(){
      console.log("Conectados", $scope.conectados);
      $scope.cargarEstados();
      
    });

  	$scope.conversacion.$loaded(function(){
      console.log("Conversación Filtrada", $scope.conversacion);
      console.log("Location Path", $location.path());
  		// console.log("conversación cargada", $scope.conversacion);
  		// // $scope.conexion = new Date().getTime();
  		// console.log("lastEntry", $scope.conversacion.lastEntry);
  		


  	});
    $scope.conectados.$watch(function(){
      $scope.cargarEstados();
    });

    $scope.conversacion.$watch(function(){
      console.log("Conversación ha cambiado: ");

      if(focused===false)
      {
        if(parpadeando===false)
        {
          animarTab = setInterval(parpadeo, 1000);
          parpadeando = true;
        }
        // Title.setTitle("Foro CAOS: Nuevo Mensaje de Chat");
        // PageTitleNotification.On("Nuevo Mensaje de Chat", 1000);
        // document.title = " Ding Ding!";
      } else
      {
        // PageTitleNotification.Off();
        // Title.setTitle("Foro CAOS: Chat");
      }
      if($scope.profile.username===undefined)
      {
        console.log("Usuario eliminado, no debería estar aquí");
        Auth.checkUser();
      }
      // document.title = " Ding Ding!";
    });



    $scope.$on('$routeChangeStart', function() {
      clearInterval(animarTab);
      if($scope.profile.username===undefined)
      {
        return;
      } else
      {


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
      }
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
    
  	$scope.profile.$loaded(function(data){

      if($scope.profile.username===undefined)
      {
        return;
      } else
      {



  		console.log("Perfil cargado", data);
      
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
            Auth.updateChatConnection(user.uid, user.username);
          });
  		});

      }
  	});

    $window.onblur =function(){
      focused = false;
    };


     $window.onfocus = function(){
      focused = true;
      clearInterval(animarTab);
      parpadeando = false;
      mensajeSelected = 0;
      Title.setTitle(mensajes[mensajeSelected]);
      // PageTitleNotification.Off();
       // document.title = " Ding Dong!";
       console.log("focused");
       Title.setTitle("Foro CAOS: Chat");
       if($scope.profile!==undefined && $location.path()==='/chat')
       {
          if($scope.profile.uid!==undefined && $scope.profile.username!==undefined)
          {
            Auth.updateChatConnection($scope.profile.uid, $scope.profile.username);  
          }
          
       }
     };

     
  }]);
