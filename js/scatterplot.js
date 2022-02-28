/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 

const data = d3.csv("data/scatter.csv")

// Creates a smaller svg window in the csv bar div
const svg = d3
.select("#csv-scatter")
.append("svg")
.attr("width", width-margin.left-margin.right)
.attr("height", height - margin.top - margin.bottom)
.attr("viewBox", [0, 0, width, height]);

let maxY = d3.max(data, function(d) { return d.score; });

let yScale = d3.scaleLinear()
            .domain([0,maxY])
            .range([height-margin.bottom,margin.top]); 

let xScale = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// Sets the markings for the x-axis
svg.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale)) 
   .attr("font-size", '20px'); 

// Sets the markings for the y-axis
svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale) 
            .tickFormat(i => data2[i].name))  
    .attr("font-size", '20px'); 

// creates the tooltip
const tooltip2 = d3.select("#csv-scatter") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// Creates an information pop up when a user hovers over each bar with information
// about that bar 
const mouseover2 = function(event, d) {
  tooltip1.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// Moves the information pop up to where the mouse moves.
const mousemove2 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// When the mouse is not hovering a bar, the pop up disappears.
const mouseleave2 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

svg1.selectAll(".bar") 
   .data(data) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale(i)) 
     .attr("y", (d) => yScale(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover2) 
     .on("mousemove", mousemove2)
     .on("mouseleave", mouseleave2);






