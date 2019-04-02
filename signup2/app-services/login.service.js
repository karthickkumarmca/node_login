(function () {
    'use strict';
    angular
            .module('app')
            .factory('loginService', loginService);

    loginService.$inject = ['$http',];
    function loginService($http) {
        var service = {};

             
        service.Login = Login;
        service.getData = getData;
        service.registerUser = registerUser;
       /* service.getCheckdomain=getCheckdomain;
        service.forgot_password=forgot_password;*/
      
      

       
        return service;

		//Administrator Login Api call
        function Login(username,password) {
            var data = {username:username,password:password}
            return $http.post('http://localhost:3000/login/check',data).then(handleSuccess, handleError('Error info'));            
        }
        function getData(id) {
            return $http.get('http://localhost:3000/login/getData?id='+id).then(handleSuccess, handleError('Error info'));            
        }
        function registerUser(data) {
            return $http.post('http://localhost:3000/login/addData',data).then(handleSuccess, handleError('Error info'));            
        }

        //check domain()
        /*function getCheckdomain(){            
            return $http.get(CONFIG.API_URL + 'domain/checkdomain').then(handleSuccess, handleError('Error getting site info'));
        }   
        function forgot_password(data) {
            // return $http.post(CONFIG.API_URL + 'appsettings/forgot_password',data).then(handleSuccess, handleError('Error info'));
            return $http.post(CONFIG.NODE_URL + 'administrator/forgot_password',data).then(handleSuccess, handleError('Error info'));
        }*/

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return {success: false, message: error};
            };
        }
    }

})();
