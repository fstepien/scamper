const drawTree = function() {
  const data = JSON.parse(localStorage.getItem("ideas"));
  // display tree data in .tree-diagram-canvas which will be the canvas

  const canvas = d3
    .select(".tree-diagram-canvas")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .append("g")
    .attr("transform", "translate(50,50)");

  const canvasHeight =
    d3
      .select(".tree-diagram-canvas")
      .node()
      .getBoundingClientRect().height * 0.9;

  const tree = d3.layout.tree().size([canvasHeight, 300]);

  // currently importing from data not localstorage
  //   d3.json("js/data.json", function(data) {
  console.log(data);
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
    .attr("transform", data => {
      return `translate(${data.y},${data.x})`;
    });

  node.append("circle").attr("r", 5);

  node.append("text").text(d => d.name);

  //   d data for lines connecting nodes
  const diagonal = d3.svg.diagonal().projection(d => [d.y, d.x]);

  canvas
    .selectAll(".link")
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", diagonal);
  //   });
};
