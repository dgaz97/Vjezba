angular
.module('core.login')
.factory('Login', ['$resource', function($resource){
    return $resource('https://localhost:44385/api/user/login', {}, {
        login:{
            method:'POST',
            data:{
                username: "",
                password: ""
            }
        }
    })
}]);