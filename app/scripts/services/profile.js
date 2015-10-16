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
      }
    };


  return Profile;

  }]);
