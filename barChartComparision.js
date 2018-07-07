// populate drop-down
d3.select("#dropdown")
	.selectAll("option")
    .data(dropdown)
    .enter()
    .append("option")
    .attr("value", function(option) { return option.value; })
    .text(function(option) { return option.text; });


var dropDown = d3.select("#dropdown");
dropDown.on("change", function() {
	// newly selected dataset includes downtown
    d3.select("#dropdown").property("checked", true);
	
	 checked = true;
	
	 //Remove Title	
	 d3.select(".barChartHospital").remove();
	 d3.select(".barChartWorstHospital").remove();
	 d3.select(".barChartHospitalFailure").remove();
	 d3.select(".barChartWorstHospitalFailure").remove();
	 d3.select(".barChartHospitalPneumonia").remove();
	 d3.select(".barChartWorstHospitalPneumonia").remove();
	 
	 
	 d3.select(".header-worst-hospital").remove();
	 d3.select(".header-hospital").remove();
	 d3.select(".header-failure-hospital").remove();
	 d3.select(".header-worst-failure-hospital").remove();
	 d3.select(".header-pneumonia-hospital").remove();
	 d3.select(".header-worst-pneumonia-hospital").remove();
	 
	 //header-failure-hospital,header-worst-failure-hospital
	 //header-pneumonia-hospital, header-worst-pneumonia-hospital
	 // Failure Class: barChartWorstHospitalFailure ,barChartHospitalFailure
	 // Pneumonia  Class: barChartHospitalPneumonia , barChartWorstHospitalPneumonia
	 selected_dataset = d3.event.target.value;
		
	 //Best Hospital - Heart Attack 	
	 var title = '<div class="header-hospital"><b>Top 3 Best Hospital in '+ selected_dataset +' for heart attack</b></div>';
	 $(title).insertBefore("#barchartComparision");
	 d3.json("new_heart_attack_least3.json", function(error, data) {
		 
		var datasetStateHospital = [];
		for(var i =0; i< data.children.length;i++)
		{
			if(data.children[i].name == selected_dataset)
			{
				cdatasetStateHospital = data.children[i].children;
			}
		}
		
		var svgWidth = 600;
        var svgHeight = 300;
 
        var heightPad = 50;
        var widthPad = 50;
 
        var svg = d3.select("#barchartComparision")
            .append("svg")
			.classed("barChartHospital",true)
            .attr("width", svgWidth + (widthPad * 2))
            .attr("height", svgHeight + (heightPad * 2))
            .append("g")
            .attr("transform", "translate(" + widthPad + "," + heightPad + ")");
 
        //Set up scales
        var xScale = d3.scale.ordinal()
            .domain(cdatasetStateHospital.map(function(d) { return d.name; }))
            .rangeRoundBands([0, svgWidth], .1);
 
       var yScale = d3.scale.linear()
            .domain([0, 26])
            .range([svgHeight,0]);
 
       // Create bars
        svg.selectAll("rect")
            .data(cdatasetStateHospital)
            .enter().append("rect")
			.transition().duration(2000)
            .attr("x", function (d) { return xScale(d.name) + widthPad; })
            .attr("y", function (d) { return yScale(d.hospital); })
            .attr("height", function (d) { return svgHeight - yScale(d.hospital); })
            .attr("width", xScale.rangeBand())
            .attr("fill", "#9ae59a");
 
        // Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + ",0)")
            .call(yAxis)
         .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .style("text-anchor", "end")
            .text("Number of Death Patients");
 
        // X axis
        var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + "," + svgHeight + ")")
            .call(xAxis)
         .append("text")
            .attr("x", svgWidth / 2 - widthPad)
            .attr("y", 50)
            .text("Hospital Name");
	 });
	 
	 //Worst Hospital	- Heart Attack 
	 var worstTitle = '<div class="header-worst-hospital"><b>Top 3 worst services Hospital in '+ selected_dataset +' for heart attack</b></div>';
	 $(worstTitle).insertBefore("#barchartWorstComparision");
	 d3.json("new_heart_attack_top3.json", function(error, data) {
		 
		var datasetStateHospital = [];
		for(var i =0; i< data.children.length;i++)
		{
			if(data.children[i].name == selected_dataset)
			{
				cdatasetStateHospital = data.children[i].children;
			}
		}
		
		var svgWidth = 600;
        var svgHeight = 300;
 
        var heightPad = 50;
        var widthPad = 50;
 
        var svg = d3.select("#barchartWorstComparision")
            .append("svg")
			.classed("barChartWorstHospital",true)
            .attr("width", svgWidth + (widthPad * 2))
            .attr("height", svgHeight + (heightPad * 2))
            .append("g")
            .attr("transform", "translate(" + widthPad + "," + heightPad + ")");
 
        //Set up scales
        var xScale = d3.scale.ordinal()
            .domain(cdatasetStateHospital.map(function(d) { return d.name; }))
            .rangeRoundBands([0, svgWidth], .1);
 
       var yScale = d3.scale.linear()
            .domain([0, 26])
            .range([svgHeight,0]);
 
       // Create bars
        svg.selectAll("rect")
            .data(cdatasetStateHospital)
            .enter().append("rect")
			.transition().duration(2000)
            .attr("x", function (d) { return xScale(d.name) + widthPad; })
            .attr("y", function (d) { return yScale(d.hospital); })
            .attr("height", function (d) { return svgHeight - yScale(d.hospital); })
            .attr("width", xScale.rangeBand())
            .attr("fill", "red");
 
        // Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + ",0)")
            .call(yAxis)
         .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .style("text-anchor", "end")
            .text("Number of Death Patients");
 
        // X axis
        var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + "," + svgHeight + ")")
            .call(xAxis)
         .append("text")
            .attr("x", svgWidth / 2 - widthPad)
            .attr("y", 50)
            .text("Hospital Name");
	 });
	 
	 //Best Hospital - Heart Failure 	
	 var titleFailure = '<div class="header-failure-hospital"><b>Top 3 Best Hospital in '+ selected_dataset +' for heart failure<b></div>';
	 $(titleFailure).insertBefore("#barchartComparisionFailure");
	 d3.json("new_heart_failure_least3.json", function(error, data) {
		 
		var datasetStateHospital = [];
		for(var i =0; i< data.children.length;i++)
		{
			if(data.children[i].name == selected_dataset)
			{
				cdatasetStateHospital = data.children[i].children;
			}
		}
		
		var svgWidth = 600;
        var svgHeight = 300;
 
        var heightPad = 50;
        var widthPad = 50;
 
        var svg = d3.select("#barchartComparisionFailure")
            .append("svg")
			.classed("barChartHospitalFailure",true)
            .attr("width", svgWidth + (widthPad * 2))
            .attr("height", svgHeight + (heightPad * 2))
            .append("g")
            .attr("transform", "translate(" + widthPad + "," + heightPad + ")");
 
        //Set up scales
        var xScale = d3.scale.ordinal()
            .domain(cdatasetStateHospital.map(function(d) { return d.name; }))
            .rangeRoundBands([0, svgWidth], .1);
 
        var yScale = d3.scale.linear()
            .domain([0, 26])
            .range([svgHeight,0]);
 
        // Create bars
        svg.selectAll("rect")
            .data(cdatasetStateHospital)
            .enter().append("rect")
            .attr("x", function (d) { return xScale(d.name) + widthPad; })
            .attr("y", function (d) { return yScale(d.hospital); })
            .attr("height", function (d) { return svgHeight - yScale(d.hospital); })
            .attr("width", xScale.rangeBand())
            .attr("fill", "#9ae59a");
 
        // Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + ",0)")
            .call(yAxis)
         .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .style("text-anchor", "end")
            .text("Number of Death Patients");
 
        // X axis
        var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + "," + svgHeight + ")")
            .call(xAxis)
         .append("text")
            .attr("x", svgWidth / 2 - widthPad)
            .attr("y", 50)
            .text("Hospital Name");
	 });
	 
	 //Worst Hospital	- Heart Failure 
	 var worstTitleFailure = '<div class="header-worst-failure-hospital"><b>Top 3 worst services Hospital in '+ selected_dataset +' for heart failure</b></div>';
	 $(worstTitleFailure).insertBefore("#barchartWorstComparisionFailure");
	 d3.json("new_heart_failure_top3.json", function(error, data) {
		 
		var datasetStateHospital = [];
		for(var i =0; i< data.children.length;i++)
		{
			if(data.children[i].name == selected_dataset)
			{
				cdatasetStateHospital = data.children[i].children;
			}
		}
		
		var svgWidth = 600;
        var svgHeight = 300;
 
        var heightPad = 50;
        var widthPad = 50;
 
        var svg = d3.select("#barchartWorstComparisionFailure")
            .append("svg")
			.classed("barChartWorstHospitalFailure",true)
            .attr("width", svgWidth + (widthPad * 2))
            .attr("height", svgHeight + (heightPad * 2))
            .append("g")
            .attr("transform", "translate(" + widthPad + "," + heightPad + ")");
 
        //Set up scales
        var xScale = d3.scale.ordinal()
            .domain(cdatasetStateHospital.map(function(d) { return d.name; }))
            .rangeRoundBands([0, svgWidth], .1);
 
       var yScale = d3.scale.linear()
            .domain([0, 26])
            .range([svgHeight,0]);
 
       // Create bars
        svg.selectAll("rect")
            .data(cdatasetStateHospital)
            .enter().append("rect")
            .attr("x", function (d) { return xScale(d.name) + widthPad; })
            .attr("y", function (d) { return yScale(d.hospital); })
            .attr("height", function (d) { return svgHeight - yScale(d.hospital); })
            .attr("width", xScale.rangeBand())
            .attr("fill", "red");
 
        // Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + ",0)")
            .call(yAxis)
         .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .style("text-anchor", "end")
            .text("Number of Death Patients");
 
        // X axis
        var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + "," + svgHeight + ")")
            .call(xAxis)
         .append("text")
            .attr("x", svgWidth / 2 - widthPad)
            .attr("y", 50)
            .text("Hospital Name");
	 });
	 
	 
	 //Best Hospital - Pneumonia	
	 var titlePneumonia = '<div class="header-pneumonia-hospital"><b>Top 3 Best Hospital in '+ selected_dataset +' for pneumonia<b></div>';
	 $(titlePneumonia).insertBefore("#barchartComparisionPneumonia");
	 d3.json("new_pn_least3.json", function(error, data) {
		 
		var datasetStateHospital = [];
		for(var i =0; i< data.children.length;i++)
		{
			if(data.children[i].name == selected_dataset)
			{
				cdatasetStateHospital = data.children[i].children;
			}
		}
		
		var svgWidth = 600;
        var svgHeight = 300;
 
        var heightPad = 50;
        var widthPad = 50;
 
        var svg = d3.select("#barchartComparisionPneumonia")
            .append("svg")
			.classed("barChartHospitalPneumonia",true)
            .attr("width", svgWidth + (widthPad * 2))
            .attr("height", svgHeight + (heightPad * 2))
            .append("g")
            .attr("transform", "translate(" + widthPad + "," + heightPad + ")");
 
        //Set up scales
        var xScale = d3.scale.ordinal()
            .domain(cdatasetStateHospital.map(function(d) { return d.name; }))
            .rangeRoundBands([0, svgWidth], .1);
 
       var yScale = d3.scale.linear()
            .domain([0, 26])
            .range([svgHeight,0]);
 
       // Create bars
        svg.selectAll("rect")
            .data(cdatasetStateHospital)
            .enter().append("rect")
            .attr("x", function (d) { return xScale(d.name) + widthPad; })
            .attr("y", function (d) { return yScale(d.hospital); })
            .attr("height", function (d) { return svgHeight - yScale(d.hospital); })
            .attr("width", xScale.rangeBand())
            .attr("fill", "#9ae59a");
 
        // Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + ",0)")
            .call(yAxis)
         .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .style("text-anchor", "end")
            .text("Number of Death Patients");
 
        // X axis
        var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + "," + svgHeight + ")")
            .call(xAxis)
         .append("text")
            .attr("x", svgWidth / 2 - widthPad)
            .attr("y", 50)
            .text("Hospital Name");
	 });
	 
	 //Worst Hospital	- Pneumonia
	 var worstTitlePneumonia = '<div class="header-worst-pneumonia-hospital"><b>Top 3 worst services Hospital in '+ selected_dataset +' for pneumonia</b></div>';
	 $(worstTitlePneumonia).insertBefore("#barchartWorstComparisionPneumonia");
	 d3.json("new_heart_failure_top3.json", function(error, data) {
		 
		var datasetStateHospital = [];
		for(var i =0; i< data.children.length;i++)
		{
			if(data.children[i].name == selected_dataset)
			{
				cdatasetStateHospital = data.children[i].children;
			}
		}
		
		var svgWidth = 600;
        var svgHeight = 300;
 
        var heightPad = 50;
        var widthPad = 50;
 
        var svg = d3.select("#barchartWorstComparisionPneumonia")
            .append("svg")
			.classed("barChartWorstHospitalPneumonia",true)
            .attr("width", svgWidth + (widthPad * 2))
            .attr("height", svgHeight + (heightPad * 2))
            .append("g")
            .attr("transform", "translate(" + widthPad + "," + heightPad + ")");
 
        //Set up scales
        var xScale = d3.scale.ordinal()
            .domain(cdatasetStateHospital.map(function(d) { return d.name; }))
            .rangeRoundBands([0, svgWidth], .1);
 
       var yScale = d3.scale.linear()
            .domain([0, 26])
            .range([svgHeight,0]);
 
       // Create bars
        svg.selectAll("rect")
            .data(cdatasetStateHospital)
            .enter().append("rect")
            .attr("x", function (d) { return xScale(d.name) + widthPad; })
            .attr("y", function (d) { return yScale(d.hospital); })
            .attr("height", function (d) { return svgHeight - yScale(d.hospital); })
            .attr("width", xScale.rangeBand())
            .attr("fill", "red");
 
        // Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + ",0)")
            .call(yAxis)
         .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .style("text-anchor", "end")
            .text("Number of Death Patients");
 
        // X axis
        var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + "," + svgHeight + ")")
            .call(xAxis)
         .append("text")
            .attr("x", svgWidth / 2 - widthPad)
            .attr("y", 50)
            .text("Hospital Name");
	 });
});	







