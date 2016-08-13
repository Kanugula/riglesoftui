/**
 * Created with JetBrains WebStorm.
 * User: engage
 * Date: 8/5/16
 * Time: 8:49 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('reverApp.factories').factory('ReverServices', ['$http','Assets',
    function ($http,Assets) {
        return {
            loginURL : 'auth/sign-in',
            uploadDataURL : 'api/upload',
            dashboardDataURL : '',
            login : function(data){
                return $http({
                    method: 'POST',
                    data: data,
                    headers: {'Content-Type': 'application/json'},
                    url :Assets.apiurl+ this.loginURL
                });
            },

            getUploadData : function(){
                return $http({
                    method: 'POST',
                    data: data,
                    headers: {'Content-Type': 'application/json'},
                    url :Assets.apiurl+ this.uploadDataURL
                });
            },

            getDashboardData : function(){
                return $http.get(Assets.apiurl+this.dashboardDataURL,params);
            }

        }
    }]);