'use strict';

/**
 * @ngdoc function
 * @name reverApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reverApp
 */
angular.module('reverApp.controllers')
    .controller('LoginCtrl',['$scope','$location','ReverDataModelService', function ($scope,$location,ReverDataModelService) {
        $scope.user = {username: '',password:''};
        $scope.showMsg = false;

        $scope.loginDashBoard = function(){
            if($scope.user.username !== '' && $scope.user.password !== ''){
                $scope.showMsg = false;
                ReverDataModelService.authenticateUser($scope.user);
            }else{
                $scope.showMsg = true;
            }
        };
    }]);
