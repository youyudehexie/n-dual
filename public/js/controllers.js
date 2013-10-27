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
    socket.on('ok', function(data){
        console.log(data); 
    })
    $scope.publish = function(){
      socket.emit('ad:publish', $scope.ad, function(){
        window.alert('ok'); 
      });
    }
  }).
  controller('DeskCtrl', function($scope, $location, socket){

    var token = $location.search().token;

    $('#dg-container').gallery();

    socket.on('desk:' + token, function(data){
        if(data.msg == 'right'){
          $('.dg-prev').click(); 

        }
        if(data.msg == 'left'){
           $('.dg-next').click();          
        }
    })

    $scope.test = function(){
        
    }
     // $('.dg-prev').click();
     
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
        window.location.href = 'http://192.168.1.103:3000/desk?token=' + token;
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
