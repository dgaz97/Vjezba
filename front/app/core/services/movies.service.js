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
}]);