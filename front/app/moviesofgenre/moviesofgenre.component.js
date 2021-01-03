angular.module('myApp.moviesOfGenre').component('moviesOfGenre', {
    templateUrl: 'moviesofgenre/moviesofgenre.template.html',
    controller: ['$routeParams', 'GetMoviesOfGenre', 'GetGenre', function MoviesOfGenreController($routeParams, GetMoviesOfGenre, GetGenre) {
        var self = this;

        GetGenre.getGenre({ id: $routeParams.id }).$promise.then(function (data) {
            self.genreName = data.genre.name;
        })

        GetMoviesOfGenre.getMoviesOfGenre({ idGenre: $routeParams.id }).$promise.then(function (data) {
            self.listOfMovies = data.filmEntries;
        });
    }]
})