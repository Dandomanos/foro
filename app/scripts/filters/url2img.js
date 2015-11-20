'use strict';

/**
 * @ngdoc filter
 * @name blogApp.filter:url2img
 * @function
 * @description
 * # url2img
 * Filter in the blogApp.
 */
angular.module('blogApp')
  .filter('url2img', function () {
    return function (input) {
      var find = new RegExp("(.png|.jpg|.jpeg)$");

      var data = input;

      if(find.test(input))
      {
      	data = '<img src="'+input+'">';
      }
      	return data;
    };
  });
