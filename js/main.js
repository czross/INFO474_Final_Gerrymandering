
(function() {
    var app = angular.module("Gerrymandering", []);
    app.controller("bodyCtrl", function($scope) {
        /**
         * Used by Mike's scroller directive.
         * @type {number}
         */
        $scope.sectionHeight = 600;

        /**
         * This is where we set up the initial visualization so that the scrolling done
         * by users can manipulate this. NOTE** This is purely d3 to show where d3 code
         * goes. There is still no communication between Angular and D3 at this point.
         **/
        
        var chart = Squares(".vis");

        var svg = chart.svg();
        
        d3.json("data/Pre-Title.json", function(error, root) {
            if (error) throw error;
            svg.datum(root).call(chart);
        });

        /**
         * This is where we can make changes to the visualization rendered by the code
         * above. The left panel is the scrolling region and the right panel is the
         * visualization region. This is where the two libraries communicate.
         */
        $scope.$watch('step', function() {
            /** See console log for number output as you scroll **/
            console.log($scope.step);
            if($scope.step == 0) {
                d3.json("data/Pre-Title.json", function(error, root) {
                    if (error) throw error;
                    svg.datum(root).call(chart);
                });
            }
            if($scope.step == 1) {
                d3.json("data/Title.json", function(error, root) {
                    if (error) throw error;
                    svg.datum(root).call(chart);
                });
            }
            if($scope.step == 2) {
                d3.json("data/square1.json", function(error, root) {
                    if (error) throw error;
                    console.log(root);
                    svg.datum(root).call(chart);
                });
            }
            if($scope.step == 3) {
                d3.json("data/square2.json", function(error, root) {
                    if (error) throw error;
                    svg.datum(root).call(chart);
                });
            }
        });
    });

    app.directive("scroll", function() {
        return {
            restrict: 'E',
            scope: false,
            link: function(scope, elem) {
                elem.bind("scroll", function() {
                    scope.step = Math.ceil((this.scrollTop - 10) / scope.sectionHeight);
                    scope.$apply();
                });
            }
        };
    });
})();



