'use strict';

/* global Firebase:false */

angular.module('blogApp')
.factory('Post',['$firebaseArray', '$firebaseObject', 'FIREBASE_URL', function($firebaseArray, $firebaseObject, FIREBASE_URL) {
	var ref = new Firebase(FIREBASE_URL);
	var posts = $firebaseArray(ref.child('posts'));
	var general = $firebaseArray(ref.child('posts').child('general'));

	var Post = {
		all: posts,
		general:general,
		section: function(section) {
			return $firebaseArray(ref.child('posts').child(section));
		},
		getSection: function(section) {
			return $firebaseArray(ref.child('posts').child(section));
		},
		create: function (post, section) {
			var posts = $firebaseArray(ref.child('posts').child(section));

			return posts.$add(post);
		},
		setState: function(post, state)
		{
			ref.child('posts').child(post.section).child(post.$id).child('open').set(state);
		},
		// get: function (postId) {
		// 	return $firebase(ref.child('posts').child(postId)).$asObject();
		// },
		get: function (postId, section, callbackData) {
			var datos = $firebaseObject(ref.child('posts').child(section).child(postId), callbackData);
			// datos.$loaded().then(function(data){
			// 	console.log("acabo de cargar", data);
			// 	callbackData;
			// });
			// datos.once('author', callbackData);
			return datos;
		},
		addUpdate: function(post, comment) {
			// var ultima = {}
			ref.child('posts').child(post.section).child(post.$id).child('lastUpdate').set(comment);
		},
		addComment:function(post, comment)
		{
			console.log("post services", post);
			console.log("post section", post.section);
			console.log("post $id", post.$id);
			var pet = $firebaseArray(ref.child('posts').child(post.section).child(post.$id).child('comments'));
			Post.addUpdate(post, comment);
			return pet.$add(comment);
		},
		addIdToComment:function(post, comment, respuesta)
		{
			// var id = {id: commentId};
			console.log("ID desde PostService", comment.id);
			console.log("Comentario", comment.comment);
			return ref.child('posts').child(post.section).child(post.$id).child('comments').child(comment.id).set(comment, respuesta);
		},
		editComment:function(editedRef, Section, newMessage, callback)
		{	
			return ref.child('posts').child(Section).child(editedRef.postID).child('comments').child(editedRef.commentID).child('comment').set(newMessage, callback);
		},
		editOriginal:function(postID, Section, newMessage, callback)
		{
			return ref.child('posts').child(Section).child(postID).child('comment').set(newMessage, callback);
			
		},
		updateCountOriginal:function(postID, count, Section, callback)
		{
			return ref.child('posts').child(Section).child(postID).child('edited').child('count').set(count, callback);
		},
		updateCountComment:function(editedRef, count, Section, callback)
		{
			return ref.child('posts').child(Section).child(editedRef.postID).child('comments').child(editedRef.commentID).child('edited').child('count').set(count, callback);
		},
		addEditOriginalLog:function(postID, edited, Section)
		{
			var pet = $firebaseArray(ref.child('posts').child(Section).child(postID).child('edited'));
			 return pet.$add(edited);
		},
		addEditLog:function(editedRef, edited, Section)
		{
			var pet = $firebaseArray(ref.child('posts').child(Section).child(editedRef.postID).child('comments').child(editedRef.commentID).child('edited'));
			 return pet.$add(edited);
		},
		updateAfterEdit:function(postID, Section, comment, callback)
		{
			ref.child('posts').child(Section).child(postID).child('lastUpdate').set(comment, callback);
		},
		commentByAdmin:function(editedRef, Section, callback)
		{
			return ref.child('posts').child(Section).child(editedRef.postID).child('comments').child(editedRef.commentID).child('edited').child('byAdmin').set(true, callback);
		// Post.commentByAdmin($scope.editedRef, $routeParams.section, callbackAfterAdmin);
		},
		originalByAdmin:function(postID, Section, callback)
		{
			return ref.child('posts').child(Section).child(postID).child('edited').child('byAdmin').set(true, callback);
		},
		setDateEditOriginal:function(postID, edited, Section, callback)
		{
			var lastEdited = {
				date: edited.newMessage.date,
				editor: {
					uid: edited.newMessage.author.uid,
					username: edited.newMessage.author.username
				}
			};
			return ref.child('posts').child(Section).child(postID).child('edited').child('lastEdit').set(lastEdited, callback);
		},
		setDateEdit:function(editedRef, edited, Section, callback)
		{
			var lastEdited = {
				date: edited.newMessage.date,
				editor: {
					uid: edited.newMessage.author.uid,
					username: edited.newMessage.author.username
				}
			};
			return ref.child('posts').child(Section).child(editedRef.postID).child('comments').child(editedRef.commentID).child('edited').child('lastEdit').set(lastEdited, callback);
		},
		delete: function (post) {
			var hilo = ref.child('posts').child(post.section).child(post.$id);
			return hilo.remove();
		}
	};

	return Post;
}]);