'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });

    socket.on('test', function(data){
      console.log(data);
    });
  }).
  controller('AdCtrl', function ($scope, $location, socket) {
    $scope.publish = function(){
      socket.emit('ad:publish', $scope.ad, function(){
        window.alert('ok'); 
      });
    }
  }).
  controller('MyCtrl1', function ($scope, socket) {
   socket.on('send:time', function (data) {
      $scope.time = data.time;
    });
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  });
