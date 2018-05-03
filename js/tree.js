const drawTree = function() {
  treeData = localStorage.getItem("ideas");
  // display tree data in .tree-diagram-canvas which will be the canvas
  console.log(treeData);

  const canvas = d3
    .select(".tree-diagram-canvas")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .append("g")
    .attr("transform", "translate(50,50)");

  const tree = d3.layout.tree().size([800, 800]);

  // currently importing from data not localstorage
  d3.json("js/data.json", function(data) {
    //   runs tree layout and returns array of objects
    const nodes = tree.nodes(data);
    // links create source and target from nodes
    const links = tree.links(nodes);
    // .node does not exist so we need to enter(), create placehoder, bind data to it then name it
    const node = canvas
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => {
        return `translate(${d.x},${d.y})`;
      });

    node
      .append("circle")
      .attr("r", 5)
      .attr("fill", "steelblue"); //why is the color not working?????

    node.append("text").text(d => d.name);

    //   d data for lines connecting nodes
    const diagonal = d3.svg.diagonal();

    canvas
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#ADADAD")
      .attr("d", diagonal);
  });

  //   canvas
  //     .append("path")
  //     .attr("fill", "none")
  //     .attr("stroke", "black");
  //   // .attr("d", diagonal);
};
