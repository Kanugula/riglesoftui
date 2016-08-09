/**
 * Created with JetBrains WebStorm.
 * User: engage
 * Date: 8/5/16
 * Time: 8:49 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('reverApp.factories').factory('ReverServices', ['$http',
    function ($http) {
        return {
            loginURL : 'http://localhost:9000/api/auth/sign-in',
            dashboardDataURL : '',
            login : function(data){
                var params = 'username='  +data.username+ '&password=' +data.password;
                return $http({
                    method: 'POST',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url : this.loginURL
                });
                //return $http.post(this.loginURL,data);
            },

            getDashboardData : function(){
                return $http.get(this.dashboardDataURL,params);
            }

        }
    }]);