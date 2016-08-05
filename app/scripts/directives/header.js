/**
 * Created by engage on 29-Jul-16.
 */
angular.module('reverApp.directives').
directive('header', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/header.html'
  }
});
