'use strict';

/**
 * @ngdoc filter
 * @name blogApp.filter:parseUrl
 * @function
 * @description
 * # parseUrl
 * Filter in the blogApp.
 */
angular.module('blogApp')
  .filter('parseUrl', function() {
    var urls = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
    var emails = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;

    return function(text) {
        if(text!==undefined)
        {
            if(text.match(urls)) {
                text = text.replace(urls, "<a href=\"$1\" target=\"_blank\">$1</a>");
            }
            if(text.match(emails)) {
                text = text.replace(emails, "<a href=\"mailto:$1\">$1</a>");
            }    
        }        
        

        return text;     
    };
});
