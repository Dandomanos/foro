'use strict';

/**
 * @ngdoc filter
 * @name blogApp.filter:startFrom
 * @function
 * @description
 * # startFrom
 * Filter in the blogApp.
 */
angular.module('blogApp')
  .filter('startFrom', function () {
    return function (input, start) {
    	if(input.length!==undefined)
    	{	
	    	start = +start;//parse to int
	      	return input.slice(start);
  		}
    };
  });
