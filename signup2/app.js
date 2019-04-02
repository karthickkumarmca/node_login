(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })
            .when('/confirmation/:id', {
                controller: 'ConfimationController',
                 templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            });

            //.otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http','$window','loginService'];
    function run($rootScope, $location, $cookies, $http,$window,loginService) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register','/confirmation']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            
            if($window.sessionStorage.getItem('user_id')>0){
                //alert($window.sessionStorage.getItem('user_id'));
                loginService.getData($window.sessionStorage.getItem('user_id')).then(function(response){
                console.log(response);
                if (response.status==200) {                     
                    $rootScope.globals.currentUser =response.data;                    
                }                 
            });
            }
            else if (restrictedPage && !loggedIn) {
                //$location.path('/login');
            }
        });
    }

})();