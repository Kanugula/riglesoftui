'use strict';

/**
 * @ngdoc overview
 * @name reverApp
 * @description
 * # reverApp
 *
 * Main module of the application.
 */
angular
    .module('reverApp', [
        'ngAnimate',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'googlechart',
        'toaster',
        'ui.bootstrap',

        'reverApp.factories',
        'reverApp.services',
        'reverApp.directives',
        'reverApp.controllers',

    ])
    .config(function ($routeProvider,$httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .when('/upload', {
                templateUrl: 'views/upload.html',
                controller: 'UploadCtrl',
                controllerAs: 'upload',
                resolve : {
                    uploadHistory : function(ReverDataModelService){
                        return ReverDataModelService.getUploadHistory();
                    }
                }
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboard'/*,
                 resolve : {
                 DashBoardData : function(ReverDataModelService){
                 return ReverDataModelService.getDashBoardData();
                 }
                 }*/
            })
            .otherwise({
                redirectTo: '/'
            });
        /**
         * $http configuration
         *
         * Configuring $http requests to send cookies to cross domains
         */
        $httpProvider.defaults.withCredentials = true;
        //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    })
