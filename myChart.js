var data = d3.csv("responses.csv");

var drawChart = function(meanData)
{
  var width = 1100;
  var height = 320;
  console.log(meanData.length)
  var length = meanData.length;
  var barWidth = width/length;
  var barHeight = 55; /*height of bar*/

  var rectXscale = d3.scaleLinear()
                     .domain([0,length - 1])
                     .range([115,115 + barWidth*(length - 1)]);
  var textXscale = d3.scaleLinear()
                     .domain([0,length - 1])
                     .range([118.5,118.5 + barWidth*(length - 1)]);

  var svg = d3.select("svg")
              .attr("width",width + 200)
              .attr("height",height + 200);

  svg.selectAll("rect")
     .data(meanData)
     .enter()
     .append("rect")
     .attr("x",function(d,i)
     {
       /*console.log(rectXscale(i));*/
       return rectXscale(i);
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
       return textXscale(i);
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
