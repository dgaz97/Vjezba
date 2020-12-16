angular
    .module('myApp')
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider
            .when('/home', {
                template: '<home></home>'
            })
            .when('/view2', {
                templateUrl: '/view2/view2.html'
            })
            .otherwise('/home');
    }]
);