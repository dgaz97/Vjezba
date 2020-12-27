angular.module('myApp.nav').component('navigation',{
    templateUrl: 'nav/nav.template.html',
    controller: ["$cookies","$scope", function NavigationController($cookies, $scope){
        var self=this;
        self.hideLoginButtons=$cookies.get("loggedIn");

        $scope.$watch(function() { return $cookies.get("loggedIn"); }, function(newValue) {
            //console.log('Cookie string: ' + $cookies.get("loggedIn"));
            self.hideLoginButtons=newValue;
        });
    }]
});