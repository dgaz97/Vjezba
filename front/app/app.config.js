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
            .when('/bootstrap/bs1', {
                template: '<bs1></bs1>'
            })
            .when('/bootstrap/bs2', {
                template: '<bs2></bs2>'
            })
            .when('/bootstrap/bs3', {
                template: '<bs3></bs3>'
            })
            .when('/register', {
                template: '<register-view></register-view>'
            })
            .when('/login',{
                template: '<login-view></login-view>'
            })
            .when('/myLists',{
                template: '<my-lists></my-lists>'
            })
            .when('/allMovies',{
                template: '<all-movies></all-movies>'
            })
            .when('/movieDetails/:movieId',{
                template: '<movie-details></movie-details>'
            })
            .when('/movie/new',{
                template: '<create-movie></create-movie>'
            })
            .otherwise('/home');

    }]
    );