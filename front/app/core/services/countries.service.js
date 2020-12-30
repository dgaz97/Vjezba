angular.module('core.countries')
.factory('CountryList',['$resource', function($resource){
    return $resource('https://localhost:44385/api/country', {}, {
        getCountries:{
            method:'GET'
        },
        isArray:true
    })
}]);