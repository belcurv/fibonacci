/*jslint */
/*global angular */

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
            $scope.showHide = true;
            
        }])

        .directive('fibonacci', ['fibFactory', function (fibFactory) {

            // Directive link function
            function link(scope, element, attrs) {
                
                var ns = 'http://www.w3.org/2000/svg',
                    
                    // cache array of rgba() fill colors
                    fillColorArray = genFillColorArray(35);
                
                
                // MAIN RENDER RUNCTION
                function render() {
                    element.empty();   // empty <svg> before each rebuild
                    elementBuilder(scope.iterations);    // rebuild <svg>
                }
                
                
                // watch scope.iterations for changes and re-render fibonacci flower
                scope.$watchGroup(['iterations', 'show'], function () {
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
                            // [x, y, width, angle]
                            [0, -1, 1, 90],
                            [1, 0, 1, 0]
                        ],
                        i,
                        Xn,
                        Yn,
                        rotationAngle = 270;

                    for (i = 2; i < series.length - 1; i += 1) {
                        
                        // Xn = Math.abs(Yn-1)
                        Xn = Math.abs(results[(i - 1)][1]);
                        
                        // Yn = -((Wn-2) + (Yn-2))
                        Yn = -((results[(i - 2)][2]) - Math.abs((results[(i - 2)][1])));
                        
                        // push new <rect> attrs to results array
                        results.push([Xn, Yn, series[i + 1], rotationAngle]);
                        
                        // Because IE doesn't fully understand SVG CSS transforms,
                        // we have to calculate rotational angle and add it to our
                        // squares array.  The following just rotates by -90 degrees.
                        if (rotationAngle === 0) {
                            rotationAngle = 270;
                        } else {
                            rotationAngle = rotationAngle - 90;
                        }
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
                        rectElem,      // placeholder for <rect> elems
                        group,         // placeholder for <g> elems
                        pathElem,      // placeholder for <path> elems
                        dAttr;         // placeholder for <path> 'd' attr
                        

                    // iterate over squaresArray
                    squaresArray.forEach(function (sq, index) {
                        
                        // create <g>roup element
                        group = angular.element(document.createElementNS(ns, 'g'));

                        // create <rect> element & add attributes from squaresArray
                        rectElem = angular.element(document.createElementNS(ns, 'rect'))
                            .attr('fill', fillColorArray[index])
                            .attr('x', sq[0])
                            .attr('y', sq[1])
                            .attr('width', sq[2])
                            .attr('height', sq[2]);   // these are squares! ... width = height
                        
                        if (scope.show === false) {
                            rectElem.addClass('ng-hide');
                        }
                        
                        // create <path> element
                        pathElem = angular.element(document.createElementNS(ns, 'path'));
                        
                        // assemble <path> 'd' attribute
                        // A rx,ry xAxisRotate LargeArcFlag,SweepFlag x,y"
                        dAttr = 'M' + sq[0] + ',' + (sq[1] + sq[2]) + ' A' + sq[2] + ',' + sq[2] + ', 0, 0, 0, ' + (sq[0] + sq[2]) + ',' + sq[1];
                        
                        // add attrs to <path>
                        pathElem
                            .attr('d', dAttr)
                            .attr('stroke', '#00ffff')
                            .attr('stroke-width', 1)
                            .attr('fill', 'none');
                        
                        // append <rect> and <path> to <g>roup
                        group
                            .attr('transform', 'rotate(' + sq[3] + ')')
                            .append(rectElem)
                            .append(pathElem);

                        // append <rect> to main <svg> element
                        element
                            .append(group);
                    
                    });

                }
                
                
                /* FILL COLOR RANDOMIZER
                 *
                 * @params    [none]
                 * @returns   [string]   [rgba color string]
                */
                function genFillColor() {
                    var r = Math.floor(Math.random() * 256),
                        g = Math.floor(Math.random() * 256),
                        b = Math.floor(Math.random() * 256),
                        a = Math.floor(Math.random() * 100) / 100;
                    
                    return 'rgba(' + [r, g, b, a].join() + ')';
                    
                }
                
                /* RANDOM FILL COLOR ARRAY GENERATOR
                 *
                 * @params    [number]   n   [number of iterations]
                 * @returns   [array]        [array of rgba color strings]
                */
                function genFillColorArray(n) {
                    var fillColorArray = [],
                        i;
                    
                    for (i = 0; i < 35; i += 1) {
                        fillColorArray.push(genFillColor());
                    }
                    
                    return fillColorArray;
                    
                }
                
            }
            

            // MR DDO
            return {
                restrict: 'AE',
                scope: {
                    iterations: '=',
                    show: '='
                },
                link: link
            };

        }]);

}());