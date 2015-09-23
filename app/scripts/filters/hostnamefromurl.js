'use strict';

/**
 * @ngdoc filter
 * @name blogApp.filter:hostnameFromUrl
 * @function
 * @description
 * # hostnameFromUrl
 * Filter in the blogApp.
 */
angular.module('blogApp')
  .filter('hostnameFromUrl', function () {
    return function (str) {
      var url = document.createElement('a');
      url.href = str;
      return url.hostname;
    };
  });
