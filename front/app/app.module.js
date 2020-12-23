'use strict';


// Declare app level module which depends on views, and core components
angular
  .module('myApp', [
    'ngRoute',
    'ngResource',
    'core',
    'myApp.home',
    'myApp.view2',
    'myApp.bs1',
    'myApp.bs2',
    'myApp.bs3',
    'myApp.register-view',
    'myApp.login-view',
    'myApp.version'
  ])
  .run(['$window','$rootScope', '$location', function ($window, $rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if ($window.sessionStorage.loggedIn!="true") {
        if(next.originalPath!="/register"&&next.originalPath!="/login"){
          event.preventDefault();
          $location.path('/login');
        }
      }
    })
  }]);
