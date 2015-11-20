'use strict';
/* global $:false */
/**
 * @ngdoc directive
 * @name blogApp.directive:scrollChat
 * @description
 * # scrollChat
 */
 
angular.module('blogApp')
  .directive('scrollChat', ['$timeout', function ($timeout) {
    return {
      scope: {
      		scrollChat: '='
      },
      link: function postLink(scope, element) {

        scope.$watchCollection('scrollChat', function (newValue) {
        	$timeout(function()
        	{
        		$(element).scrollTop($(element)[0].scrollHeight);
        	});
        	if(newValue)
        	{
        		// console.log("newVAlue");
        		$(element).scrollTop($(element)[0].scrollHeight);
        	}
        });
      }
    };
  }]);
