// square, circle, line, polygon

// function Triangle(ptCloudNumber, type, xy_vector, w, h) // creates a triangle with origin in the centroid
//   { // wil eigenlijk meer opties voor origin maar dit is even ok.
//     // centroid is 0 relative.
//     // centroid is located 1/3 up the median line of each side
//     this.centroid = {x: 0, y: 0};

//     let scale = (w <= h) ? h : w; // scale based on highest value

//     this.x = xy_vector.x;
//     this.y = xy_vector.y;


//     // function creates all types of triangles.
//     switch(type)
//       {
//         case 'equal':
//         // uses w as a size
//         this.size = w;

//         // triangle relative to origin 0,0
//         // equal triangle height
//         let height = triangleCalculate(false, this.size, this.size/2, false, 90, false).A;
//         height = height/scale; // relative height
//         this.a = {x: -0.5, y: ((-1/3)*height)}
//         this.b = {x: 0.5, y: ((-1/3)*height)}
//         this.c = {x: 0, y: ((2*(1/3))*height)}

//         break;

//         case 'normal':
//         // storing input information for later use.
//         this.height = h;
//         this.width = w;

//         let rHeight = h / scale; // relative sizes 0:1
//         let rWidth = w / scale;

//         this.a = {x: (-0.5*rWidth), y: (-(1/3)*rHeight)}
//         this.b = {x: (+0.5*rWidth), y: (-(1/3)*rHeight)}
//         this.c = {x: 0, y: ((2*(1/3))*rHeight)}

//         break;
//       }

//       // creating the points
//       let pt_a = new Point( {x: (this.x+(this.a.x*scale)), y: (this.y+(this.a.y*scale))}, ptCloudNumber );
//       let pt_b = new Point( {x: (this.x+(this.b.x*scale)), y: (this.y+(this.b.y*scale))}, ptCloudNumber );
//       let pt_c = new Point( {x: (this.x+(this.c.x*scale)), y: (this.y+(this.c.y*scale))}, ptCloudNumber );

//       this.points = [pt_a.ptNum, pt_b.ptNum, pt_c.ptNum];

//       // Connecting the points with edges.
//       let edge_A = new Edge(pt_c, pt_b);
//       let edge_B = new Edge(pt_a, pt_c);
//       let edge_C = new Edge(pt_a, pt_b);
//   }

class Line{
  constructor(
  xy_vector_start, 
  xy_vector_end){
    // Creates a line from start xy to end xy vector. Line is divided in n subdivisions
    // create array to store number for points and edges
    this.points = [];
    this.edges = [];  
  }

  createPoints(xy_vector_start, 
    xy_vector_end, 
    preferences){
    // standard settings
    // line can be devided into sections
    let segments = 2;

    // optional preferences
    if(preferences != undefined){
      if(preferences.segments != undefined) segments = preferences.segments;
    }

    // generate points
    for (let s = 0; s < segments+1; s++){
      // linear interpolate of point of segment of line
      let point_coordinates =
        {
          x : map(s, 0, segments, xy_vector_start.x, xy_vector_end.x),
          y : map(s, 0, segments, xy_vector_start.y, xy_vector_end.y)
        }

      // create point
      let point = new Point(point_coordinates)
      this.points.push(point);
    }
  }

  createEdges(preferences){
    // generate edges as default
    let edges = true;

    // optional preferences
    if(preferences != undefined){
      if(preferences.edges != undefined) edges = preferences.edges;
    }

    if(edges){
      for (let e = 0; e < this.points.length-1; e++){
        let point_object_a = this.points[e];
        let point_object_b = this.points[e+1];
        let edge = new Edge(point_object_a, point_object_b)
        this.edges.push(edge)
      }
    }
  }

  get segments(){
    return this.points.length;
  }

}

function createShape_line(
  xy_vector_start, 
  xy_vector_end,
  pointcloud_object,
  preferences){
  let line = new Line(xy_vector_start, xy_vector_end);
  line.createPoints(xy_vector_start, xy_vector_end, preferences);
  line.createEdges(preferences);

  if(pointcloud_object === undefined) pointcloud_object = false;
  if(pointcloud_object != false){
    for(let p = 0; p < line.points.length; p++){
      pointcloud_object.addPoint(line.points[p]);
    }
    for(let e = 0; e < line.edges.length; e++){
      pointcloud_object.addEdge(line.edges[e]);
    }
  }
  return line
}

class Polygon{
  constructor(xy_vector_centerpoint){
    // store the polygon centerpoint
    this.x = xy_vector_centerpoint.x;
    this.y = xy_vector_centerpoint.y;
    
    // Arrays aanameken voor de points en edges
    this.points = [];
    this.edges = [];
  }
  get segments(){
    return this.points.length;
  }

  createPoints(preferences){
    let radius,
        segments;

    // default settings:
    radius = 10;
    segments = 3;

    // optional preferences
    if(preferences != undefined){
      if(preferences.radius != undefined) radius = preferences.radius;
      if(preferences.segments != undefined) segments = preferences.segments;
    }

    // create points
    for(let s = 0; s < segments; s++){
      let current_radian = map(s, 0, segments, 0, Math.PI*2); // linear interpolate the current radians per segment
      let point = new Point({x: this.x + Math.cos(current_radian)*radius, y: this.y + Math.sin(current_radian)*radius}, 0);
      this.points.push(point);
    }
  }

