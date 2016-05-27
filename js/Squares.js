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
            
            var orange, green, lines;
            
            var filterData= function() {
                orange = data.filter(function(d) {
                    return d.type = "orange";k
                });
                green = data.filter(function(d) {
                    return d.type = "green";
                });
                lines = data.filter(function(d) {
                    return d.type = "lines";
                });
            };

            filterData()

            var svg = div.append("svg")
                .attr("width", width + "px")
                .attr("height", height + "px")
                .append("g");

            var rectOrange = div.selectAll("rect")
                .data(orange)
                .enter().append("rect")
                .attr("x", function(d) {d.x})
                .attr("y", function(d) {d.y})
                .attr("height", rectSize + "px")
                .attr("width", rectSize + "px")
                .attr("fill", color1);

            var rectGreen = div.selectAll("rect")
                .data(green)
                .enter().append("rect")
                .attr("x", function (d) {d.x1})
                .attr("y", function (d) {d.y1})
                .attr("height", rectSize + "px")
                .attr("width", rectSize + "px")
                .attr("fill", color2);

            var line = div.selectAll("line")
                .data(lines)
                .enter().append("line")
                .attr("x1", function(d) {d.x1})
                .attr("y1", function(d) {d.y1})
                .attr("x2", function(d) {d.x2})
                .attr("y2", function(d) {d.y2})
                .attr("stroke-width", "2px");

            rectOrange.exit().remove();
            rectGreen.exit().remove();
            line.exit().remove();

            //not yet ready
            rectOrange.transition()
                .duration(1500)
                .delay(function(d,i){return i*50})
                .attr('x1', function(d){return d.x1})
                .attr('y1', function(d){return d.y1})
                .attr('height', rectSize)
                .attr('width', rectSize);

            rectGreen.transition()
                .duration(1500)
                .delay(function(d,i){return i*50})
                .attr('x1', function(d){return d.x1})
                .attr('y1', function(d){return d.y1})
                .attr('height', rectSize)
                .attr('width', rectSize);
        });


    };


};