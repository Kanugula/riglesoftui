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
            uploadDataURL : '',
            dashboardDataURL : '',
            login : function(data){
                console.log(Assets.apiurl);
                return $http({
                    method: 'POST',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url :Assets.apiurl+ this.loginURL
                });
                //return $http.post(this.loginURL,data);
            },

            getUploadData : function(){
                return $http.get(Assets.apiurl+this.uploadDataURL);
            },

            getDashboardData : function(){
                return $http.get(Assets.apiurl+this.dashboardDataURL,params);
            }

        }
    }]);