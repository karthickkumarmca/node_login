(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'loginService', 'FlashService','$window','$rootScope'];
    function LoginController($location, loginService, FlashService,$window,$rootScope) {
        var vm = this;

        vm.login = login;
        $rootScope.globals = [];

        (function initController() {
            // reset login status
            //AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;           
            loginService.Login(vm.username, vm.password).then(function(response){
                console.log(response);
                if (response.status==200) {  
                    FlashService.Success(response.message);   
                    $window.sessionStorage.setItem('user_id',response.data.user_id);     
                    //alert( $window.sessionStorage.getItem('user_id'));     
                    FlashService.Error(response.message);
                    vm.dataLoading = false;   
                    $rootScope.globals.currentUser =response.data;
                    //console.log( $rootScope.globals.currentUser);
                    $location.path('/home');
                    //$window.location.href = "http://localhost/learn/signup2/#!/home";
                } else {                   
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
       
    }

})();
