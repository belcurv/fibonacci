(function () {
    'use strict';

    angular.module('fibonacci', [])

    .controller('fibonacciCtrl', ['$scope', function ($scope) {

        var iterations = 19,
            ns = 'http://www.w3.org/2000/svg',
            series = generateSeries(iterations);

        $scope.iterations = 19;

        // generate squares attribute arrays
        function generateSquaresArray(iterations) {
            // setup
            var i,
                results = [
                [0, -1, 1, 1],
                [1, 0, 1, 1]
             ],
                Xn,
                Yn;

            for (i = 2; i < series.length - 1; i += 1) {

                // Xn = Math.abs(Yn-1)
                Xn = Math.abs(results[(i - 1)][1]);
                // Yn = -((Wn-2) + (Yn-2))
                Yn = -((results[(i - 2)][2]) - Math.abs((results[(i - 2)][1])));
                // push new <rect> attrs to results array
                results.push([Xn, Yn, series[i + 1], series[i + 1]]);
            }

            return results;

        }

        // build each <rect> element and attach it to the <svg>
        (function elementBuilder(iterations) {
            var squaresArray = generateSquaresArray(iterations),
                svgElem = angular.element(document.getElementById('fibonacci')),
                rectElem;

            squaresArray.forEach(function (element) {

                rectElem = angular.element(document.createElementNS(ns, 'rect'))
                    .attr('x', element[0])
                    .attr('y', element[1])
                    .attr('width', element[2])
                    .attr('height', element[3]);

                svgElem.append(rectElem[0]);

            });

        }(iterations));


        // generate Fibonacci series
        function generateSeries(iterations) {
            // setup
            var i, c,
                a = 0,
                b = a + 1, // init `b` as 1 more than `a`
                results = [0, 1]; // this works

            // populate the rest of the array
            for (i = 2; i < iterations; i += 1) {
                c = a + b; // sum
                // results.push([c, b]); // push sum !! breaks !!
                results.push(c); // push sum
                a = b; // shift a to b's val
                b = c; // shift b to c's val
            }

            return results;
        }

        $scope.generateSeries = generateSeries;

   }]);

}());