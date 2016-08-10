'use strict';

/**
 * @ngdoc function
 * @name reverApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reverApp
 */
angular.module('reverApp.controllers')
    .controller('DashboardCtrl',['$scope', function ($scope) {

        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['1st quarter', 11],
                ['2nd quarter',2],
                ['3nd quarter',2],
                ['4th quarter',2]
            ]);

            var options = {
                height: 400,
                width:300,
                title: 'SALES ACTIVITY',
                pieHole: 0.5,
                pieSliceTextStyle: {
                    color: ''
                },
                legend:{position:'bottom',maxLines: 1,alignment:'center',width:'50%'} ,
                backgroundColor: '#ddd',
                chartArea:{
                    height:'60%',
                    width:'100%'
                }
            };

            var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
            chart.draw(data, options);
            console.log(options.width/2-50)
            $("text:contains(" + options.title + ")").attr({'x':options.width/2-50, 'y':'40'});
        }
        /*$scope.myChartObject = {};

        $scope.myChartObject.type = "LineChart";

        $scope.onions = [
            {v: "Onions"},
            {v: 3},
        ];

        $scope.myChartObject.data = {"cols": [
            {id: "t", label: "Topping", type: "date"},
            {id: "s", label: "Slices", type: "number"}
        ], "rows": [
            {c: [
                {v: "new Date(2314, 2, 15)"},
                {v: 3},
            ]},
            {c: $scope.onions},
            {c: [
                {v: "new Date(2314, 2, 15)"},
                {v: 31}
            ]},
            {c: [
                {v: "new Date(2314, 2, 15)"},
                {v: 1},
            ]},
            {c: [
                {v: "new Date(2314, 2, 15)"},
                {v: 2},
            ]}
        ]};

        $scope.myChartObject.options = {
            'title': 'How Much Pizza I Ate Last Night'
        };*/
    }]);
