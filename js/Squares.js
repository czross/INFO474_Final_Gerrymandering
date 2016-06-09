/**
 * Created by Christopher on 5/22/2016.
 * This api takes in a div id and allows a user to read in different files that can 
 * add rectangles, lines, or text to an svg.  The ojbject passed in must be a json object 
 * that has signifiers that denote the x1, y1, x2, y2, and any text./ 
 */

var Squares = function(divName) {
    var  height, width, rectSize;
    height = 900;

    width = 920;

    rectSize = 30;


    var svg = d3.select(divName)
        .append('svg')
        .attr("height", height)
        .attr("width", width);
//appending the g and svg here makes sure to not create small multiples unless the user specifies. 
    var g = svg.append("g")
        .attr("width", (width - 40) + "px")
        .attr("height", (height - 40) + "px")
        .attr("transform", "translate(40,0)");


    /**
     * This is the draw function for the actual api and this is what is called in whatever main file 
     * that this supports
     *
     */
    var chart = function(selection) {

        selection.each(function(data) {
            var circs, rects, lines, texts;

            var filterData= function() {
                rects = data.filter(function(d) {
                    return d.types == "rect";
                });
                lines = data.filter(function(d) {
                    return d.types == "line";
                });
                texts = data.filter(function(d) {
                    return d.types == 'text'
                });

            };

            filterData();

            var line = g.selectAll("line")
                .data(lines);
            line.enter().append("line")
                .attr("x1", function(d) {d.x1})
                .attr("y1", function(d) {d.y1})
                .attr("x2", function(d) {d.x2})
                .attr("y2", function(d) {d.y2})
                .attr("stroke-width", "2px")
                .attr('stroke', 'black')
                .attr('class', 'line');


            var rect = g.selectAll("rect")
                .data(rects, function(d) { return d.id});

            rect.enter().append("rect")
                .attr("x", function(d) {d.x1})
                .attr("y", function(d) {d.y1})
                .attr("height", rectSize + "px")
                .attr("width", rectSize + "px")
                .attr('id', function(d){return d.id})
                .attr("fill", function(d) {d.color})
                .attr("class", "rect")
                .attr('stroke', 'black')
                .attr('stroke-width', '1');

            var text = g.selectAll('text')
                .data(texts);


            text.enter().append('text')
                .attr('class', 'title')
                .attr('y', function(d) {return d.x1})
                .attr('x', function(d) {return d.y1})
                .text(function(d) {return d.text});

            var text = g.selectAll('text')
                .data(texts);


            text.enter().append('text')
                .attr('class', 'title')
                .attr('y', function(d) {return d.x1})
                .attr('x', function(d) {return d.y1})
                .text(function(d) {return d.text});



            line.transition()
                .duration(1500)
                .delay(function(d,i){return i*50})
                .attr('x1', function(d){return d.x1})
                .attr('y1', function(d){return d.y1})
                .attr('x2', function(d) {return d.x2})
                .attr('y2', function(d) {return d.y2})
                .attr("brush-stroke", "2px")
                .attr('stroke', 'black');


            rect.transition()
                .duration(1500)
                .delay(function(d,i){return i*50})
                .attr('x', function(d){return d.x1})
                .attr('y', function(d){return d.y1})
                .attr('height', rectSize)
                .attr('width', rectSize)
                .attr('fill', function(d) {return d.color});

            text.transition()
                .duration(1500)
                .delay(function(d,i) {return i*50})
                .attr('x', function(d) {return d.x1})
                .attr('y', function(d) {return d.y1});



            rect.exit().remove();
            line.exit().remove();
            text.exit().remove();

            
        });
    };
//allows a user to find the generated svg
    chart.svg = function() {
        return svg;
    };

    return chart;


};