  createEdges(preferences){
    let edges;

    // default settings:
    edges = true;

    // optional preferences
    if(preferences != undefined){
      if(preferences.edges != undefined) edges = preferences.edges;
    }

    // creating edges between each point
    if(edges){
      for(let e = 0; e < this.points.length; e++){
          let edge = (e!=0) ? new Edge(this.points[e-1], this.points[e]) : false;
          if(edge != false) this.edges.push(edge);
        }
      // Laatste edge toevoegen om de vorm te sluiten...
      let edge = new Edge(this.points[this.points.length-1], this.points[0]);
      this.edges.push(edge);
    }
  }
}

function createShape_polygon(
  xy_vector_centerpoint,
  pointcloud_object, 
  preferences){

  let polygon = new Polygon(xy_vector_centerpoint);
  polygon.createPoints(preferences);
  polygon.createEdges(preferences);

  if(pointcloud_object === undefined) pointcloud_object = false;
  if(pointcloud_object != false){
    for(let p = 0; p < polygon.points.length; p++){
      pointcloud_object.addPoint(polygon.points[p]);
    }
    for(let e = 0; e < polygon.edges.length; e++){
      pointcloud_object.addEdge(polygon.edges[e]);
    }
  }

  return polygon
}


// Functionality tests:
function polygonToolExample(){
  let centerpoint = {
    x: 0,
    y: 0
  }

  let total_circles = 25;
  let radius_start = 25;
  let radius_end = 275;

  let segments_start = 3;
  let segments_end = 12;

  // Array aanmaken om cirkels in op te slaan:
  let circles = [];

  let polygon = createShape_polygon(centerpoint);
  circles.push(polygon)

  // Polygons genereren in de vorm van cirkels:
  for (let c = total_circles - 1; c >= 0; c--) {
    let preferences = {
      radius: getFadedPosition(c, total_circles - 1, 0, radius_end, radius_start),
      segments: Math.ceil( map(c, total_circles - 1, 0, segments_end, segments_start) ),
      edges: true
    }
    let circle = createShape_polygon(centerpoint, pointcloud, preferences);
    circles.push(circle);
  }

  // Points en edges op de canvas afdrukken:
  for (let c = circles.length - 1; c >= 0; c--) {
    // grof kleurverloop maken van het kleurenschema...
    let color = restcolors[Math.floor( getFadedPosition(c, 0, circles.length, 0, restcolors.length) )];
    // punten tekenen...
    for (let p = circles[c].points.length - 1; p >= 0; p--) {
      circles[c].points[p].draw(background, 4, color);
    }
    // edges tekenen...
    for (let e = circles[c].edges.length - 1; e >= 0; e--) {
      circles[c].edges[e].draw(background, 2, color);
    }
  }

}


function lineToolExample(){
  let total_lines = 5 + getRandomInt(10);
  if(debug) console.log('total_lines =', total_lines);
  // Aanmaken van random vectors om lijnen tussen te maken:
  let vectors = generateVectors(total_lines*2);
  if(debug) console.log('generated vectors: ', vectors)
  let vector = 0;
  let lines = [];

  for (var l = total_lines - 1; l >= 0; l--) {
    if(debug) console.log('%c current iteration =','background: #555; color: #bada55', l);
    // willekeurige settings genereren
    let preferences = {
      edges: (getRandomInt(2) == 0) ? false : true,
      segments: 2 + getRandomInt(5)
    }
    // preferences.edges = false; // turn edges on/off by default
    if(debug) console.log('preferences:', preferences);
    if(debug) console.log('used vectors: ', vectors[vector], vectors[vector+1]);

    let vector_start = vectors[vector];
    let vector_end = vectors[vector+1];

    let line = createShape_line(vector_start, vector_end, pointcloud, preferences);
    lines.push(line);
    if(debug) console.log('created line object: ', line);

    // Nieuwe vector klaar zetten voor volgende iteratie...
    vector += 2;
    if(debug) console.log('current vector = ', vector);

  }

  if(debug) console.log(lines);


  // printing points of each individual line:
  for (let l = lines.length - 1; l >= 0; l--) {
    // generating random colors...
    let point_color = colorscheme[1 + getRandomInt(4)];
    let edge_color = colorscheme[1 + getRandomInt(4)];
    if(debug) console.log('point_color =', point_color, 'edge_color =', edge_color);
      // drawing edges on canvas....
    for (let e = lines[l].edges.length - 1; e >= 0; e--) {
      lines[l].edges[e].draw(background, 4, edge_color);
    }
    // drawing points on canvas...
    let points = (getRandomInt(2) == 0) ? false : true; // points on or off randomized
    // points = false; // points on/off as default
    if(debug) console.log('Draw points on canvas? ', points);
    if(debug) console.log(lines[l].edges.length);
    if(points || lines[l].edges.length == 0){
      if(debug) console.log('creating points...');
      for (let p = lines[l].points.length - 1; p >= 0; p--) {
        lines[l].points[p].draw(background, 6, point_color);
      }
    }
  }
}
