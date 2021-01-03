angular.module('myApp.createMovie').component('createMovie', {
    templateUrl: "createmovie/createmovie.template.html",
    controller: ['AddMovie', 'CountryList', 'AllGenres', 'AddGenresToMovie', '$window'
        , function CreateMovieController(AddMovie, CountryList, AllGenres, AddGenresToMovie, $window) {
            var self = this;

            self.title;
            self.description;
            self.country;
            self.duration;
            self.status;
            self.releaseDate;
            self.genres = [];

            self.maxDate = new Date();

            self.durationOK = false;
            self.titleOK = false;
            self.dateOK = false;
            self.genreOK = false;
            self.allOK = false;

            self.durationRegex = /^([0-9]{1,}){1}:([0-5][0-9]){1}:([0-5][0-9]){1}$/;

            CountryList.getCountries().$promise.then(function (data) {
                self.countries = data.countries;
            });

            AllGenres.getAllGenres().$promise.then(function (data) {
                self.allGenres = data.genres;
            });


            self.submit = function ($event) {
                if (!self.allOK) {
                    $event.preventDefault();
                    return;
                }

                AddMovie.addMovie({
                    name: self.title,
                    description: self.description,
                    countryOfOrigin: self.country,
                    duration: self.duration,
                    status: self.status,
                    releaseDate: self.releaseDate.toDateString()
                }).$promise.then(function (data) {
                    if (data.success == true) {
                        AddGenresToMovie.addGenresToMovie({ idMovie: data.id, listOfGenreIds: self.genres }).$promise.then(function (data2) {
                            if (data2.success == true) {
                                $window.location.href = "#!/movieDetails/" + data.id;
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