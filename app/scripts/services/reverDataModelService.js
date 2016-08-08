/**
 * Created with JetBrains WebStorm.
 * User: engage
 * Date: 8/5/16
 * Time: 8:56 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('reverApp.factories').factory('ReverDataModelService', ['ReverServices','$rootScope',
    function(ReverServices,$rootScope) {
        return {
            authenticateUser : function(user){
                console.log(user);
                return ReverServices.login(user).then(function(response){
                    if(response.data.responseCode === 200){
                        $rootScope.isUserLoggedIn = true;
                        $location.path('/dashboard');
                    }else{
                        $rootScope.isUserLoggedIn = false;
                    }
                });
            },
            getDashBoardData : function(){
                return ReverServices.getDashboardData().then(function(response){
                    if(response.data.responseCode === 200){
                        ReverDataModel.setDashboardData(response.data);
                    }else{
                    }
                });
            }
        }
    }]);
