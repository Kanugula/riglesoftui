/**
 * Created with JetBrains WebStorm.
 * User: engage
 * Date: 8/5/16
 * Time: 8:56 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('reverApp.factories').factory('ReverDataModelService', ['ReverServices','$rootScope','ToasterService','$location','ReverDataModel',
    function(ReverServices,$rootScope,ToasterService,$location,ReverDataModel) {
        return {
            authenticateUser : function(user){
                console.log(user);
                return ReverServices.login(user).then(function(response){
                    if(response.data.responseCode === 200){
                        $rootScope.isUserLoggedIn = true;
                        $location.path('/upload');
                    }else{
                        ToasterService.showErrorMessage('error',"Error While Login");
                        $rootScope.isUserLoggedIn = false;
                    }
                });
            },
            getUploadHistory : function(){
                return ReverServices.getUploadData().then(function(response){
                    if(response.data.responseCode === 200){
                        ReverDataModel.setUploadHistory(response.data);
                    }else{
                    }
                });
            },
            getDashBoardData : function(){
                return ReverServices.getDashboardData().then(function(response){
                    if(response.data.responseCode === 200){
                        ReverDataModel.getUploadHistory(response.data);
                    }else{
                    }
                });
            }
        }
    }]);
