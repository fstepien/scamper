const drawTree = function() {
  const data = JSON.parse(localStorage.getItem("ideas"));
  if (data === null) {
    return alert("Please input your ideas before mapping");
  }
  // display tree data in .tree-diagram-canvas which will be the canvas
  //   removes any existing svg
  d3.select("svg").remove();
  //get canvas height
  const canvasHeight =
    d3
      .select(".tree-diagram-canvas")
      .node()
      .getBoundingClientRect().height * 0.65;

  //start new svg
  const canvas = d3
    .select(".tree-diagram-canvas")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 1000 1500")
    .classed("svg-content-responsive", true)
    .append("g")
    .attr("transform", "translate(50,50)");

  const tree = d3.layout.tree().size([canvasHeight, 320]);

  //   runs tree layout and returns array of objects
  const nodes = tree.nodes(data);
  // links create source and target from nodes
  const links = tree.links(nodes);
  //   d data for lines connecting nodes
  const diagonal = d3.svg.diagonal().projection(d => [d.y, d.x]);
  //REARANGED so that diagonals are below the circle nodes, diagonals must be created first - but need data/links to exist to be drawn out
  canvas
    .selectAll(".link")
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", diagonal);

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

  node.append("text").text(d => d.name);

  node.append("circle").attr("r", 5);
};
