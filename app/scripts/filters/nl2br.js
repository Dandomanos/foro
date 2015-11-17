'use strict';

/**
 * @ngdoc filter
 * @name blogApp.filter:nl2br
 * @function
 * @description
 * # nl2br
 * Filter in the blogApp.
 */
angular.module('blogApp')
  .filter('nl2br', function () {
    return function (data) {
      if(!data) {return data;}
      return data.replace(/\n\r?/g, '<br />');
    };
  });
