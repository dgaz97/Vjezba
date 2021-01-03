angular.module('myApp.editMovie').component('editMovie', {
    templateUrl: "editmovie/editmovie.template.html",
    controller: ['EditMovie', 'CountryList', 'AllGenres', '$window', 'MovieDetails', 'AddGenresToMovie', 'GetGenresOfMovie', '$routeParams'
        , function CreateMovieController(EditMovie, CountryList, AllGenres, $window, MovieDetails, AddGenresToMovie, GetGenresOfMovie, $routeParams) {
            var self = this;

            self.title;
            self.description;
            self.country;
            self.duration;
            self.status;
            self.releaseDate;
            self.genres = [];

            MovieDetails.getMovie({ id: $routeParams.id }).$promise.then(function (data) {
                console.log(data);
                self.title = data.filmEntry.name;
                self.description = data.filmEntry.description;
                self.country = data.filmEntry.countryOfOrigin
                self.duration = data.filmEntry.duration;
                self.status = data.filmEntry.status;
                console.log(data.filmEntry.releaseDate);
                self.releaseDate = new Date(data.filmEntry.releaseDate);
                console.log(self.releaseDate);
            });

            self.durationOK = true;
            self.titleOK = true;
            self.dateOK = true;
            self.genreOK = true;
            self.allOK = true;


            self.durationRegex = /^([0-9]{1,}){1}:([0-5][0-9]){1}:([0-5][0-9]){1}$/;

            CountryList.getCountries().$promise.then(function (data) {
                self.countries = data.countries;
            });

            AllGenres.getAllGenres().$promise.then(function (data) {
                self.allGenres = data.genres;
            });

            GetGenresOfMovie.getGenresOfMovie({ idFilm: $routeParams.id }).$promise.then(function (data) {
                data.genres.forEach(x => self.genres.push(x.id));
            })


            self.submit = function ($event) {
                if (!self.allOK) {
                    $event.preventDefault();
                    return;
                }

                EditMovie.editMovie({
                    Id: $routeParams.id,
                    name: self.title,
                    description: self.description,
                    countryOfOrigin: self.country,
                    duration: self.duration,
                    status: self.status,
                    releaseDate: self.releaseDate.toDateString()
                }).$promise.then(function (data) {
                    if (data.success == true) {

                        AddGenresToMovie.addGenresToMovie({ idMovie: $routeParams.id, listOfGenreIds: self.genres }).$promise.then(function (data) {
                            if (data.success == true) {
                                $window.location.href = "#!/movieDetails/" + $routeParams.id;
                            }
                        })
                    }

                });
            }

            self.checkOK = function () {
                self.allOK = self.durationOK && self.titleOK && self.dateOK && self.genreOK;
            }

            self.checkDuration = function () {
                self.durationOK = self.duration.match(self.durationRegex);
                self.checkOK();
            }

            self.checkReleasedate = function () {
                self.dateOK = !(!self.releaseDate || /^\s*$/.test(self.releaseDate));
                //console.log(self.releaseDate.toDateString());
                self.checkOK();
            }

            self.checkTitle = function () {
                self.titleOK = !(!self.title || /^\s*$/.test(self.title));
                self.checkOK();
            }
            self.checkGenre = function () {
                self.genreOK = !(self.genres === undefined || self.genres.length == 0);
                self.checkOK();
            }


        }]
})