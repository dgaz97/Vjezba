angular.module('myApp.movieDetails').component('movieDetails',{
    templateUrl:'moviedetails/moviedetails.template.html',
    controller:['$routeParams','MovieDetails', 'CountryName', 'GetGenresOfMovie', '$window', function MovieDetailsController($routeParams,MovieDetails, CountryName, GetGenresOfMovie, $window){
        var self=this;
        self.movie;
        MovieDetails.getMovie({id:$routeParams.movieId}).$promise.then(function(data){
            self.movie = data.filmEntry;
            
            CountryName.getCountryName({code: self.movie.countryOfOrigin}).$promise.then(function(data2){
                self.movie.countryName = data2.countryName;
            });
            
        });

        GetGenresOfMovie.getGenresOfMovie({idFilm:$routeParams.movieId}).$promise.then(function(data){
            self.genres=data.genres;
        });

        
        self.openEdit = function(){
            $window.location.replace('#!/movie/edit/'+$routeParams.movieId)
        }
        
    }]
})