angular.module('myApp.register-view')
    .component('registerView', {
        templateUrl: 'register/register-view.template.html',
        controller: ['$cookies', '$window', 'Register', 'CheckUsername', 'CheckEmail', '$rootScope',
            function RegisterController($cookies, $window, Register, CheckUsername, CheckEmail, $rootScope) {
                var self = this;

                //ng-model
                self.username;
                self.password1;
                self.password2;
                self.email;
                self.firstName;
                self.lastName;
                self.birthdate;

                //ng-hide
                self.hidePassMismatch = "true";
                self.hideBadPassFormat = "true";
                self.hideUsernameExists = "true";
                self.hideEmailBad = "true";
                self.hideEmailExists = "true";
                self.hideEmptyName = "true";
                self.hideEmptyLastName = "true";
                self.hideBirthdateBad = "true";
                self.hideUsernameShort = "true";

                //Jesu li podaci dobro ispunjeni
                self.usernameOK = "false";
                self.passwordOK = "false";
                self.emailOK = "false";
                self.firstNameOK = "false";
                self.lastNameOK = "false";
                self.birthdateOK = "false";
                self.allOK = false;

                //RegEx
                self.regex = [RegExp('.*[A-Z]+.*'), RegExp('.*[a-z]+.*'), RegExp('.*[0-9]+.*'), RegExp('.{8,}')];
                self.emailRegex = RegExp('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');

                self.passCheck = function () {

                    if (self.password1 != self.password2) {
                        angular.element(document.querySelector("#password1-fg")).addClass("has-error");
                        angular.element(document.querySelector("#password2-fg")).addClass("has-error");
                        self.hidePassMismatch = "false";
                        angular.element(document.querySelector("#check-passworddoesntmatch")).removeClass("ng-hide");
                        self.passwordOK = "false";
                        //self.allGood=false;
                        self.inputOK();
                    } else {
                        angular.element(document.querySelector("#password1-fg")).removeClass("has-error");
                        angular.element(document.querySelector("#password2-fg")).removeClass("has-error");
                        self.hidePassMismatch = "true";
                        angular.element(document.querySelector("#check-passworddoesntmatch")).addClass("ng-hide");
                        self.inputOK();
                    }

                    if (!(self.regex[0].test(self.password1) && self.regex[1].test(self.password1) && self.regex[2].test(self.password1) && self.regex[3].test(self.password1))) {
                        angular.element(document.querySelector("#password1-fg")).addClass("has-error");
                        angular.element(document.querySelector("#password2-fg")).addClass("has-error");
                        self.hideBadPassFormat = "false";
                        angular.element(document.querySelector("#check-passwordwrongformat")).removeClass("ng-hide");
                        self.passwordOK = "false";
                        //self.allGood=false;
                        self.inputOK();
                        return;
                    } else {
                        angular.element(document.querySelector("#password1-fg")).removeClass("has-error");
                        angular.element(document.querySelector("#password2-fg")).removeClass("has-error");
                        self.hideBadPassFormat = "true";
                        angular.element(document.querySelector("#check-passwordwrongformat")).addClass("ng-hide");
                        self.passwordOK = "true";
                        self.inputOK();
                    }
                    //self.allGood=true;
                }

                self.usernameCheck = function () {
                    if (self.username.length < 6) {
                        angular.element(document.querySelector("#username-fg")).addClass("has-error");
                        self.hideUsernameShort = "false";
                        angular.element(document.querySelector("#check-usernameshort")).removeClass("ng-hide");
                        self.usernameOK = "false";
                        self.inputOK();
                        return;
                    } else {
                        angular.element(document.querySelector("#username-fg")).removeClass("has-error");
                        self.hideUsernameShort = "false";
                        angular.element(document.querySelector("#check-usernameshort")).addClass("ng-hide");
                        self.inputOK();
                    }
                    self.userData = CheckUsername.checkUsername({ Username: self.username }).$promise
                        .then(function (data) {
                            if (data.status == 'exists') {
                                angular.element(document.querySelector("#username-fg")).addClass("has-error");
                                self.hideUsernameExists = "false";
                                angular.element(document.querySelector("#check-usernameexists")).removeClass("ng-hide");
                                self.usernameOK = "false";
                                self.inputOK();
                                return;
                            } else {
                                angular.element(document.querySelector("#username-fg")).removeClass("has-error");
                                self.hideUsernameExists = "false";
                                angular.element(document.querySelector("#check-usernameexists")).addClass("ng-hide");
                                self.usernameOK = "true";
                                self.inputOK();
                            }
                        });
                }

                self.emailCheck = function () {
                    //console.log([self.email,(self.emailRegex.test(self.email)), self.emailRegex]);
                    if (!(self.emailRegex.test(self.email))) {
                        angular.element(document.querySelector("#email-fg")).addClass("has-error");
                        self.hideEmailBad = "false";
                        angular.element(document.querySelector("#check-emailbad")).removeClass("ng-hide");
                        self.emailOK == "false";
                        self.inputOK();
                        return;
                    }
                    else {
                        angular.element(document.querySelector("#email-fg")).removeClass("has-error");
                        self.hideEmailBad = "true";
                        angular.element(document.querySelector("#check-emailbad")).addClass("ng-hide");
                        self.inputOK();
                    }
                    self.userData = CheckEmail.checkEmail({ Email: self.email }).$promise
                        .then(function (data) {
                            if (data.status == 'exists') {
                                angular.element(document.querySelector("#email-fg")).addClass("has-error");
                                self.hideEmailExists = "false";
                                angular.element(document.querySelector("#check-emailexists")).removeClass("ng-hide");
                                self.emailOK = "false";
                                self.inputOK();
                                return;
                            } else {
                                angular.element(document.querySelector("#email-fg")).removeClass("has-error");
                                self.hideEmailExists = "false";
                                angular.element(document.querySelector("#check-emailexists")).addClass("ng-hide");
                                self.emailOK = "true";
                                self.inputOK();
                            }
                        });
                }
                self.firstnameCheck = function () {
                    if (!self.firstName) {
                        angular.element(document.querySelector("#firstname-fg")).addClass("has-error");
                        self.hideEmptyName = "false";
                        angular.element(document.querySelector("#check-namenull")).removeClass("ng-hide");
                        self.firstNameOK = "false";
                        self.inputOK();
                        return;
                    } else {
                        angular.element(document.querySelector("#firstname-fg")).removeClass("has-error");
                        self.hideEmptyName = "true";
                        angular.element(document.querySelector("#check-namenull")).addClass("ng-hide");
                        self.firstNameOK = "true";
                        self.inputOK();
                    }
                }
                self.lastnameCheck = function () {
                    if (!self.lastName) {
                        angular.element(document.querySelector("#lastname-fg")).addClass("has-error");
                        self.hideEmptyLastName = "false";
                        angular.element(document.querySelector("#check-lastnamenull")).removeClass("ng-hide");
                        self.lastNameOK = "false";
                        self.inputOK();
                        return;
                    } else {
                        angular.element(document.querySelector("#lastname-fg")).removeClass("has-error");
                        self.hideEmptyLastName = "true";
                        angular.element(document.querySelector("#check-lastnamenull")).addClass("ng-hide");
                        self.lastNameOK = "true";
                        self.inputOK();
                    }
                }
                self.birthdateCheck = function () {
                    var ageDifMs = Date.now() - 86400000 - self.birthdate.getTime();//offset od jedan dan
                    var ageDate = new Date(ageDifMs);
                    var noYears = Math.abs(ageDate.getUTCFullYear() - 1970);

                    console.log(noYears);
                    if (noYears < 13 || noYears > 130) {
                        angular.element(document.querySelector("#birthdate-fg")).addClass("has-error");
                        self.hideBirthdateBad = "false";
                        angular.element(document.querySelector("#check-birthdatebad")).removeClass("ng-hide");
                        self.birthdateOK = "false";
                        self.inputOK();
                        return;
                    } else {
                        angular.element(document.querySelector("#birthdate-fg")).removeClass("has-error");
                        self.hideBirthdateBad = "true";
                        angular.element(document.querySelector("#check-birthdatebad")).addClass("ng-hide");
                        self.birthdateOK = "true";
                        self.inputOK();
                    }
                }
                self.inputOK = function () {
                    if (self.usernameOK == "true" && self.passwordOK == "true" && self.emailOK == "true" && self.firstNameOK == "true"
                        && self.lastNameOK == "true" && self.birthdateOK == "true")
                        self.allOK = true;
                    else
                        self.allOK = false;
                }

                self.submitRegister = function () {
                    Register.register({
                        username: self.username,
                        password: self.password1,
                        email: self.email,
                        firstName: self.firstName,
                        lastName: self.lastName,
                        birthdate: self.birthdate
                    }).$promise.then(function (data) {
                        if (data.success == true) {
                            $rootScope.username = self.user;
                            $cookies.put("loggedIn", true);
                            $window.location.href = "#!/home";
                        }
                    });
                }


            }]
    });