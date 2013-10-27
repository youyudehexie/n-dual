'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',

  // 3rd party dependencies
  'btford.socket-io'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/main',
      controller: 'AppCtrl'
    }).
    when('/controller', {
      templateUrl: 'partials/controller',
      controller: 'ControllerCtrl'
    }).
    when('/desk', {
      templateUrl: 'partials/desk',
      controller: 'DeskCtrl'
    }).
    when('/ad', {
      templateUrl: 'partials/ad',
      controller: 'AdCtrl'
    }).
    when('/login', {
      templateUrl: 'partials/login',
      controller: 'LoginCtrl'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
