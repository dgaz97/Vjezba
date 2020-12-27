angular.module('myApp.allMovies').component('allMovies',{
    templateUrl:'allmovies/allmovies.template.html',
    controller:['MovieList', function AllMoviesController(MovieList){
        var self = this;

        MovieList.get({page:1}).$promise.then(function(data){
            console.log(data);
            self.listOfMovies = data.filmEntries;
        });

    }]
})