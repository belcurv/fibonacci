(function () {
    'use strict';

    angular.module('fibapp', [])
    
        .factory('fibFactory', function () {
        
            /* GENERATE FIBONACCI SERIES
             *
             * @params  [number]    iterations    [number of times to iterate]
             * @returns [array]                   [the Fibonacci series]
            */
            function generateSeries(iterations) {
                
                // setup
                var i, c,
                    a = 0,
                    b = a + 1,   // init `b` as 1 more than `a`
                    results = [0, 1];

                // populate the rest of the array
                for (i = 2; i < iterations; i += 1) {
                    c = a + b;
                    results.push(c);  // push sum
                    a = b;            // shift a to b's val
                    b = c;            // shift b to c's val
                }

                return results;
            }
        
            // Return da smethod(s)
            return {
                generateSeries: generateSeries
            };

        })

        .controller('fibController', ['$scope', 'fibFactory', function ($scope, fibFactory) {

            $scope.iterations = 19;
            $scope.series = fibFactory.generateSeries;
            
        }])

        .directive('fibonacci', ['fibFactory', function (fibFactory) {

            // Directive link function
            function link(scope, element, attrs) {
                
                var ns = 'http://www.w3.org/2000/svg',
                    svgElem = angular.element(document.getElementById('fibonacci'));
                
                
                // MAIN RENDER RUNCTION
                function render() {
                    
                    // empty svgElem before each rebuild
                    svgElem.empty();
                    
                    // rebuild and append child nodes
                    elementBuilder(scope.iterations);
                    
                }
                
                
                // watch scope.iterations for changes and re-render fibonacci flower
                scope.$watch('iterations', function () {
                    render();
                });
                
                
                /* GENERATE ARRAYS OF ATTRIBUTES FOR <rect> ELEMENTS
                 *
                 * @params    [number]    iterations    [number of times to iterate]
                 * @returns   [array]                   [array of x,y,width]
                */
                function generateSquaresArray(iterations) {
                    
                    var series = fibFactory.generateSeries(iterations),
                        results = [
                            [0, -1, 1],
                            [1, 0, 1]
                        ],
                        i,
                        Xn,
                        Yn;

                    for (i = 2; i < series.length - 1; i += 1) {

                        // Xn = Math.abs(Yn-1)
                        Xn = Math.abs(results[(i - 1)][1]);
                        
                        // Yn = -((Wn-2) + (Yn-2))
                        Yn = -((results[(i - 2)][2]) - Math.abs((results[(i - 2)][1])));
                        
                        // push new <rect> attrs to results array
                        results.push([Xn, Yn, series[i + 1]]);
                    }

                    return results;

                }

                
                /* BUILD <rect> ELEMENTS AND ATTACH TO MAIN <svg> ELEMENT
                 *
                 * @params  [number]   iterations    [number of times to iterate]
                 * @returns                          [nothing]
                */
                function elementBuilder(iterations) {
                    var squaresArray = generateSquaresArray(iterations),
                        rectElem;

                    // iterate over squaresArray
                    squaresArray.forEach(function (element) {

                        // create <rect> element & add attributes from squaresArray
                        rectElem = angular.element(document.createElementNS(ns, 'rect'))
                            .attr('x', element[0])
                            .attr('y', element[1])
                            .attr('width', element[2])
                            .attr('height', element[2]);   // these are squares! ... width = height 

                        // append <rect> to main <svg> element
                        svgElem.append(rectElem[0]);

                    });

                }
            }

            // MR DDO
            return {
                restrict: 'AE',
                scope: {
                    iterations: '='
                },
                template: '<svg id="fibonacci" width="100%" viewbox="-200 -400 1200 800" xmlns="http://www.w3.org/2000/svg"></svg>',
                link: link
            };

        }]);

}());