angular.module('myApp.movieDetails').component('movieDetails',{
    templateUrl:'moviedetails/moviedetails.template.html',
    controller:['$routeParams','MovieDetails', function MovieDetailsController($routeParams,MovieDetails){
        var self=this;
        self.movie;
        MovieDetails.getMovie({id:$routeParams.movieId}).$promise.then(function(data){
            self.movie = data.filmEntry;
        });
    }]
})