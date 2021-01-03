angular.module('core.movies')
.factory('MovieList',['$resource', function($resource){
    return $resource('https://localhost:44385/api/filmEntries?page=:page', {}, {
        getPage:{
            method:'GET',
            params:{
                page:'@page'
            },
            isArray:true
        }
    })
}])
.factory('MovieDetails',['$resource', function($resource){
    return $resource('https://localhost:44385/api/filmEntries?id=:id', {}, {
        getMovie:{
            method:'GET',
            params:{
                id:'@id'
            }
        }
    })
}])
.factory('AddMovie',['$resource', function($resource){
    return $resource('https://localhost:44385/api/filmEntries/create', {}, {
        addMovie:{
            method:'POST',
            data:{
                    name:"",
                    description:"",
                    countryOfOrigin:"",
                    duration:"",
                    status:"",
                    releaseDate:""
            }
        }
    })
}])
.factory('EditMovie',['$resource', function($resource){
    return $resource('https://localhost:44385/api/filmEntries/edit', {}, {
        editMovie:{
            method:'POST',
            data:{
                    Id:0,
                    name:"",
                    description:"",
                    countryOfOrigin:"",
                    duration:"",
                    status:"",
                    releaseDate:""
            }
        }
    })
}])
.factory('NOfPages',['$resource', function($resource){
    return $resource('https://localhost:44385/api/filmEntries/nofpages', {}, {
        nOfPages:{
            method:'GET'
        }
    })
}])
.factory('AllGenres',['$resource', function($resource){
    return $resource('https://localhost:44385/api/genre', {}, {
        getAllGenres:{
            method:'GET'
        }
    })
}])
.factory('AddGenresToMovie',['$resource', function($resource){
    return $resource('https://localhost:44385/api/genre/add', {}, {
        addGenresToMovie:{
            method:'POST'
        },
        data:{
            idMovie:0,
            listOfGenreIds:[]
        }
    })
}])
.factory('GetGenresOfMovie',['$resource', function($resource){
    return $resource('https://localhost:44385/api/genre?idFilm=:idFilm', {}, {
        getGenresOfMovie:{
            method:'GET'
        },
        params:{
            idFilm:0
        }
    })
}])
.factory('GetMoviesOfGenre',['$resource', function($resource){
    return $resource('https://localhost:44385/api/genre?idGenre=:idGenre', {}, {
        getMoviesOfGenre:{
            method:'GET'
        },
        params:{
            idGenre:0
        }
    })
}])
.factory('GetGenre',['$resource', function($resource){
    return $resource('https://localhost:44385/api/genre?id=:id', {}, {
        getGenre:{
            method:'GET'
        },
        params:{
            id:0
        }
    })
}]);