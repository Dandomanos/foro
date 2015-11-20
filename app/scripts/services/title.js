'use strict';

/**
 * @ngdoc service
 * @name blogApp.title
 * @description
 * # title
 * Factory in the blogApp.
 */
angular.module('blogApp')
  .factory('Title',['$rootScope', function ($rootScope) {
    var title = 'Foro CAOS';
    return {
    title: function() { console.log("Title", title); return title; },
    setTitle: function(newTitle) { 
      // console.log("newTitle", newTitle);
      // console.log("oldTitle", title);
      $rootScope.title = newTitle; }
    };
  }]);
