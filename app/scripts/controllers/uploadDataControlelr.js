/**
 * Created with JetBrains WebStorm.
 * User: engage
 * Date: 8/11/16
 * Time: 1:01 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('reverApp.controllers')
    .controller('UploadCtrl',['$scope','$location','ReverDataModel','FileUploaderService', function ($scope,$location,ReverDataModel,FileUploaderService) {
        console.log(ReverDataModel.getUploadHistory(),"upload data");
        $scope.uploadHistory =  ReverDataModel.getUploadHistory();
        $scope.redirectTo = function(){
            $location.path('/dashboard');
        }




        /* fileUploaderResultHandler */
        var fileUploadResultHandler = FileUploaderService.createResultHandler();
        fileUploadResultHandler.setProgressCallback(function (progress) {
            $scope.$apply(function () {
                $scope.status = "Uploading...";
                $scope.percentComplete = progress.percent;
                if (progress.state == "finished") {
                    $scope.status = "Upload complete, creating banners...";
                }
            });
        });
        fileUploadResultHandler.setSuccessCallback(function (result) {
            $scope.$apply(function () {
                if(result.responseCode===200){
                    for (var index in result.fileData) {
                    }
                    $scope.status = "Finished";
                    $scope.percentComplete = 0;
                    $scope.status = "";
                }
                else{
                    $scope.status = "File upload error, please upload only images of type .jpg/.png/.gif";
                    $scope.percentComplete = 0;
                }
            });
        });
        $scope.fileUploadResultHandler = fileUploadResultHandler;

    }]);