//Initilise bar chart

//Best Hospital - Heart Attack
d3.json("new_heart_attack_least3.json", function(error, data) {
		 
		var datasetStateHospital = [];
		for(var i =0; i< data.children.length;i++)
		{
			if(data.children[i].name == "New York")
			{
				cdatasetStateHospital = data.children[i].children;
			}
		}
		
		var svgWidth = 600;
        var svgHeight = 300;
 
        var heightPad = 50;
        var widthPad = 50;
 
        var svg = d3.select("#barchartComparision")
            .append("svg")
			.classed("barChartHospital",true)
            .attr("width", svgWidth + (widthPad * 2))
            .attr("height", svgHeight + (heightPad * 2))
            .append("g")
            .attr("transform", "translate(" + widthPad + "," + heightPad + ")");
 
        //Set up scales
        var xScale = d3.scale.ordinal()
            .domain(cdatasetStateHospital.map(function(d) { return d.name; }))
            .rangeRoundBands([0, svgWidth], .1);
 
       var yScale = d3.scale.linear()
            .domain([0, 26])
            .range([svgHeight,0]);
 
       // Create bars
        svg.selectAll("rect")
            .data(cdatasetStateHospital)
            .enter().append("rect")
            .attr("x", function (d) { return xScale(d.name) + widthPad; })
            .attr("y", function (d) { return yScale(d.hospital); })
            .attr("height", function (d) { return svgHeight - yScale(d.hospital); })
            .attr("width", xScale.rangeBand())
            .attr("fill", "#9ae59a");
 
        // Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + ",0)")
            .call(yAxis)
         .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .style("text-anchor", "end")
            .text("Number of Death Patients");
 
        // X axis
        var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + "," + svgHeight + ")")
            .call(xAxis)
         .append("text")
            .attr("x", svgWidth / 2 - widthPad)
            .attr("y", 50)
            .text("Hospital Name");
	 });
	 


