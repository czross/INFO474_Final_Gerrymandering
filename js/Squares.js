/**
 * Created by Christopher on 5/22/2016.
 */

var Squares = function() {
    var color1, color2, height, width, rectSize;

    color1 = "orange";

    color2 = "green";

    height = 900;

    width = 900;

    rectSize = 10;
    
    var chart = function(selection) {

        selection.each(function(data) {
            var div = d3.select(this);

            var svg = div.append("svg")
                .attr("width", width + "px")
                .attr("height", height + "px")
                .append("g");

            var rect = div.selectAll("rect")
                .data(data)
                .enter().append("rect")
                .attr("x", function(d) {d.x})
                .attr("y", function(d) {d.y})
            
        })

    };
};