
// test_functions.point();
// test_functions.point({x: 150, y: 300});

// test_functions.edge();
// connect_edges();
// function connect_edges(){
//   let point_a = new Point({x: 150, y: 300});
//   let point_b = new Point({x: -100, y: 250});
//   test_functions.edge(point_a, point_b);
// }

// test_functions.layers();
// test_functions.layers(layer_container);
// test_functions.layers(layer_container, 'fill_background');
// test_functions.layers(layer_container, 'circle', 'configured');
// test_functions.layers(layer_container, 'circle');
// test_functions.layers(layer_container, 'line', 'configured');

// test_functions.layers(layer_container, 'line');
// test_functions.layers(layer_container, 'rectangle', 'configured')
// test_functions.layers(layer_container, 'rectangle')


// test_functions.freya(layer_container, 'line', 'configured');
// console.log(test_functions.freya)


// let foreground = new Layer(layer_container, 'point_and_edges');
// foreground.addToDocument();
// let point_a = new Point({x: -250, y: 250}),
//     point_b = new Point({x: 250, y: 250}),
//     point_c = new Point({x: -150, y: -250}),
//     point_d = new Point({x: 150, y: -250});
//     point_collection = [point_a, point_b, point_c, point_d];
// let edge_a = new Edge(point_a, point_b),
//     edge_b = new Edge(point_c, point_d),
//     edge_collection = [edge_a, edge_b];

// let renderer = new Odin(); // initiate the renderer
// renderer.renderPoints(point_a, foreground);
// renderer.renderPoints(point_b, foreground);
// renderer.renderPoints(point_collection, foreground);

// renderer.renderEdges(edge_a, foreground);
// renderer.renderEdges(edge_b, foreground);

// let pointspace = new Asgard;


// function(point_a){
  //   point_object.x += 4;
  // }
// test_functions.drawPoint(point, layer);

// background.fill(maincolor);

// testLayerFunctionality(layer_container)

// pointTest(50, foreground, colorscheme)
// let vector_a = {x:100, y:100};
// let vector_b = {x:-100, y:-100};
// background.printLine(vector_a, vector_b, )

// Aanmaken van een pointcloud om punten in op te slaan:
// let pointcloud = new Pointcloud;

// function movePoint(point_object){
//   foreground.clear();
//   let translation = {x: 0.3, y: 0.6};
//   translatePoint(point_object, translation)
//   point_object.draw(foreground, 5, color);
// }

// // animate(function(){ movePoint(point_a) }, animation_seconds);


// let origin = {x: 0, y: 0},
//     fps = 64, 
//     angle = 52,
//     radius = 5,
//     max_radius = 50,
//     total_degrees = 0,
//     current_color = 0,
//     increase = 5;

// function rotateAroundOrigin(point_object, origin){
//   // foreground.clear();
//   total_degrees += angle;

//   if(total_degrees >= 360){
//     current_color += 1;
//     total_degrees = 0;
//     radius += increase;
//   }
//   if(radius >= max_radius){ 
//     increase = increase * -1;
//     radius = max_radius + increase;
//   }
    
//   if(radius < 0){
//     increase = Math.abs(increase);
//     radius = 5;
//   }
//   if(current_color > restcolors.length) current_color = 0;
//   let test = rotatePoint(origin, point_object, angle);
//   point_object.draw(foreground, radius, restcolors[current_color], true);
// }



// function animation(func){
//   let stop_animation = false;
//   const { ipcRenderer } = require('electron');
//   ipcRenderer.on('colorscheme_changed', (event, arg) => {
//     // pause the animation
//     stop_animation = true
//     // clear the canvas
//     foreground.clear()
//     // reset colorscheme:
//     colorscheme = arg;
//     maincolor = arg[0];
//     restcolors = [].concat(colorscheme);
//     restcolors.shift();
//     background.fill(maincolor);   
//   })

//   ipcRenderer.once('asynchronous-message', (event, arg) => {
//       if(arg == 'child_window_closed'){
//         // remove colorscheme ipc listener:
//         ipcRenderer.removeAllListeners('colorscheme_changed')
//         // restart animation after 1 second:
//         setTimeout( function(){
//           animation(func)
//         }, 1000);
//       } 
//   })  



//   let one_frame_length = 1000 / fps;
//   let current_frame = 0;
//   let animation_length = animation_seconds * fps;
  
//   let timer = setInterval(function() {
//     current_frame += 1;
//     func();
//     if (current_frame == animation_length || stop_animation == true) clearInterval(timer);
//   }, one_frame_length );
// }

// animation(function(){ rotateAroundOrigin(point_a, origin) });