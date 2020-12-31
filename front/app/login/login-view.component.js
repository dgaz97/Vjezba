angular.module('myApp.login-view')
    .component('loginView', {
        templateUrl: 'login/login-view.template.html',
        controller: ['$cookies', '$route', '$window', 'Login', '$rootScope',
            function LoginController($cookies, $route, $window, Login, $rootScope) {
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

                        $rootScope.username=self.user;
                        $cookies.put("loggedIn", true);
                        $window.location.href = "#!/home";
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