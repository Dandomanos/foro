'use strict';

/* global Firebase:false */


angular.module('blogApp')
.factory('Auth', ['FIREBASE_URL', '$firebase', '$location', '$timeout', '$rootScope', '$firebaseObject', '$firebaseArray', function(FIREBASE_URL, $firebase, $location, $timeout, $rootScope, $firebaseObject, $firebaseArray){
	var ref = new Firebase(FIREBASE_URL);

	function authDataCallback(authData)
	{
		if(authData) {
			console.log("User "+ authData.uid + " is logged in with " + authData.provider);
			Auth.user = authData;
			Auth.getProfile(authData.uid);
			console.log("Auth.user ", Auth.user);
			// console.log("Redirecciono a la home");
			// $location.path('/');
			// update();
		} else {
			console.log("user sin conectar",Auth.user.uid);
			if(Auth.user.uid!==undefined)
			{
				console.log("Está logado");
				Auth.updateConnection(Auth.user.uid);
			}
			$location.path('/desconectado');
			console.log("User is logged out");
			Auth.user={};
			console.log("Auth.user ", Auth.user);

		}
	}

	// var update = function () {
	// 	console.log("Actualizo el path");
 //        $timeout(function () {
 //            $rootScope.currentPath = $location.path();
 //        }, 0);
 //    };

    var callbackUpdate = function(date) {
      console.log("Ultima conexión actualizada", date);
    };


	

	
		var Auth = {
			register: function (user, callback) {
			
				ref.createUser({
					email: user.email,
					password: user.password
				}, callback);

				// function(error, userData) {
				// 	if(error) {
				// 		console.log("Error al crear usuario", error);
				// 	} else {
				// 		console.log("Se ha creado una cuenta con el siguiente uid: ", userData.uid);
				// 		Auth.login(user);
				// 	}
				// });

			},
			changePass: function(user, callback)
			{
				ref.changePassword(user, callback);
			},
			createProfile: function (user, callback) {
				var profile = {
					username: user.username,
					email: user.email,
					post: {},
					rango: 'user',
					uid: user.uid
				};

				// var profileRef = $firebase(ref.child('profile'));
				// var refProfile = $firebaseObject(ref.child('profile'));
				// ref.set({user.uid, profile}, callback);
				ref.child('profile').child(user.uid).set(profile, callback);
			},
			// addPostToProfile: function(uid, postID)
			// {
			// 	// ref.child('profile').child(uid).posts.push({postID});
			// 	 // messageListRef.push({ 'user_id': 'fred', 'text': 'Yabba Dabba Doo!' });
			// },
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

				// ref.child('profile').child(uid).child('posts').set(post, callback);
			},
			addCommentToProfile: function(uid, postID, Post, comentario){

				var posts = $firebaseArray(ref.child('profile').child(uid).child('comments'));
				var comment = {
					postId: postID,
					title: Post.title,
					section:Post.section,
					sectionTitle:Post.sectionTitle,
					datePost:Post.date,
					dateComment:comentario.date,
					comment:comentario.comment
				};
				return posts.$add(comment);

				// ref.child('profile').child(uid).child('posts').set(post, callback);
			},
			getProfile: function(uid)
			{
				if(uid)
				{
				// console.log("PERFIL-AUTH", $firebaseObject(ref.child('profile').child(uid)));
				return $firebaseObject(ref.child('profile').child(uid));
					
				}
				// return ref.child('profile').child(uid);
			},
		    updateConnection: function (uid) {
		      var date = new Date().getTime();
		      ref.child('profile').child(uid).child('lastConnection').set(date, callbackUpdate(date));
		    },
			login: function(user, callback) {
				
				ref.authWithPassword({
					email: user.email,
					password: user.password
				}, callback);
				
			},
			logout:function()
			{
				
				ref.unauth();
				console.log("Usuario desconectado");
				
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
					console.log("Autentificado con el uid=> ", authData.uid);
					console.log("Total Data", authData);
					return authData;
				} else
				{
					return null;
				}
			},
			isConnected: function(milisecs) {
				console.log("milisecs", milisecs);
				var actualDate = new Date().getTime();
				var diferencia = actualDate - milisecs;
				console.log("Diferencia", diferencia);
				if(diferencia<=300000)
				{
					return true;
				} else
				{
					return false;
				}
			},
			user: {},
			profile: {}

		};

	ref.onAuth(authDataCallback);
	
	return Auth;
}]);