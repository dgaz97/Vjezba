angular
    .module('core.register')
    .factory('Register', ['$resource',
        function ($resource) {
            return $resource('https://localhost:44385/api/user/:Id', {}, {
                query: {
                    method: 'GET',
                    params:{Id:'Id'},
                    isArray: true
                }
            });
        }
    ]);