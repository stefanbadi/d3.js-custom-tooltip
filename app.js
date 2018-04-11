//very simple bar

var data = [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9];

// Create SVG Element
var sortflag = false;
var chart_width = 800;
var chart_height = 400;
var svg = d3
  .select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

// Create Scales
var x_scale = d3
  .scaleBand()
  .domain(d3.range(data.length))
  .rangeRound([0, chart_width])
  .paddingInner(0.05);
var y_scale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, chart_height]);

// Bind Data and create bars
svg
  .selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', function(d, i) {
    return x_scale(i);
  })
  .attr('y', function(d) {
    return chart_height - y_scale(d);
  })
  .attr('width', x_scale.bandwidth())
  .attr('height', function(d) {
    return y_scale(d);
  })
  .attr('fill', '#7ED26D')
  //add tooltip and show data
  //.append('title')
  //.text(function(d) {
  //    return d;
  //  });
  .on('mouseover', function(d) {
    //catch the coordinate x of one bar and set into center
    var x = parseFloat(d3.select(this).attr('x')) + x_scale.bandwidth() / 2;
    //position in vertical middle of bar
    var y = parseFloat(d3.select(this).attr('y')) / 2 + chart_height / 2;
    //set tooltip pos in d3
    d3
      .select('#tooltip')
      .style('left', x + 'px')
      .style('top', y + 'px')
      //make visible
      .style('display', 'block')
      .text(d);
  })
  .on('mouseout', function() {
    d3.select('#tooltip').style('display', 'none');
  });
