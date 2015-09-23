'use strict';

/**
 * @ngdoc service
 * @name blogApp.profile
 * @description
 * # profile
 * Factory in the blogApp.
 */
angular.module('blogApp')
  .factory('Profile',['$firebaseObject', 'FIREBASE_URL', function($firebaseObject, FIREBASE_URL) {

    var ref = new Firebase(FIREBASE_URL);
    // var posts = $firebaseArray(ref.child('profile'));

    var Profile = {
      all: posts, 
      get: function (postId) {
        return $firebaseObject(ref.child('profile').child(uid));
        }
    };


  return Profile;

  }]);
