/**
 * Created with JetBrains WebStorm.
 * User: engage
 * Date: 8/5/16
 * Time: 10:20 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('reverApp.factories').factory('ReverDataModel', ['$http',
    function ($http) {
        var dashboardData = [];
        var uploadHistory = [];
        return {
            setDashBoardData : function(data){
                dashboardData = data;
            },
            getDashboardData : function(){
                return dashboardData;
            },
            setUploadHistory : function(data){
                uploadHistory = data;
            },
            getUploadHistory : function(){
                return uploadHistory;
            }
        }
    }]);