			d3.json("kindStateOwn_pct.json",function(error, data){
								var datasetStateHospital = [];
								var state = "Texas";
								for(var i =0; i<data.children.length;i++)
								{
									if(state == data.children[i].name)
									{
										datasetStateHospital = data.children[i].children;
									}			
								}
								
								 
								var pie=d3.layout.pie()
								  .value(function(d){return d.percent})
								  .sort(null)
								  .padAngle(.03);
								 
								var w=400,h=400;
								 
								var outerRadius=w/2;
								var innerRadius=150;
								 
								var color = d3.scale.category10();
								 
								var arc=d3.svg.arc()
								  .outerRadius(outerRadius)
								  .innerRadius(innerRadius);
								 
								
								var svg=d3.select("#pie-chart")
								  .append("svg")
								  .classed("pieChart",true)
								  .attr({
									  width:w,
									  height:h,
								  }).append('g')
								  .attr({
									  transform:'translate('+w/2+','+h/2+')'
								  });
								var path=svg.selectAll('path')
								  .data(pie(datasetStateHospital))
								  .enter()
								  .append('path')
								  .attr({
									  d:arc,
									  fill:function(d,i){
										  return color(d.data.name);
									  }
								  });
								 
								path.transition()
								  .duration(1000)
								  .attrTween('d', function(d) {
									  var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
									  return function(t) {
										  return arc(interpolate(t));
									  };
								  });
								 
								 
								var restOfTheData=function(){
									var text=svg.selectAll('text')
										.data(pie(datasetStateHospital))
										.enter()
										.append("text")
										.transition()
										.duration(200)
										.attr("transform", function (d) {
											return "translate(" + arc.centroid(d) + ")";
										})
										.attr("dy", ".4em")
										.attr("text-anchor", "middle")
										.text(function(d){
											return d.data.percent+"%";
										})
										.style({
											fill:'black',
											'font-size':'10px'
										});
								 
									//var legendRectSize=20;
									//var legendSpacing=7;
									var legendRectSize=10;
									var legendSpacing=7;
									var legendHeight=legendRectSize+legendSpacing;
								 
								 
									var legend=svg.selectAll('.legend')
										.data(color.domain())
										.enter()
										.append('g')
										.attr({
											class:'legend',
											transform:function(d,i){
												//Just a calculation for x & y position
												return 'translate(-90,' + ((i*legendHeight)-45) + ')';
												//return 'translate(-80,' + ((i*legendHeight)-65) + ')';
											}
										});
									legend.append('rect')
										.attr({
											width:legendRectSize,
											height:legendRectSize,
											rx:20,
											ry:20
										})
										.style({
											fill:color,
											stroke:color
										});
								 
									legend.append('text')
										.attr({
											x:15,
											y:8
										})
										.text(function(d){
											return d;
										}).style({
											fill:'#929DAF',
											'font-size':'12px'
										});
								};
								 
								setTimeout(restOfTheData,1000);
								});