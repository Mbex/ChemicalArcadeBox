var w = 800;
var h = w
var padding = 0.05 * w;
var N = 5;
var dataset = Array.apply(null, Array(N)).map(function (_, i) {return i;});;
var molecules_data = [];
var time_step = 5;
var svg = d3.select("body")
          .append("svg")
          .attr("width", w)
          .attr("height", h)
          .attr("border", 1);
var borderPath = svg.append("rect")
     			.attr("x", 0)
     			.attr("y", 0)
     			.attr("height", h)
     			.attr("width", w)
     			.style("stroke", "black")
     			.style("fill", "none")
     			.style("stroke-width", 1);

function Molecule(id) {
  /* molecule object */
  this.id = id;
  this.class = "molecule";
  this.mass = 50;
  this.r = 20;
  this.position = {x : Math.floor(Math.random()*(w - this.r*2) + this.r),
                   y : Math.floor(Math.random()*(h - this.r*2) + this.r)
                 }
  this.velocity = {dx : Math.round(10 * (-1 + Math.round(Math.random())))+1,
                   dy : Math.round(10 * (-1 + Math.round(Math.random())))+1
                 };
        this.data = [this.id]; // allow us to use d3.enter()



  return this;
};

function move(molecule) {
  /* Moves molecule */
  molecule.position.x += molecule.velocity.dx;
  molecule.position.y += molecule.velocity.dy;
  return molecule;
};

function boundary_bounce(molecule) {
  /* changes x, y position if molecule hits boundary of svg  */
  var r_boundary = (molecule.position.x + molecule.r >= w);
  var l_boundary = (molecule.position.x - molecule.r <= 0);
  var t_boundary = (molecule.position.y - molecule.r <= 0);
  var b_boundary = (molecule.position.y + molecule.r >= h);
  if (l_boundary | r_boundary){
    molecule.velocity.dx = -molecule.velocity.dx;
  };
  if (t_boundary | b_boundary){
    molecule.velocity.dy = -molecule.velocity.dy;
  };
  return molecule;
};

for (id in dataset){
  var m = new Molecule(id);
  molecules_data.push(m);
}

var molecules_svg = svg.selectAll("circle")
   .data(molecules_data)
   .enter()
   .append("circle")
   .attr("id", function(m) { return m.id; })
   .attr("r", function(m) { return m.r; })
   .attr("cx", function(m) { return m.position.x; })
   .attr("cy", function(m) { return m.position.y; })
   .attr("class", function(m) { return m.class; })



function move_svg_molecules() {

  d3.selectAll(".molecule")
    .transition()
    .delay(time_step)
    .each("start", function() {
      d3.select(this).attr("cx", function(m) {
         return molecules_data[this.id].position.x;
       });
      d3.select(this).attr("cy", function(m) {
         return molecules_data[this.id].position.y;
       });
     });
//     // .each("end", function() {
//   //   d3.select(this).transition().duration(time_step)
//   //   .attr("cx", function(m) { return move(m).position.x; })
//   //   .each("end", function(){ move_molecules(); })
//     // })
// // };
}



function Run(){
  window.setInterval( function () {

    for (i in molecules_data){
        molecules_data[i] = move(molecules_data[i]);
        molecules_data[i] = boundary_bounce(molecules_data[i]);
        move_svg_molecules();
    }
  }, time_step);

}//endfunction

Run();

// function collision_ids(molecule) {
//
//   /*  returns list of ids of molecules that have
//   collided with molecule argument.  */
//
//   ids = []
//   for (m in molecules){
//     if (molecule.id != m.id){
//       if(((molecule.position.x + molecule.r  <= m.position.x - m.r) |
//           (molecule.position.x - molecule.r  <= m.position.x - m.r)) &
//          ((molecule.position.y + molecule.r  <= m.position.y - m.r) |
//           (molecule.position.y - molecule.r  <= m.position.y - m.r))) {
//             nearest_neighbours.push(m.id);
//       };
//     };
//   };
//   return ids;
// };
 //
 // window.setInterval(function(){
 //   move(m);
 //   boundary_bounce(m);
 //   circle.transition()
 //          .attr("cx", m.position.x)
 //          .attr("cy", m.position.y);
 //   console.log(m.position)

 // }, time_step);


    // .each(function(m){
    //   // .attr("cx", m.position.x)
    //   console.log(m);
    //   .attr("r", 5)
    //
    // });


// svg.selectAll("circle")
//    .data(dataset)
//    .enter()
//    .append("circle")
//    .attr("cx", function(d) {
//         return xScale(d[0]);
//     })
//     .attr("cy", function(d) {
//         return yScale(d[1]);
//     })
//     .attr("r",  function(d) {
//         return rScale(d[1]);
//     });





















// INITIALISE MOLECULES IN SVG







