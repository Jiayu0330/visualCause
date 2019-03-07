var data = d3.csv("responses.csv");

var drawChart = function(meanData)
{
  var width = 1100;
  var height = 320;
  var barWidth = width/meanData.length;
  var barHeight = 55; /*height of bar*/
  console.log(barWidth);

  var svg = d3.select("svg")
              .attr("width",width + 200)
              .attr("height",height + 200);

  svg.selectAll("rect")
     .data(meanData)
     .enter()
     .append("rect")
     .attr("x",function(d,i)
     {
       return 115 + i * barWidth;
     })
     .attr("y",function(d)
     {
       return height - d.mean*barHeight;
     })
     .attr("width",barWidth)
     .attr("height",function(d)
     {
       return d.mean*barHeight;
     })
     .attr("fill","black")
     .attr("stroke","white")
     .attr("stroke-width",2);


  svg.selectAll("text")
     .data(meanData)
     .enter()
     .append("text")
     .text(function(d)
     {
       return Math.round(d.mean*100)/100;
     })
     .attr("x",function(d,i)
     {
       return 118.5 + i * barWidth;
     })
     .attr("y",function(d,i)
     {
       return height - d.mean*(barHeight + 1.5);
     });

/*Add legend*/
  var legend = svg.append("g")

  legend.selectAll("text")
        .data(meanData)
        .enter()
        .append("text")
        .text(function(d)
        {
          return d.interest;
        })
        .attr("x", function()
        {
          return height - 650;
        })
        .attr("y", function(d,i)
        {
          return 136 + i*barWidth
        })
        .style("text-anchor","end")
        .attr("transform","rotate(-90)");
}

data.then(function(d)
{
  drawChart(d);
},
function(err)
{
  console.log(err);
});
