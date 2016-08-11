/**
 * Created with JetBrains WebStorm.
 * User: engage
 * Date: 8/11/16
 * Time: 1:01 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('reverApp.controllers')
    .controller('UploadCtrl',['$scope','$location','ReverDataModel', function ($scope,$location,ReverDataModel) {
        console.log(ReverDataModel.getUploadHistory(),"upload data");
        $scope.redirectTo = function(){
            $location.path('/dashboard');
        }
    }]);