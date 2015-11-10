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
        return $firebaseArray(ref.child('profile').child(uid));
        },
      getAll: function()
      {
        // return $firebaseObject(ref.child('profile').orderByChild('-lastConnection'));
        return $firebaseArray(ref.child('profile'));
      },
      getPosts: function(uid) {
        return $firebaseArray(ref.child('profile').child(uid).child('posts'));
      },
      getComments: function(uid){
        return $firebaseArray(ref.child('profile').child(uid).child('comments'));
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
      deletePost:function(post)
      {
        console.log("POST to delete", post);
        for(var comment in post.comments)
        {
          Profile.deleteCommentFromProfile(post.comments[comment].author.uid, comment);
        }

        // Profile.deletePostFromProfile(post.author.uid, post.$id);
        var hilo = ref.child('posts').child(post.section).child(post.$id);
        hilo.remove();
      },
      deleteProfile:function(uid)
      {
          //Cargamos el perfil
          var profile = $firebaseObject(ref.child('profile').child(uid));
          var username = '';
          profile.$loaded(function(){
            console.log("perfil cargado", profile);
            username = profile.username;
            //Borramos los comentarios realizados de cada hilo
            for(var comment in profile.comments)
            {
              var ID = profile.comments[comment].postId;
              var section = profile.comments[comment].section;
              var commmentID = profile.comments[comment].commentId;
              // console.log("comment", comment);
              // console.log("postID of comment", ID);
              // console.log("comment Section", section);
              ref.child('posts').child(section).child(ID).child('comments').child(commmentID).remove(function(error){
                if(error)
                {
                  console.log("Se ha producido un error al borrar el comentario", error.code);
                } else
                {
                  console.log("comentario borrado del hilo correctamente");
                }
              });

            }
            //borramos los post creados por el usuario
            for(var post in profile.posts)
            {
              console.log("post", post);
              var postID = profile.posts[post].postId;
              var sectionPost = profile.posts[post].section;
              var POST = $firebaseObject(ref.child('posts').child(sectionPost).child(postID));

              POST.$loaded(function(authData){
                
                  console.log("AuthData", authData);
                  
                  // borramos los comentarios puestos en post del perfil a borrar
                  for(var comment in authData.comments)
                  {
                    Profile.deleteCommentFromProfile(authData.comments[comment].author.uid, comment);
                  }

                  //borramos el post en el que venían los comentarios
                  console.log("section", sectionPost);
                  console.log("ID", authData.$id);
                  var hilo = ref.child('posts').child(sectionPost).child(authData.$id);
                  hilo.remove(function(error){
                    if(error){ console.log("Error al remover el hilo", error.code);} else{
                      console.log("Hilo removido correctamente");
                    }
                  });

              });
              
            }

            //Finalmente borramos el perfil y eliminamos el usuario
            ref.child('profile').child(uid).remove(function(error){
              if(error){ console.log("Error al remover el perfil", error.code);} else{
                      console.log("Perfil removido correctamente");
                      console.log("Removemos del chat el usuario", username);
                      ref.child('chat').child('connected').child(username).remove(function(error){
                        if(error) { console.log("Error al remover al usuario del chat", error.code);} else {
                          console.log("Usuario", username + " removido del chat");
                        }
                      });
                    }
            });

          });
      },
      deleteCommentFromProfile:function(uid, commentid)
      {
        var thisComment = ref.child('profile').child(uid).child('comments').orderByChild('commentId').equalTo(commentid);
        thisComment.once("value", function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var key = childSnapshot.key();
            console.log("KEY", key);

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
          });
        });
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
