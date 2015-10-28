/* global app:true */
/* exported app */

'use strict';

/**
 * @ngdoc overview
 * @name blogApp
 * @description
 * # blogApp
 *
 * Main module of the application.
 */
angular
  .module('blogApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'ui.gravatar'
  ])
  .constant('FIREBASE_URL', 'https://caos.firebaseio.com/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
      .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })
      .when('/posts/:section/:postId', {
        templateUrl: 'views/showpost.html',
        controller: 'PostviewCtrl'
      })
      .when('/section/:section', {
        templateUrl: 'views/section.html',
        controller: 'SectionCtrl'
      })
      .when('/profile/:uid', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
        // ,
        // resolve: {
        //   user: function(Auth) {
        //     return Auth.resolveUser();
        //   }
        // }
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/forgetpassword', {
        templateUrl: 'views/forgetpassword.html',
        controller: 'ForgetpasswordCtrl'
      })
      .when('/unlogged', {
        templateUrl: 'views/unlogged.html',
        controller: 'UnloggedCtrl'
      })
      .when('/desconectado', {
        templateUrl: 'views/desconectado.html',
        controller: 'DesconectadoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
