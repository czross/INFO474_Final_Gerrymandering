
(function() {
    var app = angular.module("Gerrymandering", []);
    app.controller("bodyCtrl", function($scope) {
        /**
         * Used by Mike's scroller directive.
         * @type {number}
         */
        $scope.sectionHeight = 600;

        //Width and height
        var w = 1000;
        var h = 500;
        var now = d3.select(".now")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        var between = d3.select(".between")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        var past = d3.select(".past")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        d3.json("data/washington_64_to_72.geojson", function(json) {
            draw(json, past);
        });

        d3.json("data/washington_91_to_92.geojson", function(json) {
            draw(json, between);
        });

        d3.json("data/washington_108_to_112.geojson", function(json) {
            draw(json, now);
        });

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
        var width = 960,
            height = 600;

        var rateById = d3.map();

        var quantize = d3.scale.quantize()
            .domain([0, .15])
            .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

        var projection = d3.geo.albersUsa()
            .scale(1280)
            .translate([width / 2, height / 2]);

        var path = d3.geo.path()
            .projection(projection);

        var svg = d3.select(".vis2").append("svg")
            .attr("width", width)
            .attr("height", height);

        queue()
            .defer(d3.json, "./data/us.json")
            .defer(d3.tsv, "./data/unemployment.tsv", function(d) { rateById.set(d.id, +d.rate); })
            .await(ready);

        function ready(error, us) {
            if (error) throw error;

            svg.append("g")
                .attr("class", "counties")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.counties).features)
                .enter().append("path")
                .attr("class", function(d) { return quantize(rateById.get(d.id)); })
                .attr("d", path);

            svg.append("path")
                .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                .attr("class", "states")
                .attr("d", path);
        }

        d3.select(self.frameElement).style("height", height + "px");

        var draw = function(json, state) {
            //Define map projection
            var projection = d3.geo.albersUsa()
                .translate([w + 1000, h + 900])
                .scale([6000]);
            //Define path generator
            var path = d3.geo.path()
                .projection(projection);
            //Create SVG element

            //Load in GeoJSON data
            state.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", "steelblue");

            path.exit().remove();
            state.exit().remove();
        };


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
                    svg.datum(root).call(chart);
                });
            }
            if($scope.step == 3) {
                d3.json("data/square2.json", function(error, root) {
                    if (error) throw error;
                    svg.datum(root).call(chart);
                });
            }
            if($scope.step == 4) {
                d3.json("data/packing1.json", function(error, root) {
                    if (error) throw error;
                    svg.datum(root).call(chart);
                });
            }
            if($scope.step == 5) {
                d3.json("data/packing2.json", function(error, root) {
                    if (error) throw error;
                    svg.datum(root).call(chart);
                });
            }
            if($scope.step == 6) {
                d3.json("data/cracking.json", function(error, root) {
                    if (error) throw error;
                    svg.datum(root).call(chart);
                });
            }
            if($scope.step == 8) {
                d3.json("data/minority.json", function(error, root) {
                    if (error) throw error;
                    svg.datum(root).call(chart);
                });
            }
            if($scope.step == 9) {
                d3.json("data/minority2.json", function(error, root) {
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


