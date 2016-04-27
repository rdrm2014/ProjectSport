/**
 * Created by ricardomendes on 25/02/15.
 */
/* global $, _  */
(function (charts, $, _) {
    /* global $, d3*/
    "use strict";
    charts.Graph2D = function () {
        var that = this;
        var params = this.params = {};
        var margin = params.margin = {top: 10, right: 10, bottom: 100, left: 40};
        var margin2 = params.margin2 = {top: 260, right: 10, bottom: 10, left: 40};
        params.width = 350 - margin.left - margin.right;
        params.height = 350 - margin.top - margin.bottom;
        params.height2 = 350 - margin2.top - margin2.bottom;

        params.xDomain = null;
        params.yDomain = null;
        params.timeIndex = null;
        params.data = null;
        params.xLabel = 'x';
        params.yLabel = 'y';

        // SETUP SCALES AND AXES
        var x = d3.scale.linear().range([0, params.width]);
        var x2 = d3.scale.linear().range([0, params.width]);
        var y = d3.scale.linear().range([params.height, 0]);
        var y2 = d3.scale.linear().range([params.height2, 0]);

        /** AXIS **
        var xAxis = d3.svg.axis().scale(x).orient("center");
        var xAxis2 = d3.svg.axis().scale(x2).orient("center");*/
        var yAxis = d3.svg.axis().scale(y).orient("left");
        /** AXIS **/

        var brush = d3.svg.brush()
            .x(x2)
            .on("brush", brushed);

        var focus;
        var context;
        var dataG;

        function chart(selection) {
            selection.each(function (data) {
                dataG = data;
                var height = chart.height(), height2 = chart.height2();
                var width = chart.width();
                var margin = chart.margin(), margin2 = chart.margin2();
                chart.svg = d3.select(this)
                    .attr('width', width)
                    .attr('height', height)
                    .selectAll('g').data([data]);

                chart.svg.enter().append("defs").append("clipPath")
                    .attr("id", "clip")
                    .append("rect")
                    .attr("width", width)
                    .attr("height", height);


                focus = chart.svg.enter().append("g")
                    .attr("class", "focus")
                    .attr("width", width - margin.left - margin.right)
                    .attr("height", height - margin.top - margin.bottom)
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                context = chart.svg.enter().append("g")
                    .attr("class", "context")
                    .attr("width", width - margin.left - margin.right)
                    .attr("height", height2)
                    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

                /** DOMAIN **/
                x.domain(chart.xDomain() || charts.getExtent(data, 'x2'));
                y.domain(chart.yDomain() || charts.getExtent(data, 'y2'));

                x2.domain(x.domain());
                y2.domain(y.domain());
                /** DOMAIN **/

                /** X Axis **
                focus.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + (height - margin.top - margin.bottom)/2 + ")")
                    .call(xAxis);
                /** X Axis **/

                /** Y Axis **/
                focus.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);
                /** Y Axis **/


                /** FocusBar **/
                focus.append("g")
                    .attr("class", "focusbar");
                focus.select('.focusbar').selectAll(".bar")
                    .data(data)
                    .enter()
                    .append("line")
                    .attr("class", "bar")
                    .attr("x1", function (d) {
                        return x(d.x1);
                    })
                    .attr("y1", function (d) {
                        return y(d.y1);
                    })
                    .attr("x2", function (d) {
                        return x(d.x2);
                    })
                    .attr("y2", function (d) {
                        return y(d.y2);
                    })
                    .attr("class", function (d) {
                        return d.y2 < 0 ? "linesT1" : "linesT2";
                    });
                /** FocusBar **/

                /** ContextBar **/
                context.append("g")
                    .attr("class", "contextbar")
                .attr("width", width - margin2.left - margin2.right);
                context.select('.contextbar').selectAll(".bar")
                    .data(data)
                    .enter()
                    .append("line")
                    .attr("class", "bar")
                    .attr("x1", function (d) {
                        return x2(d.x1);
                    })
                    .attr("y1", function (d) {
                        return y2(d.y1);
                    })
                    .attr("x2", function (d) {
                        return x2(d.x2);
                    })
                    .attr("y2", function (d) {
                        return y2(d.y2);
                    })
                    .attr("class", function (d) {
                        return d.y2 < 0 ? "linesT1" : "linesT2";
                    });

                context
                    .append("g")
                    .attr("class", "x brush")
                    .call(brush)
                    .selectAll("rect")
                    .attr("height", height2);

                /** ContextBar **/
            });
        }

        function brushed() {
            x.domain(brush.empty() ? x2.domain() : brush.extent());
            focus.select('.focusbar').remove();
            focus.append("g").attr("class", "focusbar");

            focus.select('.focusbar').selectAll(".bar")
                .data(dataG)
                .enter()
                .append("line")
                .attr("class", "bar")
                .attr("x1", function (d) {
                    return x(d.x1);
                })
                .attr("y1", function (d) {
                    return y(d.y1);
                })
                .attr("x2", function (d) {
                    return x(d.x2);
                })
                .attr("y2", function (d) {
                    return y(d.y2);
                })
                .attr("class", function (d) {
                    return d.y2 < 0 ? "linesT1" : "linesT2";
                });
        }

        var method;
        for (method in this.params) {
            chart[method] = makeAPIMethod(chart, this, method);
        }

        chart.margins = function (_) {
            if (!arguments.length) {
                return that.params.margins;
            }
            $.extend(that.params.margins, _);
            return chart;
        };

        chart.xScale = function () {
            return x;
        };

        chart.yScale = function () {
            return y;
        };

        /*chart.colors = function(d, i) {
         return chart.COLS()[i%chart.COLS().length];
         };*/

        return chart;
    };

    function makeAPIMethod(chart, that, method) {
        return function (_) {
            if (!arguments.length) {
                return that.params[method];
            }
            that.params[method] = _;
            return chart;
        };
    }

    charts.getExtent = function (data, col) {
        return d3.extent(data.map(function (d) {
            return +d[col];
        }));
    };

    charts.parentData = function (d) {
        return [d];
    };
}(window.charts = window.charts || {}, $));
