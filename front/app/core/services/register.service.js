angular
    .module('core.register')
    .factory('Register', ['$resource',
        function ($resource) {
            return $resource('https://localhost:44385/api/user/:Id', {}, {
                getUser: {
                    method: 'GET',
                    params:{Id:'Id'}
                }
            });
        }
    ])
    .factory('CheckUsername', ['$resource',
        function ($resource) {
            return $resource('https://localhost:44385/api/user/checkUsername/:Username', {}, {
                checkUsername: {
                    method: 'GET',
                    params:{Username:'Username'}
                }
            });
        }
    ])
    .factory('CheckEmail', ['$resource',
        function ($resource) {
            return $resource('https://localhost:44385/api/user/checkEmail/:Email', {}, {
                checkEmail: {
                    method: 'POST',
                    data:{Email:'Email'}
                }
            });
        }
    ]);