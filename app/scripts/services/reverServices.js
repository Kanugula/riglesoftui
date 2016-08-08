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
                return $http.post(this.loginURL,data);
            },

            getDashboardData : function(){
                return $http.get(this.dashboardDataURL,params);
            }

        }
    }]);