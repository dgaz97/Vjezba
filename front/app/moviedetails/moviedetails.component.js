angular.module('myApp.movieDetails').component('movieDetails', {
    templateUrl: 'moviedetails/moviedetails.template.html',
    controller: ['$scope', '$routeParams', 'MovieDetails', 'CountryName', 'GetGenresOfMovie', '$window', function MovieDetailsController($scope, $routeParams, MovieDetails, CountryName, GetGenresOfMovie, $window) {
        var self = this;
        self.movie;
        MovieDetails.getMovie({ id: $routeParams.movieId }).$promise.then(function (data) {
            self.movie = data.filmEntry;

            CountryName.getCountryName({ code: self.movie.countryOfOrigin }).$promise.then(function (data2) {
                self.movie.countryName = data2.countryName;
            });

        });

        GetGenresOfMovie.getGenresOfMovie({ idFilm: $routeParams.movieId }).$promise.then(function (data) {
            self.genres = data.genres;
        });


        self.openEdit = function () {
            $window.location.replace('#!/movie/edit/' + $routeParams.movieId)
        }
        
        var tp = new kendo.template(
            '<img src="#=data#" style="height:100%;" class="center-block"/>'
        );

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: "https://localhost:44385/image/getall/movie/" + $routeParams.movieId,
                dataType: "jsonp"
            }
        });


        angular.element("#imageview").kendoScrollView({
            dataSource: dataSource,
            template: tp,
            contentHeight: "100%",
            enablePager: true
        });

        dataSource.fetch(function () {
            if (dataSource.data().length==0){
                angular.element("#imageview").hide();
            }
        });


    }]
})