//Worst  Hospital - Heart Attack
d3.json("new_heart_attack_top3.json", function(error, data) {
		 
		var datasetStateHospital = [];
		for(var i =0; i< data.children.length;i++)
		{
			if(data.children[i].name == "New York")
			{
				cdatasetStateHospital = data.children[i].children;
			}
		}
		
		var svgWidth = 600;
        var svgHeight = 300;
 
        var heightPad = 50;
        var widthPad = 50;
 
        var svg = d3.select("#barchartWorstComparision")
            .append("svg")
			.classed("barChartWorstHospital",true)
            .attr("width", svgWidth + (widthPad * 2))
            .attr("height", svgHeight + (heightPad * 2))
            .append("g")
            .attr("transform", "translate(" + widthPad + "," + heightPad + ")");
 
        //Set up scales
        var xScale = d3.scale.ordinal()
            .domain(cdatasetStateHospital.map(function(d) { return d.name; }))
            .rangeRoundBands([0, svgWidth], .1);
 
       var yScale = d3.scale.linear()
            .domain([0, 26])
            .range([svgHeight,0]);
 
       // Create bars
        svg.selectAll("rect")
            .data(cdatasetStateHospital)
            .enter().append("rect")
            .attr("x", function (d) { return xScale(d.name) + widthPad; })
            .attr("y", function (d) { return yScale(d.hospital); })
            .attr("height", function (d) { return svgHeight - yScale(d.hospital); })
            .attr("width", xScale.rangeBand())
            .attr("fill", "red");
 
        // Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + ",0)")
            .call(yAxis)
         .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .style("text-anchor", "end")
            .text("Number of Death Patients");
 
        // X axis
        var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + "," + svgHeight + ")")
            .call(xAxis)
         .append("text")
            .attr("x", svgWidth / 2 - widthPad)
            .attr("y", 50)
            .text("Hospital Name");
	 });	


