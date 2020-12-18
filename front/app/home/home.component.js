'use strict';

angular.module('myApp.home')
.component('home', {
  templateUrl:'home/home.template.html',
  controller:['$routeParams', function HomeController($routeParams){
    var self=this;
    self.test='Ovo je testni tekst';
  }]
});