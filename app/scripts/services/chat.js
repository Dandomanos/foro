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
        return chat.$add(mensaje).then(Chat.cleanChat()).catch(function(error)
          {
            console.log("se ha producido un error al enviar el mensaje", error);
          });
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
      },
      cleanChat:function()
      {
        var limite = new Date().getTime();
        var tresHoras = 3600000*3;
        var unMinuto = 60000;
        // limite.setDate(limite.getDate()-0.125);
        // limite.setDate(limite.getDate()-0.0001);
        limite -= unMinuto;

        console.log("limite", limite);

        var messages = ref.child('chat').child('messages').orderByChild('date').endAt(limite);
        messages.once("value", function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var key = childSnapshot.key();
            console.log("Key", key);

            ref.child('chat').child('messages').child(key).remove(function(error){
              if(error)
              {
                console.log("Error", error);
              } else
              {
                console.log("Mensaje eliminado con el id", key);
              }
            });

            // var childData = childSnapshot.val();
            // console.log("childData", childData);
          });
        });
        console.log("Chat cleaned"); 
        
      },
      deleteMessagesBefore:function(date, callback){
        var messages = ref.child('chat').child('messages').orderByChild('date').endAt(date);
        messages.once("value", function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var key = childSnapshot.key();
            console.log("Key", key);

            ref.child('chat').child('messages').child(key).remove();

            var childData = childSnapshot.val();
            console.log("childData", childData);
          });
        });

        console.log("borrado finalizado");
        callback();
        // var old = messages.orderByChild('date').endAt(date);
        // var listener = old.on('child_added', function(snapshot){
        //   console.log("ref", snapshot.ref().key());
        //   return snapshot.ref().remove(callback);

        // });
        // angular.forEach(messages.snapshot, function(snapshot){
        //   console.log("REF", snapshot);
        // });
        // return messages.remove(callback);
      }
    };


    return Chat;
    
    
  }]);
