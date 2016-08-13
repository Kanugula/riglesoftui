
angular.module('reverApp').run(['$rootScope','$window','Session',
    function ($rootScope,$window,Session) {
// Page Loading Overlay


        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            ContentLoaderService.showContentLoader();

            if(Session.get('ICONIC_REACH_TOKEN')){
                if(Session.get('API_URL')){
                    var userObjInSession = UserDataModel.getUserObj();
                    if (!userObjInSession.userId) {
                        return CommonDataModelService.getUserDetails().then(function(){
                            RestrictUtility.checkRouteAccess(e, toState);
                        });
                    }
                    else {
                        RestrictUtility.checkRouteAccess(e, toState);
                        var createCampaignRoutes = ['createCampaign.basicInfo','createCampaign.selectInfluencers','createCampaign.reviewLaunch'];
                        var userOutOfCreateCampaign = _.contains(createCampaignRoutes,fromState.name) && !_.contains(createCampaignRoutes,toState.name);
                        if(userOutOfCreateCampaign){
                            CampaignDataModel.resetCampaignData();
                        }
                    }
                }
                else{
                    e.preventDefault();
                    return CommonDataModelService.getAppSettings();
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
