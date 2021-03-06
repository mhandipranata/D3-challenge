// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our scatter chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data from csv
d3.csv("data.csv")
    .then(function(journalismData){

        // Step 1: Parse Data/Cast as numbers
        
        // --- Smokers vs. Age --- //
        // journalismData.forEach(function(data){
        //     data.smokes = +data.smokes;
        //     data.age = +data.age;
        // });
        // ---------------------- //

        // --- Healthcare vs. Poverty --- //
        journalismData.forEach(function(data){
            data.poverty = +data.poverty;
            data.healthcare = +data.healthcare;
        });
        // ----------------------------- //

        // Console.log the data to ensure data is loaded properly
        console.log(journalismData);
        
        // Step 2: Create scale functions
        var xLinearScale = d3.scaleLinear()
            // .domain([30, d3.max(journalismData, d => d.age)]) // --- Smokers vs. Age --- //
            .domain([8, d3.max(journalismData, d => d.poverty)]) // --- Healthcare vs. Poverty --- //
            .range([0, width]);

        var yLinearScale = d3.scaleLinear()
            // .domain([8, d3.max(journalismData, d => d.smokes)]) // --- Smokers vs. Age --- //
            .domain([2, d3.max(journalismData, d => d.healthcare)]) // --- Healthcare vs. Poverty --- //
            .range([height, 0]);

        // Step 3: Create axis functions
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Step 4: Append Axes to the chart
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`) 
            .call(bottomAxis);

        chartGroup.append("g")
            .call(leftAxis);

        // Step 5: Create Circles
        var circlesGroup = chartGroup.selectAll("circle")
            .data(journalismData)
            .enter()
            .append("circle")
            // --- Smokers vs. Age --- //
            // .attr("cx", d => xLinearScale(d.age))
            // .attr("cy", d => yLinearScale(d.smokes))
            // --- Healthcare vs. Poverty --- //
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", "15")
            .attr("class", "stateCircle")
            .attr("opacity", ".7");
            
        // Step 6: Create scatter circle labels
        var circlesLabelGroup = chartGroup.selectAll(".text")
            .data(journalismData)
            .enter()
            .append("text")
            // --- Smokers vs. Age --- //
            // .attr("x", d => xLinearScale(d.age))
            // .attr("y", d => yLinearScale(d.smokes) + 5)
            // --- Healthcare vs. Poverty --- //
            .attr("x", d => xLinearScale(d.poverty))
            .attr("y", d => yLinearScale(d.healthcare) + 5)
            .attr("class", "stateText")
            .text((d) => d.abbr);

        // Step 7: Create axes labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (height/2))
            .attr("dy", "1em")
            .attr("class", "aText")
            // .text("Smokers (%)"); // --- Smokers vs. Age --- //
            .text("Lacks Healthcare (%)"); // --- Healthcare vs. Poverty --- //

        chartGroup.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
            .attr("class", "aText")
            // .text("Age"); // --- Smokers vs. Age --- //
            .text("In Poverty (%)"); // --- Healthcare vs. Poverty --- //

    });