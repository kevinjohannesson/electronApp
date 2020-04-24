
// class Odin{
// 	// renderer object for interaction between pointspace and the canvas
// 	constructor(){
// 		this.layers = [];
// 	}

// 	clearLayer(layer_object){ // clear layer for single layer or array of layers
// 		if(arguments[0] instanceof Layer){
// 			layer_object.clear();
// 		} else {
// 				for (let i = 0; i < arguments.length; i++) {
// 					arguments[i].clear();
// 				}
// 		}
// 	}

// 	fillLayer(layer_object, color){
// 		layer_object.fill(color);
// 	}


// 	// point space

// 	getPointPixelPosition(point_object, layer_object){
// 		// layer is calculated as 0,0 being the top corner whereas the euclidean space allows for negative locations so the screen has to be split in 4 quarters with 0,0 being the dead center of the layer...
// 		// get point' absolute pixel position in the layer object:
// 		let point_pixel_position_x = layer_object.width/2 + point_object.x,
// 				point_pixel_position_y = layer_object.height/2 - point_object.y,
// 				pixel_xy_vector = { x: point_pixel_position_x, y: point_pixel_position_y };
// 		return pixel_xy_vector
// 	}

// 	renderPoints(point_object, layer_object){
// 		let that = this;
// 		console.log(point_object.constructor)
// 		console.log(typeof(point_object))
// 		if(typeof(point_object) == 'object' && point_object.constructor !== Array){ // for single point in first argument
// 			renderSinglePoint(point_object, layer_object);
// 		}
// 		else if(point_object.constructor === Array){ // for array of points in first argument
// 			for (var p = point_object.length - 1; p >= 0; p--) {
// 				this.renderPoints(point_object[p], layer_object);
// 			}
// 		}
		
// 		function renderSinglePoint(point_object, layer_object){
// 			// calculate absolute pixel value of the point in the canvas:	
// 			let pixel_xy_vector = that.getPointPixelPosition(point_object, layer_object)
// 			// draw a shape at the point location:
// 			// load preferences and configure the point display:
// 			let preferences = new Preferences,
// 					point_display = preferences.read('point_display'),
// 					point_radius = parseInt(preferences.read('point_radius')),
// 					point_color = preferences.read('point_color'),
// 					config = {
// 						fill: true,
// 						fill_color: point_color
// 					};
// 			switch(point_display){
// 				case 'circle':
// 					// draw points on the canvas in a circle, point is dead center of circle
// 					layer_object.printCircle(pixel_xy_vector, point_radius, config)
// 				break;
// 				case 'square':
// 					// draw points on the canvas in a square, point location is dead center of the square
// 					let xy_vector_top_left = {x: pixel_xy_vector.x - point_radius, y: pixel_xy_vector.y - point_radius},
// 						xy_vector_bottom_right = {x: pixel_xy_vector.x + point_radius, y: pixel_xy_vector.y + point_radius};
// 					layer_object.printRectangle(xy_vector_top_left,xy_vector_bottom_right, config);
// 				break;
// 				case 'plus':
// 					// draw point on the canvas in a plus shape
// 					// determining line start and end vector positions:
// 					let xy_vector_vertical_line_start = {x: pixel_xy_vector.x, y: pixel_xy_vector.y - point_radius},
// 							xy_vector_vertical_line_end = {x: pixel_xy_vector.x, y: pixel_xy_vector.y + point_radius},
// 							xy_vector_horizontal_line_start = {x: pixel_xy_vector.x - point_radius, y: pixel_xy_vector.y },
// 							xy_vector_horizontal_line_end = {x: pixel_xy_vector.x + point_radius, y: pixel_xy_vector.y};
// 					// create horizontal and vertical lines on canvas:
// 					layer_object.printLine(xy_vector_vertical_line_start, xy_vector_vertical_line_end);
// 					layer_object.printLine(xy_vector_horizontal_line_start, xy_vector_horizontal_line_end);
// 				break;
// 			}
// 		}
// 	}

// 	renderEdges(edge_object, layer_object){
// 		let that = this;
// 		if(typeof(edge_object) == 'object' && edge_object.constructor !== Array){
// 			renderSingleEdge(edge_object, layer_object);
// 		}
// 		else if(edge_object.constructor === Array){
// 			for (var e = edge_object.length - 1; e >= 0; e--) {
// 				renderSingleEdge(edge_object[e], layer_object);
// 			}
// 		}
// 		function renderSingleEdge(edge_object, layer_object){
// 			let point_a = edge_object.points[0],
// 					point_b = edge_object.points[1];
// 			let xy_vector_edge_start = that.getPointPixelPosition(point_a, layer_object),
// 					xy_vector_edge_end = that.getPointPixelPosition(point_b, layer_object);
// 			layer_object.printLine(xy_vector_edge_start, xy_vector_edge_end);
// 		}
// 	}
// }