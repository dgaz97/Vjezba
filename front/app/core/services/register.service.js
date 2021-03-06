angular
    .module('core.register')
    .factory('Register', ['$resource',
        function ($resource) {
            return $resource('https://localhost:44385/api/user/', {}, {
                register: {
                    method: 'POST',
                    data:
                    {
                        username: "",
                        password: "",
                        email: "",
                        firstName: "",
                        lastName: "",
                        birthdate: ""
                    }
                }
            });
        }
    ])
    .factory('CheckUsername', ['$resource',
        function ($resource) {
            return $resource('https://localhost:44385/api/user/checkUsername/', {}, {
                checkUsername: {
                    method: 'POST',
                    data: { Username: '' }
                }
            });
        }
    ])
    .factory('CheckEmail', ['$resource',
        function ($resource) {
            return $resource('https://localhost:44385/api/user/checkEmail/', {}, {
                checkEmail: {
                    method: 'POST',
                    data: { Email: '' }
                }
            });
        }
    ]);