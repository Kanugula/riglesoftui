/**
 * Created with JetBrains WebStorm.
 * User: engage
 * Date: 8/15/16
 * Time: 2:50 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

/**
 * @ngdoc function
 * @name reverApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reverApp
 */
angular.module('reverApp.controllers')
    .controller('mapsController',['$scope', function ($scope) {

        google.charts.setOnLoadCallback(drawRegionsMap);
        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable([
                ['Country', 'Popularity'],
                ['South America', 600],
                ['Canada', 500],
                ['France', 600],
                ['Russia', 700],
                ['Australia', 600]
            ]);

            var options = { displayMode: 'text' };

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }



    }]);
