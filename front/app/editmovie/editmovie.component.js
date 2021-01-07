angular.module('myApp.editMovie').component('editMovie', {
    templateUrl: "editmovie/editmovie.template.html",
    controller: ['$scope', 'EditMovie', 'CountryList', 'AllGenres', '$window', 'MovieDetails', 'AddGenresToMovie', 'GetGenresOfMovie', 'MovieImages', 'DeleteImage', '$routeParams'
        , function EditMovieController($scope, EditMovie, CountryList, AllGenres, $window, MovieDetails, AddGenresToMovie, GetGenresOfMovie, MovieImages, DeleteImage, $routeParams) {
            var self = this;

            self.title;
            self.description;
            self.country;
            self.duration;
            self.status;
            self.releaseDate;
            self.genres = [];

            MovieDetails.getMovie({ id: $routeParams.id }).$promise.then(function (data) {
                self.title = data.filmEntry.name;
                self.description = data.filmEntry.description;
                self.country = data.filmEntry.countryOfOrigin
                self.duration = data.filmEntry.duration;
                self.status = data.filmEntry.status;
                self.releaseDate = new Date(data.filmEntry.releaseDate);
            });

            self.durationOK = true;
            self.titleOK = true;
            self.dateOK = true;
            self.genreOK = true;
            self.allOK = true;

            $scope.validate = {
                'allowedExtensions': ['jpg', 'jpeg', 'png', 'webp']
            }

            MovieImages.movieImages({ type: 'movie', id: $routeParams.id }).$promise.then(function (data) {
                let array = [];
                let i = 0;
                data.forEach(x => {
                    array[i] = {};
                    array[i++]['image'] = x;
                });

                self.images = new kendo.data.DataSource({
                    data: array,
                    pageSize: 5
                });

                $scope.deleteImage=function(data){
                    d = [];
                    d.push(data);
                    console.log(d);
                    DeleteImage.deleteImage(params={type:'movie', id:$routeParams.id}, data="fileNames="+d).$promise.then(function(data2){
                        self.images.pushDestroy(data);
                    });
                }

                $scope.mainGridOptions = {
                    dataSource: self.images,
                    pageable: true,
                    columns: [{
                        field: "image",
                        title: "Image",
                        width: "200pt",
                        template: '<img src="#=data.image#" style="height:70pt; max-width:180pt padding:5pt 5pt 5pt 5pt;" class="center-block"/>'
                    }, {
                        title: "Delete image",
                        template: '<button ng-click="deleteImage(\'#=data.image.split("/")[data.image.split("/").length-1]#\')" >delete</button>',
                    }]
                };
            });

            $scope.async = { saveUrl: 'https://localhost:44385/upload/save/movie/' + $routeParams.id, removeUrl: 'https://localhost:44385/upload/remove/movie/' + $routeParams.id, autoUpload: true }

            $scope.onSelect = function (e) {
                var message = $.map(e.files, function (file) { return file.name; }).join(", ");
                console.log("event :: select (" + message + ")");
            }


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