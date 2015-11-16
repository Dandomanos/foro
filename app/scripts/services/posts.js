'use strict';

/* global Firebase:false */

angular.module('blogApp')
.factory('Post',['$firebaseArray', '$firebaseObject', 'FIREBASE_URL', 'Profile', function($firebaseArray, $firebaseObject, FIREBASE_URL, Profile) {
	var ref = new Firebase(FIREBASE_URL);
	var posts = $firebaseArray(ref.child('posts'));
	var general = $firebaseArray(ref.child('posts').child('general'));

	var Post = {
		all: posts,
		general:general,
		section: function(section) {
			return $firebaseArray(ref.child('posts').child(section));
		},
		getHomeSection: function(section) {
			return $firebaseArray(ref.child('posts').child(section).orderByChild('lastDate').limitToLast(5));
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
		getComments: function(postId, section, callbackData)
		{
			var comments = $firebaseArray(ref.child('posts').child(section).child(postId).child('comments'), callbackData);
			return comments;
		},
		getArray: function (postId, section, callbackData) {
			var datos = $firebaseArray(ref.child('posts').child(section).child(postId), callbackData);
			// datos.$loaded().then(function(data){
			// 	console.log("acabo de cargar", data);
			// 	callbackData;
			// });
			// datos.once('author', callbackData);
			return datos;
		},
		get: function (postId, section, callbackData) {
			var datos = $firebaseObject(ref.child('posts').child(section).child(postId), callbackData);
			// datos.$loaded().then(function(data){
			// 	console.log("acabo de cargar", data);
			// 	callbackData;
			// });
			// datos.once('author', callbackData);
			return datos;
		},
		addUpdateChild: function(post, date){
			console.log("Actualizo el lastDATE");
			ref.child('posts').child(post.section).child(post.$id).child('lastDate').set(date);
		},
		addUpdate: function(post, comment) {
			// var ultima = {}
			console.log("Actualizo el lastUpdate");
			ref.child('posts').child(post.section).child(post.$id).child('lastUpdate').set(comment, Post.addUpdateChild(post, comment.date));
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
		commentByAdmin:function(editedRef, Section, byAdmin, callback)
		{
			return ref.child('posts').child(Section).child(editedRef.postID).child('comments').child(editedRef.commentID).child('edited').child('byAdmin').set(byAdmin, callback);
		// Post.commentByAdmin($scope.editedRef, $routeParams.section, callbackAfterAdmin);
		},
		originalByAdmin:function(postID, Section, byAdmin, callback)
		{
			return ref.child('posts').child(Section).child(postID).child('edited').child('byAdmin').set(byAdmin, callback);
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
		movePostTo:function(post, newSection, newSectionTitle, comments)
		{
			console.log("post.comments", post.comments);
			 console.log("mover post", post.title);
        	console.log("a la sección ", newSection);
        	console.log("POST ID", post.$id);
        	console.log("Author", post.author);
        	console.log("author.uid", post.author.uid);
        	var comments = post.comments;
        	var authorUid = post.author.uid;
        	var newId = '';
        	var id = post.$id;
        	var oldSection = post.section;
        	post.section  = newSection;
        	post.sectionTitle = newSectionTitle;









        	//Creamos el hilo en la nueva sección y almacenamos su nuevo ID
        	Post.create(post, newSection).then(function (ref){
        		newId = ref.key();
        		console.log('newId', newId);
        		
        		console.log("post.comments", comments);
				//Cambiamos la sección de los comentarios en los perfiles
	        	for(var comment in comments)
	        	{
	        		// console.log("Comentario", comment); //[comment] => corresponde con commentId dentro de perfil
	        		// console.log("Autor Username", post.comments[comment].author.username);
	        		// console.log("Autor Uid", post.comments[comment].author.uid);
	        		// console.log("Autor uid 2", comment.author.uid)
	        		// Profile.setNewSectionComment(comment, newSection, newSectionTitle, post.comments[comment].author.uid, newId);
	        		Profile.setNewSectionComment(comment, newSection, newSectionTitle, comments[comment].author.uid, newId);
	        	}
        	

        	

        	//Cambiamos la sección del post en el perfil del autor
        	Profile.setNewSectionPost(post.$id, newSection, newSectionTitle, authorUid, newId);

        	console.log("oldSection", oldSection);
        	console.log("id", id);

        	
			});

			//Finalmente eliminamos el hilo de la antigua sección
        	var hilo = ref.child('posts').child(oldSection).child(id);
			hilo.remove(function(error){
					if(error)
					{
						console.log("se ha producido un error ", error.code)
					} else
					{
						console.log("Hilo removido de "+oldSection+" con id "+id);
					}
				});

        	
        	// ref.child('posts').child(newSection).child(id).set(post);
		},
		delete: function (post) {
			// console.log("POST a deletear", post)
			for(var comment in post.comments)
			{
				// console.log("comment", post.comments[comment]);
				// console.log("autorNick", post.comments[comment].author.username);
				// console.log("autorUID", post.comments[comment].author.uid);
				Profile.deleteCommentFromProfile(post.comments[comment].author.uid, comment);
			}
			// console.log("Author Post", post.author.uid);
			// console.log("ID POST", post.$id);
			Profile.deletePostFromProfile(post.author.uid, post.$id);



			var hilo = ref.child('posts').child(post.section).child(post.$id);
			hilo.remove();
		}
	};

	return Post;
}]);