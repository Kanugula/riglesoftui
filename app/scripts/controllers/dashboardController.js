'use strict';

/**
 * @ngdoc function
 * @name reverApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reverApp
 */
angular.module('reverApp.controllers')
    .controller('DashboardCtrl',['$scope','$routeParams', function ($scope,$routeParams) {

         google.charts.load("current", {packages:["corechart",'geochart']});
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
                width:600,
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
            $("text:contains(" + options.title + ")").attr({'x':options.width/2-50, 'y':'40'});
        }

        $scope.chartObject = {};

        $scope.onions = [
            {v: ""},
            {v: 3},
        ];

        $scope.chartObject.data = {"cols": [
            {id: "t", label: "date", type: "string"},
            {id: "s", label: "Total Registrations", type: "number"}
        ], "rows": [
            {c: [
                {v: "Wed 15 Jul 2015"},
                {v: 100},
            ]},
            {c:  [
                {v: "Wed 15 Jul 2015"},
                {v: 500},
            ]},
            {c: [
                {v: "Fri 20 Aug 2016"},
                {v: 131}
            ]},
            {c: [
                {v: "Sat 25 Sep 2016"},
                {v: 506},
            ]},
            {c: [
                {v: "Mon 31 Oct 2016"},
                {v: 200},
            ]}
        ]};


        // $routeParams.chartType == BarChart or PieChart or ColumnChart...
        $scope.chartObject.type = 'AreaChart';
        $scope.chartObject.options = {
            'title': '',
            pointSize: 10,
            legend: 'none',
            backgroundColor: '#887D79',
            colors: ['#FFFFFF']
        };

        $scope.today = function() {
            $scope.startDate = new Date();
            $scope.endDate = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.startDate = null;
            $scope.endDate = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return false;
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.startDate = new Date(year, month, day);
            $scope.endDate = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }




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
