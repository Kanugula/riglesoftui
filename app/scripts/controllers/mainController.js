/**
 * Created by engage on 29-Jul-16.
 */
angular.module('reverApp.controllers')
  .controller('MainCtrl', function ($scope,Session) {
        $scope.logout = function(){
            Session.destroy();
        };
  });
