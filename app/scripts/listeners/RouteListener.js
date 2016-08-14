
angular.module('reverApp').run(['$rootScope','$window','Session','ContentLoaderService',
    function ($rootScope,$window,Session,ContentLoaderService) {
// Page Loading Overlay


        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            ContentLoaderService.showContentLoader();
            if(Session.get('regus_token')){
                if($location.path() === '/' || $location.path() === '/login'){
                    $location.path('/upload');
                }
            }
            else{
                e.preventDefault();
                Session.destroy();
            }
        });

        $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
            $($window).scrollTop(0);
            ContentLoaderService.hideContentLoader();
        });

    }]);
