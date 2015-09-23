'use strict';

/* global Firebase:false */

angular.module('blogApp')
.factory('Post',['$firebaseArray', '$firebaseObject', 'FIREBASE_URL', function($firebaseArray, $firebaseObject, FIREBASE_URL) {
	var ref = new Firebase(FIREBASE_URL);
	var posts = $firebaseArray(ref.child('posts'));
	var general = $firebaseArray(ref.child('posts').child('general'))

	var Post = {
		all: posts,
		general:general,
		section: function(section) {
			return $firebaseArray(ref.child('posts').child(section));
		},
		create: function (post, section) {
			var posts = $firebaseArray(ref.child('posts').child(section));
			return posts.$add(post);
		},
		// get: function (postId) {
		// 	return $firebase(ref.child('posts').child(postId)).$asObject();
		// },
		get: function (postId, section) {
			return $firebaseObject(ref.child('posts').child(section).child(postId));
		},
		delete: function (post) {
			return posts.$remove(post);
		}
	};

	return Post;
}]);