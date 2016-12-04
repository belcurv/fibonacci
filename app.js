(function () {
    'use strict';
    
    angular.module('fibonacci', [])
    
    .controller('fibonacciCtrl', ['$scope', function ($scope) {
        
        /*
        
        UP: x: -(previous LEFT box's 'x' value), y: -(width + previous LEFT box's 'y' value)
        LEFT: x: -(width + previous LEFT box's 'x' value) , y: previous UP box's 'y' value
        DOWN: x: previous LEFT box's 'x' value , y: previous LEFT box's 'y' value + previous
                 LEFT box's 'height'. NOTE: the 1st element is a DOWN square that breaks the rule.  It's coords are 0,0, dimensions: 1x1.
        RIGHT: x: previous DOWN box's 'x' value + previous DOWN box's width , y: previous LEFT
                  box's 'y' value
                  
        <rect x="0"     y="0"    width="1"    height="1"   />   <!-- down -->
        <rect x="0"     y="1"    width="1"    height="1"   />   <!-- right  -->
        <rect x="0"     y="-2"   width="2"    height="2"   />   <!-- up -->
        <rect x="-3"    y="-2"   width="3"    height="3"   />   <!-- left -->
        <rect x="-3"    y="1"    width="5"    height="5"   />   <!-- down -->
        <rect x="2"     y="-2"   width="8"    height="8"   />   <!-- right -->
        <rect x="-3"    y="-15"  width="13"   height="13"  />   <!-- up -->
        <rect x="-24"   y="-15"  width="21"   height="21"  />   <!-- left -->
        <rect x="-24"   y="6"    width="34"   height="34"  />   <!-- down -->
        <rect x="10"    y="-15"  width="55"   height="55"  />   <!-- right -->
        <rect x="-24"   y="-104" width="89"   height="89"  />   <!-- up -->
        <rect x="-168"  y="-104" width="144"  height="144" />   <!-- left -->
        <rect x="-168"  y="40"   width="233"  height="233" />   <!-- down -->
        <rect x="65"    y="-104" width="377"  height="377" />   <!-- right -->
        <rect x="-168"  y="-714" width="610"  height="610" />   <!-- up -->
        <rect x="-1155" y="-714" width="987"  height="987" />   <!-- left -->
        <rect x="-1155" y="273"  width="1597" height="1597" />  <!-- down -->
        <rect x="442"   y="-714" width="2584" height="2584" />  <!-- right -->
        
        */
        
        
        // generate squares attribute arrays
        function generateSquaresArray(iterations) {
            // setup
            var i, c,
                a = 0,
                b = a + 1, // init `b` as 1 more than `a`
                results = [
                    [0, 0, 1, 1],
                    [0, 1, 1, 1]
                ],
                step = 3,
                x,
                y,
                width,
                height,
                series = generateSeries(iterations);
            
            console.log(series);
            
//            // UP
//            for (i = 2; i < series.length -1; i += 4) {
//                var newX,
//                    newY,
//                    widthHeight;
//                
//                if ( !series[i - 3] ) {
//                    console.log('element not found');
//                    newX = 0;
//                    newY = -2;
//                    results.push([newX, newY, series[i+1], series[i+1]]);
//                } else {
//                    console.log('element found!: ' + series[i - 3]);
//                    // x: -(previous LEFT box's 'x' value)
//                    newX = -1 * results[(i - 3)][0];
//                    // y: -(width + previous LEFT box's 'y' value)
//                    newY = -1 * (series[i] + results[i - 3][1]);
//                    results.push([newX, newY, series[i], series[i]]);
//                }
//                
//                console.log(results[i]);
//                
//            }
            
            return results;
        }
        
        console.log(generateSquaresArray(19));
        
        

        // generate Fibonacci series
        function generateSeries(iterations) {
            // setup
            var i, c,
                a = 0,
                b = a + 1, // init `b` as 1 more than `a`
                results = [0, 1];   // this works
            
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