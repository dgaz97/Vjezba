angular.module('myApp.movieDetails').component('movieDetails',{
    templateUrl:'moviedetails/moviedetails.template.html',
    controller:['$routeParams','MovieDetails', 'CountryName', function MovieDetailsController($routeParams,MovieDetails, CountryName){
        var self=this;
        self.movie;
        MovieDetails.getMovie({id:$routeParams.movieId}).$promise.then(function(data){
            self.movie = data.filmEntry;
            
            CountryName.getCountryName({code: self.movie.countryOfOrigin}).$promise.then(function(data2){
                self.movie.countryName = data2.countryName;
            });

        });
    }]
})