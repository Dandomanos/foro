'use strict';

/**
 * @ngdoc service
 * @name blogApp.Chat
 * @description
 * # Chat
 * Factory in the blogApp.
 */
angular.module('blogApp')
  .factory('Chat',['$firebaseArray', '$firebaseObject', 'FIREBASE_URL', function($firebaseArray, $firebaseObject, FIREBASE_URL) {

    var ref = new Firebase(FIREBASE_URL);
    var chat = $firebaseArray(ref.child('chat'));

    var Chat = {
      all: chat,
      sendMessage:function(mensaje)
      {
        console.log("Mensaje", mensaje);
        return chat.$add(mensaje);
      },
      lastEntry:function(id, callback)
      {
        ref.child('chat').child('lastEntry').set(id, callback);
      },
      enterChat:function(entered)
      {
        // return chat.$add(entered); 
      }
    };


    return Chat;
    
    
  }]);
