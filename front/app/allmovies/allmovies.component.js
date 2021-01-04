angular.module('myApp.allMovies').component('allMovies', {
    templateUrl: 'allmovies/allmovies.template.html',
    controller: ['MovieList', 'NOfPages', 'MovieCountPerGenre', '$routeParams', function AllMoviesController(MovieList, NOfPages, MovieCountPerGenre, $routeParams) {
        var self = this;


        NOfPages.nOfPages().$promise.then(function (data) {
            self.pages = data.numberOfPages;
        });

        MovieList.get({ page: $routeParams.page }).$promise.then(function (data) {
            self.listOfMovies = data.filmEntries;
        });


        MovieCountPerGenre.movieCountPerGenre().$promise.then(function (data) {
            self.genreCount = data;
            console.log(self.genreCount);
            console.log(typeof (self.genreCount));

            var d = new kendo.data.HierarchicalDataSource({
                data: self.genreCount,
                schema: {
                    model: {
                        children: "genres"
                    }
                }
            })
            console.log(d);


            self.treemapOptions = {
                dataSource: d,
                valueField: "count",
                textField: "name",
                colors: [
                    ["#0c81c5", "#c5dceb"], ["#3aa2de", "#d8ecf8"],
                    ["#449000", "#dae9cc"], ["#76b800", "#dae7c3"],
                    ["#ffae00", "#f5e5c3"], ["#ef4c00", "#f1b092"],
                    ["#9e0a61", "#eccedf"]
                ]
            };

            self.tooltipOptions = {
                filter: "div",
                content: function (e) {
                    var treemap = angular.element("#treemap").data("kendoTreeMap");
                    var item = treemap.dataItem(e.target.closest(".k-treemap-tile"));
                    return item.count;
                },
                autoHide: true,
                position: "auto"
            }
        })

    }]
})