'use strict';


// Declare app level module which depends on views, and core components
angular
  .module('myApp', [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'core',
    'myApp.nav',
    'myApp.home',
    'myApp.view2',
    'myApp.bs1',
    'myApp.bs2',
    'myApp.bs3',
    'myApp.register-view',
    'myApp.login-view',
    'myApp.allMovies',
    'myApp.myLists',
    'myApp.movieDetails',
    'myApp.createMovie',
    'myApp.version'
  ])
  .run(['$window','$rootScope', '$location','$cookies', function ($window, $rootScope, $location, $cookies) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      console.log($cookies.get("loggedIn"));
      if ($cookies.get("loggedIn")!="true") {
        if(next.originalPath!="/register"&&next.originalPath!="/login"){
          event.preventDefault();
          $location.path('/login');
        }
      }
      else{
        if(next.originalPath=="/register"||next.originalPath=="/login"){
          event.preventDefault();
          $location.path('/home');
        }
      }
    })
  }]);
