'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });

  }).
  controller('DeskCtrl', function($scope, $location, socket){

    var token = $location.search().token;
    console.log(token)

    var messageHandler = function(message){
        if(message == "nextSection"){
            $('.dg-next').click(); 
        }
        if(message == "prevSection"){
            $('.dg-prev').click();
        }
    }

    $('#dg-container').gallery();

    socket.on('message:' + token, function(message) {
        messageHandler(message);
    });

    
  }).
  controller('LoginCtrl', function($scope, socket){
    var randomString = function(length){
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
        
        if (! length) {
            length = Math.floor(Math.random() * chars.length);
        }
        
        var str = '';
        for (var i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str; 
    
    }    

    var token = randomString(8);
    socket.on('login:' + token, function(data){
        window.location.href = 'http://192.168.1.103:3000/deck?token=' + token;
    });
    
    $('#qrcode').qrcode({
        text: "http://192.168.1.103:3000/controller?token=" + token 
    });

  }).
  controller('ControllerCtrl', function($scope, $location, socket){
    var token = $location.search().token;

    $scope.left = function(){
        socket.emit('controller', {
            token: token,
            msg: 'left'
        }); 
    }

    $scope.right = function(){
        socket.emit('controller', {
            token: token,
            msg: 'right'
        }); 
    }

    socket.emit('login', {
      token: token 
    }); 

  }).
  controller('MyCtrl1', function ($scope, socket) {
   socket.on('send:time', function (data) {
      $scope.time = data.time;
    });
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  });
