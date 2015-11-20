'use strict';

/* global Firebase:false */


angular.module('blogApp')
.factory('Auth', ['FIREBASE_URL', '$firebase', '$location', '$timeout', '$rootScope', '$firebaseObject', '$firebaseArray', function(FIREBASE_URL, $firebase, $location, $timeout, $rootScope, $firebaseObject, $firebaseArray){
	var ref = new Firebase(FIREBASE_URL);

	function authDataCallback(authData)
	{
		if(authData) {
			// console.log("User "+ authData.uid + " is logged in with " + authData.provider);
			Auth.user = authData;
			Auth.profile = Auth.getProfile(authData.uid);

			Auth.profile.$loaded(function(){
				if(Auth.profile.username===undefined)
				{
					// console.log("El usuario ha sido eliminado por un administrador");
					$location.path('/user-deleted');
					update();
				}
			});
			// console.log("Auth.user ", Auth.user);

			// if(Auth.user.username===undefined)
			// {
			// 	console.log("El usuario ha sido eliminado por un administrador");
			// 	$location.path('/user-deleted');
			// 	update();
			// }



			if($location.path()==='/desconectado'  || $location.path()==='/forgetpassword' || $location.path()==='/unlogged')
			{
			// console.log("Redirecciono a la home");
			$location.path('/');
			update();
			// } else
			// {
			// 	console.log("path()", $location.path());
			// 	var cadena = '#' + $location.path() + "?loaded";
			// 	console.log("cadena", cadena);
			// 	$window.location.href = cadena;

				// $location.$reload();
			}
		} else {
			// console.log("user sin conectar",Auth.user.uid);
			if(Auth.user.uid!==undefined)
			{
				// console.log("Está logado");
				Auth.updateConnection(Auth.user.uid);
			}
			$location.path('/unlogged');
			// console.log("User is logged out");
			Auth.user={};
			Auth.profile = {};
			Auth.autentified = false;
			// console.log("Auth.user ", Auth.user);

		}
	}

	var update = function () {
		// console.log("Actualizo el path");
        $timeout(function () {
            $rootScope.currentPath = $location.path();
        }, 0);
    };

    var callbackUpdate = function(date) {
      // console.log("Ultima conexión actualizada", date);
    };

    var callbackUpdateChatConnection = function(date)
    {
    	 // console.log("Ultima conexión del Chat actualizada", date);
    };
	

	
		var Auth = {
			register: function (user, callback) {
			
				ref.createUser({
					email: user.email,
					password: user.password
				}, callback);
			},
			changePass: function(user, callback)
			{
				ref.changePassword(user, callback);
			},
			resetPass: function(email, callback)
			{
				ref.resetPassword(email, callback);
			},
			createProfile: function (user, callback) {
				var profile = {
					username: user.username,
					email: user.email,
					post: {},
					rango: 'user',
					uid: user.uid,
					silenced: false,
					blind: false,
					lastConnection: 0
				};
				ref.child('profile').child(user.uid).set(profile, callback);
			},
			checkUser: function() 
			{
				if(Auth.user.uid===undefined)
			    {
			      // console.log("No estás logado");
			      if($location.path()!=='/forgetpassword')
			      {
			      	$location.path("/unlogged");
			      }
			      return;
			    }

			    Auth.profile.$loaded(function(){
					if(Auth.profile.username===undefined)
					{
						// console.log("El usuario ha sido eliminado por un administrador");
						$location.path('/user-deleted');
						update();
					} else
					{
						// console.log("El usuario está autentificado");
						Auth.autentified = true;
					}
				});
			},
			addPostToProfile: function(uid, postID, Post){

				var posts = $firebaseArray(ref.child('profile').child(uid).child('posts'));
				var post = {
					postId: postID,
					title: Post.title,
					section:Post.section,
					sectionTitle:Post.sectionTitle,
					date:Post.date
				};
				return posts.$add(post);
			},
			addCommentToProfile: function(uid, commentID, Post, comentario, postID){

				var posts = $firebaseArray(ref.child('profile').child(uid).child('comments'));
				var comment = {
					commentId: commentID,
					postId: postID,
					title: Post.title,
					section:Post.section,
					sectionTitle:Post.sectionTitle,
					datePost:Post.date,
					dateComment:comentario.date,
					comment:comentario.comment
				};
				return posts.$add(comment);
			},
			getProfile: function(uid)
			{
				if(uid)
				{
				return $firebaseObject(ref.child('profile').child(uid));
					
				}
			},
		    updateConnection: function (uid) {
		    	if(Auth.profile.username!==undefined)
		    	{
			      var date = new Date().getTime();
			      ref.child('profile').child(uid).child('lastConnection').set(date, callbackUpdate(date));
		    	}
		    },
		    updateChatConnection: function (uid, username) 
		    {
		    	var date = new Date().getTime();
		    	// console.log("DATE", date);
		    	// console.log("UID", uid);
		    	// console.log("Username", username);
		    	ref.child('profile').child(uid).child('lastConnection').set(date,
		    		Auth.updateConnectionFromChat(date, username));		    	
		    },
		    updateConnectionFromChat: function(date, username)
		    {
		    	ref.child('chat').child('connected').child(username).child('lastConnection').set(date, callbackUpdateChatConnection(date));
		    },
		    // getConnection: function(uid)
		    // {
		    // 	return $firebaseObject(ref.child('profile').child(uid).child('lastConnection').val());
		    // },
			login: function(user, callback) {
				
				ref.authWithPassword({
					email: user.email,
					password: user.password
				}, callback);
				
			},
			logout:function()
			{
				
				ref.unauth();
				// console.log("Usuario desconectado");
				
			},
			signedIn:function() {
				var authData = ref.getAuth();
				if(authData) {
					// console.log("signedIn", true);
					return true;
				} else
				{
					// console.log("signedIn", false);
					return false;
				}
			},
			resolveUser: function()
			{
				var authData = ref.getAuth();
				if(authData) {
					// console.log("Autentificado con el uid=> ", authData.uid);
					// console.log("Total Data", authData);
					return authData;
				} else
				{
					return null;
				}
			},
			isConnected: function(milisecs) {
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
			},
			user: {},
			profile: {},
			autentified: false

		};

	ref.onAuth(authDataCallback);
	
	return Auth;
}]);