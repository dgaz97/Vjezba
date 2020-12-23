angular.module('myApp.login-view')
    .component('loginView', {
        templateUrl: 'login/login-view.template.html',
        controller: ['$window', '$location', 'Login',
            function LoginController($window, $location, Login) {
                var self=this;
                //ng-model
                self.username;
                self.password;
                self.comment;

                self.hideWarning = true;

                self.login = function () {
                    Login.login({ username: self.username, password: self.password }).$promise.then(function (data) {
                        if (data.success!=true){
                            self.comment=data.errorMsg;
                            self.hideWarning=false;
                        }
                        console.log(data);

                        $window.sessionStorage.username = self.username;
                        $window.sessionStorage.loggedIn = true;
                        $location.path("#!/home");
                    }, function(error){
                        console.log(error.data);
                        self.comment=error.data.errorMsg;
                        self.hideWarning=false;
                    });
                }

                self.hideError = function(){
                    self.hideWarning=false;
                    self.comment=null;
                }
            }]
    });