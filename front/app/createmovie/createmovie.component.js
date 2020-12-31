angular.module('myApp.createMovie').component('createMovie', {
    templateUrl: "createmovie/createmovie.template.html",
    controller: ['AddMovie', 'CountryList', '$window', function CreateMovieController(AddMovie, CountryList, $window) {
        var self = this;

        self.title;
        self.description;
        self.country;
        self.duration;
        self.status;
        self.releaseDate;

        self.maxDate = new Date();

        self.durationOK = false;
        self.titleOK = false;
        self.dateOK = false;
        self.allOK = false;

        self.durationRegex = /^([0-9]{1,}){1}:([0-5][0-9]){1}:([0-5][0-9]){1}$/;

        CountryList.getCountries().$promise.then(function (data) {
            self.countries = data.countries;
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
                if (data.success == true)
                    $window.location.href = "#!/movieDetails/" + $routeParams.id;
            });
        }

        self.checkOK = function () {
            self.allOK = self.durationOK && self.titleOK && self.dateOK;
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


    }]
})