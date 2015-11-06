'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:NotloggedCtrl
 * @description
 * # NotloggedCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('UnloggedCtrl',['Title',  function (Title) {
    Title.setTitle("Foro CAOS: Usuario desconectado");
  }]);
