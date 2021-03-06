
	//Bar Chart
	 d3.select("input[value=\"heart_attack\"]").property("checked", true);
	 
	 //Dataset 
	 datasetHeartAttack = [
        {label:"Government - Federal", value:1579.4},
        {label:"Government - Hospital District or Authority", value:3673.3},
        {label:"Government - Local", value: 2529.2},
        {label:"Government - State", value: 545.6},
        {label:"Proprietary", value: 8704.6},
        {label:"Voluntary non-profit", value:8175.4 },
		{label:"Voluntary non-profit - Other", value:6889.8 },
		{label:"Voluntary non-profit - Private", value:17620 }
	 ];
	 
	 datasetHeartFailure = [
        {label:"Government - Federal", value:1139.3},
        {label:"Government - Hospital District or Authority", value:2764.3},
        {label:"Government - Local", value: 1912.6 },
        {label:"Government - State", value: 402},
        {label:"Proprietary", value: 6375.9},
        {label:"Voluntary non-profit", value:6220.4 },
		{label:"Voluntary non-profit - Other", value:5203.8 },
		{label:"Voluntary non-profit - Private", value:13238 }
	 ];
	 
	 datasetPneumonia = [
        {label:"Government - Federal", value:1271.1},
        {label:"Government - Hospital District or Authority", value:2914.4},
        {label:"Government - Local", value: 2024.3 },
        {label:"Government - State", value: 417.2},
        {label:"Proprietary", value: 6786.4},
        {label:"Voluntary non-profit", value:6399.1 },
		{label:"Voluntary non-profit - Other", value:5365.8 },
		{label:"Voluntary non-profit - Private", value:13554 }
	 ];
	 
	 d3.selectAll("input").on("change", selectDataset);;
		
	 function selectDataset()
	 {
		var selectionOption = $('input[name=dataset]:checked').val();
		var jsonDataSet;
		var value = this.value;
        if (value == "heart_attack")
        {
			change(datasetHeartAttack);
			
        }
        else if (value == "heart_failure")
        {
			change(datasetHeartFailure); 
        }
        else if (value == "pneumonia")
        {
			change(datasetPneumonia);  
        }
     }
	 
	 
	 var margin = {top: (parseInt(d3.select('#bar-chart').style('height'), 10)/10), right: (parseInt(d3.select('#bar-chart').style('width'), 10)/20), bottom: (parseInt(d3.select('body').style('height'), 10)/10), left: (parseInt(d3.select('body').style('width'), 10)/20)},
            width = parseInt(d3.select('#bar-chart').style('width'), 10) - margin.left - margin.right,
            height = parseInt(d3.select('#bar-chart').style('height'), 10) - margin.left - margin.right ;

	 var div = d3.select("#bar-chart").append("div").attr("class", "toolTip");

     var formatPercent = d3.format("");
     
     var x = d3.scale.ordinal()
             .rangeRoundBands([0, width], .2, 0.5);
	 
     var y = d3.scale.linear()
             .range([height, 0]);
     
	 
     var xAxis = d3.svg.axis()
             .scale(x)
             .orient("bottom");
			 
     var yAxis = d3.svg.axis()
             .scale(y)
             .orient("left")
             .tickFormat(formatPercent);
     
     var svg = d3.select("#bar-chart").append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
     
     svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

	 change(datasetHeartAttack);
	 
	 function change(dataset) {
		
        x.domain(dataset.map(function(d) { return d.label; }));
        y.domain([0, d3.max(dataset, function(d) { return d.value; })]);
		
		
        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

        svg.select(".y.axis").remove();
        svg.select(".x.axis").remove();
	
        svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 10)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Total Death");

        var bar = svg.selectAll(".bar")
                .data(dataset, function(d) { return d.label; });
        // new data:
        bar.enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.label); })
                .attr("y", function(d) { return y(d.value); })
                .attr("height", function(d) { return height - y(d.value); })
                .attr("width", x.rangeBand());

        bar.on("mousemove", function(d){
                    div.style("left", d3.event.pageX+2+"px");
                    div.style("top", d3.event.pageY*0.5+"px");
                    div.style("display", "inline-block");
                    div.html((d.label)+"<br>"+(d.value));
        });
        bar.on("mouseout", function(d){
                    div.style("display", "none");
        });

        // removed data:
        bar.exit().remove();
        // updated data:
        bar.transition()
			.duration(750)
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); });
		};