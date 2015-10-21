'use strict';
/* global Firebase:false */
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
    var chat = $firebaseArray(ref.child('chat').child('messages'));

    var Chat = {
      all: chat,
      filterMessages:function(date)
      {
        return $firebaseArray(ref.child('chat').child('messages').orderByChild("date").startAt(date));
      },
      sendMessage:function(mensaje)
      {
        console.log("Mensaje", mensaje);
        return chat.$add(mensaje);
      },
      addUserToChat:function(user, callback)
      {
        var destino =  ref.child('chat').child('connected').child(user.username);
        return destino.set(user, callback);
      },
      removeUserFromChat:function(username, callback)
      {
        var destino =  ref.child('chat').child('connected').child(username);
        return destino.remove(callback);
      },
      getConnected:function()
      {
        var destino = ref.child('chat').child('connected');
        return $firebaseArray(destino);
      }
    };


    return Chat;
    
    
  }]);
