'use strict';

/* global Firebase:false */

/**
 * @ngdoc service
 * @name blogApp.profile
 * @description
 * # profile
 * Factory in the blogApp.
 */
angular.module('blogApp')
  .factory('Profile',['$firebaseObject', 'FIREBASE_URL', '$firebaseArray', function($firebaseObject, FIREBASE_URL, $firebaseArray) {

    var ref = new Firebase(FIREBASE_URL);
    // var posts = $firebaseArray(ref.child('profile'));

    var Profile = {
      // all: posts, 
      get: function (uid) {
        return $firebaseObject(ref.child('profile').child(uid));
        },
      getAll: function()
      {
        // return $firebaseObject(ref.child('profile').orderByChild('-lastConnection'));
        return $firebaseArray(ref.child('profile'));
      },
      setSilenceState:function(uid, state)
      {
        // console.log("Usuario", uid);
        // console.log("Silenciado", state);
        ref.child('profile').child(uid).child('silenced').set(state);
      },
      setBlindState:function(uid, state)
      {
        // console.log("Usuario", uid);
        // console.log("Silenciado", state);
        ref.child('profile').child(uid).child('blind').set(state);
      },
      deleteProfile:function(uid)
      {
          var profile = $firebaseObject(ref.child('profile').child(uid));
          profile.$loaded(function(){
            console.log("perfil cargado", profile);
            for(var comment in profile.comments)
            {
              var ID = profile.comments[comment].postId;
              var section = profile.comments[comment].section;
              console.log("comment", comment);
              console.log("postID of comment", ID);
              console.log("comment Section", section);
              ref.child('posts').child(section).child(ID).child('comments').child(comment).remove(function(error){
                if(error)
                {
                  console.log("Se ha producido un error al borrar el comentario", error.code);
                } else
                {
                  console.log("comentario borrado del hilo correctamente");
                }
              });

            }
            for(var post in profile.posts)
            {
              console.log("post", post);
              console.log("postID of post", profile.posts[post].postId);
              console.log("post Section", profile.posts[post].section);
            }
          });
      },
      deleteCommentFromProfile:function(uid, commentid)
      {
        var thisComment = ref.child('profile').child(uid).child('comments').orderByChild('postId').equalTo(commentid);
        thisComment.once("value", function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var key = childSnapshot.key();

            ref.child('profile').child(uid).child('comments').child(key).remove(function(error)
            {
              if(error)
              {
                console.log("Error al eliminar el comentario del perfil", error);
              } else
              {
                console.log("Comentario eliminado del perfil", uid + " - " + commentid);
              }
            });
          })
        })
      },
      deletePostFromProfile:function(uid, postid)
      {
        var thisPost = ref.child('profile').child(uid).child('posts').orderByChild('postId').equalTo(postid);
        thisPost.once("value", function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var key = childSnapshot.key();
            // console.log("Key", key);
            ref.child('profile').child(uid).child('posts').child(key).remove(function(error)
            {
              if(error)
              {
                console.log("Error al eliminar el post del perfil", error);
              } else
              {
                console.log("Post borrado del perfil", uid + " - " + postid);
              }
            });
          });
        });
      }
    };


  return Profile;

  }]);
