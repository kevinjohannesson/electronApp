let test_functions = {
	point: function(){
		if(arguments.length == 0){
			// most basic test for point creation:
			// set up arbitrary vector for point location:
			let xy_vector = {x: 0, y: 0};
			// create Point class at xy_vector:
			let point = new Point(xy_vector);
			// console.log(point);
			
			return point
		} else{
				// point creation with supplied vector:
				let xy_vector = arguments[0];
				// create Point class at xy_vector:
				let point = new Point(xy_vector);
				// console.log(point);
				
				return point
			}
	},
	edge: function(test_case){
		if(arguments.length == 0){
			// basic edge setup:
			// setting up two points to connect with an edge using arbitrary vectors:
			let xy_vector_a = {x: -250, y: -200},
					xy_vector_b = {x: 200, y: 100},
					point_a = this.point(xy_vector_a),
					point_b = this.point(xy_vector_b);
			// creating Edge class between two points:
			let edge = new Edge(point_a, point_b);
			// console.log(edge);
			
			return edge
		} else {
				// create an edge between two provided point class objects:
				let point_a = arguments[0],
						point_b = arguments[1];
				let edge = new Edge(point_a, point_b);
				console.log(edge);
				
				return edge
			}
	},
	layers: function(){
		if(arguments.length == 0){
			// basic layer setup:
			let layer = new Layer();
			// console.log(layer);

			return layer
		}
		else if(arguments.length == 1){
			// create layer and add to document in supplied container
			let layer = this.layers();
			layer.addToDocument(arguments[0], 'some-id');
			// console.log(layer);

			return layer
		}
		else if(arguments.length > 1){
			// create a layer, add it to document and create shapes
			let layer = this.layers(arguments[0]);
			layer.id = arguments[1];
			// setting up some colors for the shapes:
		  let colortheme = ["rgb(199, 30, 42)",
		        "rgb(203, 199, 196)",
		        "rgb(31, 33, 29)",
		        "rgb(0, 45, 168)",
		        "rgb(226, 192, 85)"];
		  // check what shape is requested:
			switch(arguments[1]){
				case 'fill_background':
					// fill the background
		  		layer.fill(colortheme[1]);
				break;
				case 'line':
					// setup the line parameters and config:
				  let line_start = {x: layer.width/2, y: layer.height/6},
				  		line_end = {x: (layer.width/2), y: layer.height - layer.height/6},
				  		line_config = (arguments[2] == 'configured') ? {
				  			stroke_color: colortheme[3],
				  			stroke_thickness: 10
				  		} : undefined;
				  // add line to the canvas with optional configuration
				  layer.printLine(line_start, line_end, line_config)
				break;
				case 'circle':
					// setup the circle parameters and config:
				  let circle_origin = {x: layer.width/2, y: layer.height/2},
				  		circle_radius = layer.width/3,
				  		circle_config = (arguments[2] == 'configured') ? {
                stroke: true,
                stroke_thickness: 10,
                stroke_color: colortheme[4],
                fill: true,
                fill_color: colortheme[0]
              } : undefined;
				  // add circle on the canvas with optional configuration
				  layer.printCircle(circle_origin, circle_radius, circle_config);
				break;
				case 'rectangle':
					// setup the rectangle parameters and config:
				  let rectangle_top_left = {x: layer.width/3, y: layer.width/3},
	  					rectangle_bottom_right = {x: (layer.width/3)+(layer.width/3), y: (layer.height/3)+(layer.height/3)},
				  		rectangle_config = (arguments[2] == 'configured') ? {
                stroke: true,
                stroke_thickness: 10,
                stroke_color: colortheme[2],
                fill: true,
                fill_color: colortheme[1]
              } : undefined;
				  // add rectangle on the canvas with optional configuration
				  layer.printRectangle(rectangle_top_left, rectangle_bottom_right, rectangle_config);
				break;
			}
		}
	},
	freya: { line: 'aapje', hoofd: 'duif'}	
}