//Best Hospital - Heart Failure

d3.json("new_heart_failure_least3.json", function(error, data) {
		 
		var datasetStateHospital = [];
		for(var i =0; i< data.children.length;i++)
		{
			if(data.children[i].name == "New York")
			{
				cdatasetStateHospital = data.children[i].children;
			}
		}
		
		var svgWidth = 600;
        var svgHeight = 300;
 
        var heightPad = 50;
        var widthPad = 50;
 
        var svg = d3.select("#barchartComparisionFailure")
            .append("svg")
			.classed("barChartHospitalFailure",true)
            .attr("width", svgWidth + (widthPad * 2))
            .attr("height", svgHeight + (heightPad * 2))
            .append("g")
            .attr("transform", "translate(" + widthPad + "," + heightPad + ")");
 
        //Set up scales
        var xScale = d3.scale.ordinal()
            .domain(cdatasetStateHospital.map(function(d) { return d.name; }))
            .rangeRoundBands([0, svgWidth], .1);
 
       var yScale = d3.scale.linear()
            .domain([0, 26])
            .range([svgHeight,0]);
 
       // Create bars
        svg.selectAll("rect")
            .data(cdatasetStateHospital)
            .enter().append("rect")
            .attr("x", function (d) { return xScale(d.name) + widthPad; })
            .attr("y", function (d) { return yScale(d.hospital); })
            .attr("height", function (d) { return svgHeight - yScale(d.hospital); })
            .attr("width", xScale.rangeBand())
            .attr("fill", "#9ae59a");
 
        // Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + ",0)")
            .call(yAxis)
         .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .style("text-anchor", "end")
            .text("Number of Death Patients");
 
        // X axis
        var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + "," + svgHeight + ")")
            .call(xAxis)
         .append("text")
            .attr("x", svgWidth / 2 - widthPad)
            .attr("y", 50)
            .text("Hospital Name");
	 });	 	 
	 