// var circle = svg.append("circle")
//     .attr("id", "circ")
//     .attr("cx", Math.random() * 200)
//     .attr("cy", Math.random() * 200)
//     .attr("r", 10 + "px")




//
// var dataset = [];
// var numDataPoints = 50;
// var xRange = Math.random() * 1000;
// var yRange = Math.random() * 1000;
// for (var i = 0; i < numDataPoints; i++) {
//     var newNumber1 = Math.round(Math.random() * xRange);
//     var newNumber2 = Math.round(Math.random() * yRange);
//     dataset.push([newNumber1, newNumber2]);
// }
//
// var w = 600;
// var h = 300;
// var padding = 30;
//
//
// //Create SVG element
// var svg = d3.select("body")
//             .append("svg")
//             .attr("width", w)
//             .attr("height", h);
//
// var xScale = d3.scale.linear()
//                      .domain([0, d3.max(dataset, function(d) {
//                         return d[0];
//                       })])
//                      .range([padding, w - (padding*5)]);
// var yScale = d3.scale.linear()
//                      .domain([0, d3.max(dataset, function(d) {
//                         return d[1];
//                       })])
//                      .range([h - padding, padding]);
// var rScale = d3.scale.linear()
//                      .domain([0, d3.max(dataset, function(d) {
//                        return (d[1]*d[0])/1000;
//                       })])
//                      .range([2, 5]);
//
//
// svg.selectAll("circle")
//    .data(dataset)
//    .enter()
//    .append("circle")
//    .attr("cx", function(d) {
//         return xScale(d[0]);
//     })
//     .attr("cy", function(d) {
//         return yScale(d[1]);
//     })
//     .attr("r",  function(d) {
//         return rScale(d[1]);
//     });
//
//
// svg.selectAll("text")
//        .data(dataset)
//        .enter()
//        .append("text")
//        .text(function(d) {
//             return d[0] + "," + d[1];
//        })
//        .attr("x", function(d) {
//             return xScale(d[0]);
//             })
//         .attr("y", function(d) {
//             return yScale(d[1]);
//           })
//        .attr("font-family", "sans-serif")
//        .attr("font-size", "11px")
//        .attr("fill", "red");
//
// var xAxis = d3.svg.axis()
//                   .scale(xScale)
//                   .orient("bottom")
//                   .ticks(5);  //Set rough # of ticks
//
// var yAxis = d3.svg.axis()
//                   .scale(yScale)
//                   .orient("left")
//                   .ticks(5);
//
// svg.append("g")
//     .attr("class", "axis")  //Assign "axis" class
//     .attr("transform", "translate(0," + (h - padding) + ")")
//     .call(xAxis);
//
// svg.append("g")
//     .attr("class", "axis")
//     .attr("transform", "translate(" + padding + ",0)")
//     .call(yAxis);

// var width = 610,
//     height = 640;
//
// var nodes = d3.range(50).map(function() {
//    return {radius: Math.random() * 12 + 4};
//  }),
//     root = nodes[0],
//     color = d3.scale.category10();
//
// root.radius = 0;
// root.fixed = true;
//
// var force = d3.layout.force()
//     .gravity(0)
//     .charge(function(d, i) { return i ? 0 : -2000; })
//     .nodes(nodes)
//     .size([width, height]);
//
// force.start();
//
// var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height);
//
// svg.selectAll("circle")
//     .data(nodes.slice(1))
//   .enter().append("circle")
//     .attr("r", function(d) { return d.radius; })
//     .style("fill", function(d, i) { return color(i % 3); });
//
// force.on("tick", function(e) {
//   var q = d3.geom.quadtree(nodes),
//       i = 0,
//       n = nodes.length;
//
//   while (++i < n) q.visit(collide(nodes[i]));
//
//   svg.selectAll("circle")
//       .attr("cx", function(d) { return d.x; })
//       .attr("cy", function(d) { return d.y; });
// });
//
// svg.on("mousemove", function() {
//   var p1 = d3.mouse(this);
//   root.px = p1[0];
//   root.py = p1[1];
//   force.resume();
// });
//
// function collide(node) {
//   var r = node.radius + 16,
//       nx1 = node.x - r,
//       nx2 = node.x + r,
//       ny1 = node.y - r,
//       ny2 = node.y + r;
//   return function(quad, x1, y1, x2, y2) {
//     if (quad.point && (quad.point !== node)) {
//       var x = node.x - quad.point.x,
//           y = node.y - quad.point.y,
//           l = Math.sqrt(x * x + y * y),
//           r = node.radius + quad.point.radius;
//       if (l < r) {
//         l = (l - r) / l * .5;
//         node.x -= x *= l;
//         node.y -= y *= l;
//         quad.point.x += x;
//         quad.point.y += y;
//       }
//     }
//     return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
//   };
// }
//
