/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

const widthS = 900; 
const heightS = 450; 
const marginS = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffsetS = 15; 




// Creates a smaller svg window in the csv bar div
const svg3 = d3
.select("#csv-scatter")
.append("svg")
.attr("width", widthS-marginS.left-marginS.right)
.attr("height", heightS - marginS.top - marginS.bottom)
.attr("viewBox", [0, 0, widthS, heightS]);

d3.csv("data/scatter.csv").then((data) => {

let maxY3 = d3.max(data3, function(d) { return d.score; });

let yScale3 = d3.scaleLinear()
            .domain([0,maxY3])
            .range([heightS-marginS.bottom,marginS.top]); 

let xScale3 = d3.scaleBand()
            .domain(d3.range(data3.length))
            .range([marginS.left, widthS - marginS.right])
            .padding(0.1); 

// Sets the markings for the x-axis
svg3.append("g")
   .attr("transform", `translate(${marginS.left}, 0)`) 
   .call(d3.axisLeft(yScale3)) 
   .attr("font-size", '20px'); 

// Sets the markings for the y-axis
svg3.append("g")
    .attr("transform", `translate(0,${heightS - marginS.bottom})`) 
    .call(d3.axisBottom(xScale3) 
            .tickFormat(i => data2[i].name))  
    .attr("font-size", '20px'); 

// creates the tooltip
const tooltip3 = d3.select("#csv-scatter") 
                .append("div") 
                .attr('id', "tooltip3") 
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
          .style("top", (event.y + yTooltipOffsetS) +"px"); 
}

// When the mouse is not hovering a bar, the pop up disappears.
const mouseleave2 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

svg1.selectAll(".bar") 
   .data(data3) 
   .enter()  
   .append("circle") 
     .attr("class", "bar") 
     .attr("cx", (d,i) => xScale3(d.day)) 
     .attr("cy", (d) => yScale3(d.score)) 
     .attr("r", 15)
     .on("mouseover", mouseover2) 
     .on("mousemove", mousemove2)
     .on("mouseleave", mouseleave2);



});


