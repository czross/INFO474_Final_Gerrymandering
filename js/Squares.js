/**
 * Created by Christopher on 5/22/2016.
 */

var Squares = function() {
    var  height, width, rectSize;

    height = 900;

    width = 900;

    rectSize = 30;

    var chart = function(selection) {

        selection.each(function(data) {
            var svg = d3.select(this);
            var orange, green, lines;

            console.log(data)
            var filterData= function() {
                orange = data.filter(function(d) {
                    return d.types == "rect";
                });
                green = data.filter(function(d) {
                    return d.types == "green";
                });
                lines = data.filter(function(d) {
                    return d.types == "line";
                });
            };

            filterData();

            var g = svg.append("g")
                .attr("width", (width - 40) + "px")
                .attr("height", (height - 40) + "px")
                .append("g")
                .attr("transform", "translate(40,0)");

            var rect = g.selectAll("rect")
                .data(orange);

            rect.enter().append("rect")
                .attr("x", function(d) {d.x1})
                .attr("y", function(d) {d.y1})
                .attr("height", rectSize + "px")
                .attr("width", rectSize + "px")
                .attr("fill", function(d) {d.color});


            var line = g.selectAll("line")
                .data(lines);
            line.enter().append("line")
                .attr("x1", function(d) {d.x1})
                .attr("y1", function(d) {d.y1})
                .attr("x2", function(d) {d.x2})
                .attr("y2", function(d) {d.y2})
                .attr("stroke-width", "2px")
                .attr('stroke', 'black');

            rect.transition()
                .duration(1500)
                .delay(function(d,i){return i*50})
                .attr('x', function(d){return d.x1})
                .attr('y', function(d){return d.y1})
                .attr('height', rectSize)
                .attr('width', rectSize)
                .attr('fill', function(d) {return d.color});

            line.transition()
                .duration(1500)
                .delay(function(d,i){return i*50})
                .attr('x1', function(d){return d.x1})
                .attr('y1', function(d){return d.y1})
                .attr('x2', function(d) {return d.x2})
                .attr('y2', function(d) {return d.y2})
                .attr("brush-stroke", "2px")
                .attr('stroke', 'black');

            rect.exit().remove();
            line.exit().remove();

            /** rectGreen.transition()
             .duration(1500)
             .delay(function(d,i){return i*50})
             .attr('x', function(d){return d.x1})
             .attr('y', function(d){return d.y1})
             .attr('height', rectSize)
             .attr('width', rectSize); **/
        });
    };

    return chart;


};