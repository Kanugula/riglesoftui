/**
 * Created with JetBrains WebStorm.
 * User: engage
 * Date: 8/5/16
 * Time: 8:56 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('reverApp.factories').factory('ReverDataModelService', ['ReverServices','$rootScope','ToasterService','$location','ReverDataModel','Session',
    function(ReverServices,$rootScope,ToasterService,$location,ReverDataModel,Session) {
        return {
            authenticateUser : function(user){
                return ReverServices.login(user).then(function(response){
                    if(response.status === 200){
                        Session.put('regus_token',response.data.result.token);
                        $rootScope.isUserLoggedIn = true;
                        $location.path('/upload');
                        console.log("token",Session.get('regus_token'));
                    }else{
                        ToasterService.showErrorMessage('error',"Error While Login");
                        $rootScope.isUserLoggedIn = false;
                    }
                });
            },
            getUploadHistory : function(){
                return ReverServices.getUploadData().then(function(response){
                    if(response.status === 200){
                        ReverDataModel.setUploadHistory(response.data.result);
                    }else{
                        ToasterService.showErrorMessage('error',"Error While Login");
                    }
                });
            },
            getDashBoardData : function(){
                return ReverServices.getDashboardData().then(function(response){
                    if(response.status === 200){
                        ReverDataModel.getUploadHistory(response.data);
                    }else{
                    }
                });
            }
        }
    }]);
