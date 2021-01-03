angular.module('myApp.allMovies').component('allMovies', {
    templateUrl: 'allmovies/allmovies.template.html',
    controller: ['MovieList', 'NOfPages', '$routeParams', function AllMoviesController(MovieList, NOfPages, $routeParams) {
        var self = this;


        NOfPages.nOfPages().$promise.then(function (data) {
            self.pages = data.numberOfPages;
        });

        MovieList.get({ page: $routeParams.page }).$promise.then(function (data) {
            self.listOfMovies = data.filmEntries;
        });

    }]
})