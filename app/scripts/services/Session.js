
angular.module('reverApp.factories').factory('Session',['$window','$cookies',function($window,$cookies){

    return {
        put : function (key, value) {
            $cookies.put(key, value,{ path: '/' });
        },
        get : function (key) {
            return $cookies.get(key);
        },
        update : function(key,val){
            $cookies.remove(key,{ path: '/' });
            this.put(key,val);
        },

        destroy : function () {
            var path = $window.location.pathname;
            localStorage.clear();
            angular.forEach($cookies.getAll(), function(value, key) {
                $cookies.remove(key,{ path: '/' });
            });

            /*if(path.indexOf('/brandbusiness') > -1 || path.indexOf('/influencer') > -1){
             $window.location.href='../';
             }
             else{
             $window.location.href='/';
             }*/
        }
    };
}]);