//Worst Hospital - Heart Failure

d3.json("new_heart_failure_top3.json", function(error, data) {
		 
		var datasetStateHospital = [];
		for(var i =0; i< data.children.length;i++)
		{
			if(data.children[i].name == "New York")
			{
				cdatasetStateHospital = data.children[i].children;
			}
		}
		
		var svgWidth = 600;
        var svgHeight = 300;
 
        var heightPad = 50;
        var widthPad = 50;
 
        var svg = d3.select("#barchartWorstComparisionFailure")
            .append("svg")
			.classed("barChartWorstHospitalFailure",true)
            .attr("width", svgWidth + (widthPad * 2))
            .attr("height", svgHeight + (heightPad * 2))
            .append("g")
            .attr("transform", "translate(" + widthPad + "," + heightPad + ")");
 
        //Set up scales
        var xScale = d3.scale.ordinal()
            .domain(cdatasetStateHospital.map(function(d) { return d.name; }))
            .rangeRoundBands([0, svgWidth], .1);
 
       var yScale = d3.scale.linear()
            .domain([0, 26])
            .range([svgHeight,0]);
 
       // Create bars
        svg.selectAll("rect")
            .data(cdatasetStateHospital)
            .enter().append("rect")
            .attr("x", function (d) { return xScale(d.name) + widthPad; })
            .attr("y", function (d) { return yScale(d.hospital); })
            .attr("height", function (d) { return svgHeight - yScale(d.hospital); })
            .attr("width", xScale.rangeBand())
            .attr("fill", "red");
 
        // Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + ",0)")
            .call(yAxis)
         .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .style("text-anchor", "end")
            .text("Number of Death Patients");
 
        // X axis
        var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + "," + svgHeight + ")")
            .call(xAxis)
         .append("text")
            .attr("x", svgWidth / 2 - widthPad)
            .attr("y", 50)
            .text("Hospital Name");
	 });

