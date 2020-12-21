angular.module('myApp.register-view')
    .component('registerView', {
        templateUrl: 'register/register-view.template.html',
        controller: ['$routeParams', 'Register', 'CheckUsername',
         function RegisterController($routeParams, Register, CheckUsername) {
            var self = this;
            self.brojKorisnika = 5;

            self.username;
            self.password1;
            self.password2;
            self.email;
            self.firstName;
            self.lastName;

            self.hidePassMismatch = "true";
            self.hideBadPassFormat = "true";
            self.hideUsernameExists = "true";

            //self.allGood=false;

            self.regex = [RegExp('.*[A-Z]+.*'), RegExp('.*[a-z]+.*'), RegExp('.*[0-9]+.*'), RegExp('.{8,}')];



            //self.user=CheckUsername.checkUsername({Username:self.username});

            /*self.updateUser = function updateUser(){
                self.user=Register.getUser({Id:self.brojKorisnika});
            }

            self.testfun=function (){
                angular.element(document.querySelector("#username-fg")).addClass("has-error");
            }
            self.testfun2=function (){
                angular.element(document.querySelector("#username-fg")).removeClass("has-error");
            }*/

            self.passCheck = function () {

                if (self.password1 != self.password2) {
                    angular.element(document.querySelector("#password1-fg")).addClass("has-error");
                    angular.element(document.querySelector("#password2-fg")).addClass("has-error");
                    self.hidePassMismatch = "false";
                    angular.element(document.querySelector("#check-passworddoesntmatch")).removeClass("ng-hide");
                    //self.allGood=false;
                    return;
                } else {
                    angular.element(document.querySelector("#password1-fg")).removeClass("has-error");
                    angular.element(document.querySelector("#password2-fg")).removeClass("has-error");
                    self.hidePassMismatch = "true";
                    angular.element(document.querySelector("#check-passworddoesntmatch")).addClass("ng-hide");
                }

                if (!(self.regex[0].test(self.password1) && self.regex[1].test(self.password1) && self.regex[2].test(self.password1) && self.regex[3].test(self.password1))) {
                    angular.element(document.querySelector("#password1-fg")).addClass("has-error");
                    angular.element(document.querySelector("#password2-fg")).addClass("has-error");
                    self.hideBadPassFormat = "false";
                    angular.element(document.querySelector("#check-passwordwrongformat")).removeClass("ng-hide");
                    //self.allGood=false;
                    return;
                } else {
                    angular.element(document.querySelector("#password1-fg")).removeClass("has-error");
                    angular.element(document.querySelector("#password2-fg")).removeClass("has-error");
                    self.hideBadPassFormat = "true";
                    angular.element(document.querySelector("#check-passwordwrongformat")).addClass("ng-hide");
                }
                //self.allGood=true;
            }

            self.usernameCheck = function () {
                self.userData = CheckUsername.checkUsername({ Username: self.username }).$promise
                .then(function(data){
                    if (data.status == 'exists') {
                        angular.element(document.querySelector("#username-fg")).addClass("has-error");
                        self.hideUsernameExists = "false";
                        angular.element(document.querySelector("#check-usernameexists")).removeClass("ng-hide");
                        return;
                    } else {
                        angular.element(document.querySelector("#username-fg")).removeClass("has-error");
                        self.hideUsernameExists = "false";
                        angular.element(document.querySelector("#check-usernameexists")).addClass("ng-hide");
                    }
                });



            }

            self.test = "kkkkkjjjjj";
        }]
    });