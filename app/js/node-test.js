var dateTimeChart = dc.lineChart("#dateTimeChart");
var timeOfDayChart = dc.lineChart("#timeOfDayChart");

d3.json("http://empty.org.uk/v1/loads", function(loads)
{
    loads = loads.filter(function (l, i, ls) { return l.load != 0; });

    var timestampFormat = d3.time.format.iso;
    loads.forEach(function (d) {
        d.timestamp = timestampFormat.parse(d.timestamp);
    });

    var index = crossfilter(loads);
    var loadsByDateTime = index.dimension(function(d) { return d.timestamp; });
    var dateTimeGroup = loadsByDateTime.group().reduceSum(function(d) { return d.load; });

    var loadsByTimeOfDay = index.dimension(function(d) { return d.timestamp.getHours() + d.timestamp.getMinutes()/60; });
    var timeOfDayGroup = reductio().avg(function(d){ return d.load; })(loadsByTimeOfDay.group());

    dateTimeChart
        .width(800)
        .height(600)
        .transitionDuration(200)
        .mouseZoomable(true)
        .x(d3.time.scale().domain(d3.extent(loads, function (d) { return d.timestamp; })))
        // elasticX seems to prevent zooming
        .elasticY(true)
        .xAxisLabel("Date")
        .yAxisLabel("Peeps")
        .dimension(loadsByDateTime)
        .group(dateTimeGroup);

    dateTimeChart.render();

    timeOfDayChart
        .width(800)
        .height(600)
        .transitionDuration(200)
        .mouseZoomable(true)
        .x(d3.scale.linear().domain([0,24]))
        // elasticX seems to prevent zooming
        .elasticY(true)
        .xAxisLabel("Time")
        .yAxisLabel("Peeps")
        .dimension(loadsByTimeOfDay)
        .group(timeOfDayGroup)
        .valueAccessor(function(d) { return d.value.avg; });

    timeOfDayChart.render();
});