//Best Hospital - pneumonia

d3.json("new_pn_least3.json", function(error, data) {
		 
		var datasetStateHospital = [];
		for(var i =0; i< data.children.length;i++)
		{
			if(data.children[i].name == "New York")
			{
				cdatasetStateHospital = data.children[i].children;
			}
		}
		
		var svgWidth = 600;
        var svgHeight = 300;
 
        var heightPad = 50;
        var widthPad = 50;
 
        var svg = d3.select("#barchartComparisionPneumonia")
            .append("svg")
			.classed("barChartHospitalPneumonia",true)
            .attr("width", svgWidth + (widthPad * 2))
            .attr("height", svgHeight + (heightPad * 2))
            .append("g")
            .attr("transform", "translate(" + widthPad + "," + heightPad + ")");
 
        //Set up scales
        var xScale = d3.scale.ordinal()
            .domain(cdatasetStateHospital.map(function(d) { return d.name; }))
            .rangeRoundBands([0, svgWidth], .1);
 
       var yScale = d3.scale.linear()
            .domain([0, 26])
            .range([svgHeight,0]);
 
       // Create bars
        svg.selectAll("rect")
            .data(cdatasetStateHospital)
            .enter().append("rect")
            .attr("x", function (d) { return xScale(d.name) + widthPad; })
            .attr("y", function (d) { return yScale(d.hospital); })
            .attr("height", function (d) { return svgHeight - yScale(d.hospital); })
            .attr("width", xScale.rangeBand())
            .attr("fill", "#9ae59a");
 
        // Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + ",0)")
            .call(yAxis)
         .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .style("text-anchor", "end")
            .text("Number of Death Patients");
 
        // X axis
        var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + "," + svgHeight + ")")
            .call(xAxis)
         .append("text")
            .attr("x", svgWidth / 2 - widthPad)
            .attr("y", 50)
            .text("Hospital Name");
	 });	 

	 
//Worst Hospital - Pneumonia

d3.json("new_pn_top3.json", function(error, data) {
		 
		var datasetStateHospital = [];
		for(var i =0; i< data.children.length;i++)
		{
			if(data.children[i].name == "New York")
			{
				cdatasetStateHospital = data.children[i].children;
			}
		}
		
		var svgWidth = 600;
        var svgHeight = 300;
 
        var heightPad = 50;
        var widthPad = 50;
 
        var svg = d3.select("#barchartWorstComparisionPneumonia")
            .append("svg")
			.classed("barChartWorstHospitalPneumonia",true)
            .attr("width", svgWidth + (widthPad * 2))
            .attr("height", svgHeight + (heightPad * 2))
            .append("g")
            .attr("transform", "translate(" + widthPad + "," + heightPad + ")");
 
        //Set up scales
        var xScale = d3.scale.ordinal()
            .domain(cdatasetStateHospital.map(function(d) { return d.name; }))
            .rangeRoundBands([0, svgWidth], .1);
 
       var yScale = d3.scale.linear()
            .domain([0, 26])
            .range([svgHeight,0]);
 
       // Create bars
        svg.selectAll("rect")
            .data(cdatasetStateHospital)
            .enter().append("rect")
            .attr("x", function (d) { return xScale(d.name) + widthPad; })
            .attr("y", function (d) { return yScale(d.hospital); })
            .attr("height", function (d) { return svgHeight - yScale(d.hospital); })
            .attr("width", xScale.rangeBand())
            .attr("fill", "red");
 
        // Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + ",0)")
            .call(yAxis)
         .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .style("text-anchor", "end")
            .text("Number of Death Patients");
 
        // X axis
        var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
 
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + widthPad + "," + svgHeight + ")")
            .call(xAxis)
         .append("text")
            .attr("x", svgWidth / 2 - widthPad)
            .attr("y", 50)
            .text("Hospital Name");
	 });	 