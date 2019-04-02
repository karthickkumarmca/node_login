(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope','$window','FlashService','$location'];
    function HomeController(UserService, $rootScope,$window,FlashService,$location) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            
           // loadAllUsers();
           if($rootScope.globals.currentUser==undefined){
                 $location.path('/login');    
           }
           $rootScope.user = $rootScope.globals.currentUser;
        }
        $rootScope.logout = function(){
            $window.sessionStorage.setItem('user_id',0);     
            FlashService.Success('SuccessFully Logout');
            vm.dataLoading = false;   
            $rootScope.globals.currentUser ={}
            $location.path('/login');
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();