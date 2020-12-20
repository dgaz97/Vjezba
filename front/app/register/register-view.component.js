angular.module('myApp.register-view')
    .component('registerView', {
        templateUrl: 'register/register-view.template.html',
        controller: ['$routeParams', 'Register', function RegisterController($routeParams, Register) {
            var self=this;
            self.brojKorisnika=0;
            self.user=Register.get({Id:self.brojKorisnika});

            self.updateUser = function updateUser(){
                self.user=Register.get({Id:self.brojKorisnika});
            }
            
            self.test = "kkkkkjjjjj";
        }]
    });