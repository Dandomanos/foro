'use strict';

/**
 * @ngdoc filter
 * @name blogApp.filter:actualMessages
 * @function
 * @description
 * # actualMessages
 * Filter in the blogApp.
 */
angular.module('blogApp')
  .filter('actualMessages', function () {
    return function (input, conexion) {
      var out = [];
      // console.log("Conexion1", conexion);
      angular.forEach(input, function(mensaje) 
      {
      	// console.log("Conexion2", conexion);
      	//Cambiar valor por conexión al chat
      	if(mensaje.date>=conexion)
      	{
      		
      		out.push(mensaje);
      	}

      });

      return out;
    };
  });
