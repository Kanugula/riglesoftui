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
        $scope.uploadHistory =  [{
            "uploadFileName": "productuploadrt1.xls",
            "uploadType": "PRODUCT",
            "uploadTime": "2009-06-10",
            "uploadStatus": true,
            "uploadFinishedTime": "2009-06-10",
            "companyId": 11415,
            "uploadedBy": 2533,
            "totalRecords": 22,
            "successCount": 21,
            "skippedCount": 0,
            "failedCount": 0,
            "currentRowProcessed": 22
        },
            {
                "uploadFileName": "productuploadrt.xls",
                "uploadType": "EQUIPMENT",
                "uploadTime": "2009-06-10",
                "uploadStatus": true,
                "uploadFinishedTime": "2009-06-10",
                "companyId": 11415,
                "uploadedBy": 2533,
                "totalRecords": 25,
                "successCount": 0,
                "skippedCount": 24,
                "failedCount": 0,
                "currentRowProcessed": 25
            },
            {
                "uploadFileName": "manufacturer product sample iii.xls",
                "uploadType": "EQUIPMENT",
                "uploadTime": "2009-05-28",
                "uploadStatus": true,
                "uploadFinishedTime": "2009-05-28",
                "companyId": 1323,
                "uploadedBy": 2451,
                "totalRecords": 51,
                "successCount": 50,
                "skippedCount": 0,
                "failedCount": 0,
                "currentRowProcessed": 51
            },
            {
                "uploadFileName": "manufacturer product sample iii.xls",
                "uploadType": "EQUIPMENT",
                "uploadTime": "2009-05-28",
                "uploadStatus": true,
                "uploadFinishedTime": "2009-05-28",
                "companyId": 1323,
                "uploadedBy": 2451,
                "totalRecords": 51,
                "successCount": 50,
                "skippedCount": 0,
                "failedCount": 0,
                "currentRowProcessed": 51
            },
            {
                "uploadFileName": "manufacturer product sample iii.xls",
                "uploadType": "EQUIPMENT",
                "uploadTime": "2009-05-28",
                "uploadStatus": true,
                "uploadFinishedTime": "2009-05-28",
                "companyId": 1323,
                "uploadedBy": 2451,
                "totalRecords": 51,
                "successCount": 50,
                "skippedCount": 0,
                "failedCount": 0,
                "currentRowProcessed": 51
            }];
        $scope.redirectTo = function(){
            $location.path('/dashboard');
        };

        $scope.exportSample=function(){
            window.open('ExcelSample/WarrantyUploadTemplate.xls');
        };



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