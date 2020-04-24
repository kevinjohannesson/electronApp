let Odin;
{
	function absoluteLocation( 
			point = { x: -100, y: 100 }, 
			artboard = { width: 800, height: 600 } )
		{
			// get point absolute position on specified artboard object.
			// absolute position is calculated as 0,0 being the top left.
			// artboard is divided horizontally and vertically to account
			// for negative location values
			return { 
				x: ( artboard.width / 2 ) + point.x,
				y: ( artboard.height / 2 ) - point.y 
			}
		}



	class Layer{
    constructor(){
      // every layer is a new canvas element:
	    this.canvas = document.createElement('canvas');
	    // store the context
	    this.context = this.canvas.getContext('2d');
	    // optional arguments upon creation:
	    // div container element:
	    if(arguments){ 
	      if(arguments[0] instanceof Element){
	        this.addToDocument(arguments[0]);
	      }
	      // optional canvas element id
	      if(arguments[1]){ // string to set id to
	        this.id = arguments[1].toString();
	      }
	    }
    }
    echo(){
    	console.log(this);
    }
    set height(h){
	    this.canvas.height = h;
  }

  get height(){
    return this.canvas.height
  }

  set width(w){
    this.canvas.width = w;
  }

  get width(){
    return this.canvas.width
  }

  addToDocument(container_div, id_name){
    if(id_name) this.id = id_name;
    // edit canvas dimensions to container div:
    this.height = container_div.clientHeight;
    this.width = container_div.clientWidth;
    // add canvas element to container div...
    container_div.appendChild(this.canvas);
    // make visible as the default...
    this.show(true);
  }

  set id(name){
    // add optional ID
    this.canvas.setAttribute('data-layer', name);
  }

  get id(){
    return this.canvas // this is not correct yet...........
  }

  set opacity(float_val){
  	this.canvas.style.opacity = float_val;
  }
  get opacity(){
  	return this.canvas.style.opacity;
  }

  show(bool){
    if(bool) this.canvas.style.display = 'block';
    else this.canvas.style.display = 'none';
  }

  fill(color){
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

  clear(){
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
  }

  drawLine(xy_vector_a, xy_vector_b, options){
    // create path at supplied coordinates:
    this.context.beginPath();
    this.context.moveTo( xy_vector_a.x, xy_vector_a.y );
    this.context.lineTo( xy_vector_b.x, xy_vector_b.y );
    // check for configuration:
    if(options){
      if(options.stroke_thickness) this.context.lineWidth = options.stroke_thickness;
      if(options.stroke_color) this.context.strokeStyle = options.stroke_color;
    }
    // stroke the path:
    this.context.stroke();
  }

  drawCircle(xy_vector, radius, config){
    // Cirkel op canvas tekenen:
    this.context.beginPath();
    this.context.arc(xy_vector.x, xy_vector.y, radius, 0, Math.PI * 2);
    // arc is created, now to fill or stroke the arc:
    if(config){
      if(config.fill == true){
        this.context.fillStyle = config.fill_color;
        this.context.fill(); 
      }
      if(config.stroke_thickness) this.context.lineWidth = config.stroke_thickness;
      if(config.stroke == true){
        this.context.strokeStyle = config.stroke_color;
        this.context.stroke();
      }
    } else this.context.stroke();
  }

  drawRectangle(xy_vector_top_left, xy_vector_bottom_right, config){
    // draw a rectangle on the canvas:
    let width = xy_vector_bottom_right.x - xy_vector_top_left.x,
        height = xy_vector_bottom_right.y - xy_vector_top_left.y;
    
    if(config){
      if(config.fill == true){
        this.context.fillStyle = config.fill_color;
        this.context.fillRect( xy_vector_top_left.x, xy_vector_top_left.y, width, height );
      }
      if(config.stroke_thickness) this.context.lineWidth = config.stroke_thickness;
      if(config.stroke == true){
        this.context.strokeStyle = config.stroke_color;
        this.context.strokeRect( xy_vector_top_left.x, xy_vector_top_left.y, width, height );
      }
    } else this.context.strokeRect( xy_vector_top_left.x, xy_vector_top_left.y, width, height );
  }

	  
	  }

	class Graphic {
		constructor( point_object = { x: 0, y: 0 }, layer ){
			this.point = point_object;
			this.layer = layer;
		}

		get origin(){
			return absoluteLocation( this.point, this.layer ) 
		}

		// methods
		drawCircle( color ){
			const config = {
							fill: true,
							fill_color: color
						};
			this.layer.drawCircle(this.origin, 30, config )
		}

		image( url = 'assets/img/test.png', callback){
			this.dwidth = 50;
			this.dheight = 50;
			
			
			
			
			const img = new Image();   // Create new img element
			img.src = 'assets/img/test.png'; // Set source path

			this.img = img;

			img.addEventListener('load', function(){
				ping();
				callback();
			}, false);
		}

		drawImage(){
			this.dx = ()=>{ return this.origin.x - this.dwidth / 2 };
			this.dy = ()=>{ return this.origin.y - this.dheight / 2 };

			const ctx = this.layer.context; //odin.current_layer.context
			ctx.drawImage(this.img, this.dx(), this.dy(), this.dwidth, this.dheight);
			// const dwidth = 50,
			// 			dheight = 50,
			// 			dx = this.origin.x - dwidth / 2,
			// 			dy = this.origin.y - dheight / 2;
			
			
			
			// const img = new Image();   // Create new img element



			// // var img1 = document.createElement("img");
			// // img.src = "https://www.w3schools.com/tags/img_the_scream.jpg";
			// img.src = 'assets/img/test.png'; // Set source path
			// // const img = document.getElementById('source');
			// // console.log(img)

			// const ctx = this.layer.context; //odin.current_layer.context
			



			

			// function draw(){
			// 	// echo();

			// 	// ctx.drawImage(img, 33, 71, 104, 124, 21, 20, 87, 104);
			// 	ctx.drawImage(img, dx, dy, dwidth, dheight);
				

			// 	// console.log(this.layer.context)
			// 	// this.layer.context.drawImage(img1, x, y);
			// 	// this.layer.context.drawImage(img1, 33, 71, 104, 124, 21, 20, 87, 104);
			// }
			// img.addEventListener('load', function(){
			// 	draw.call( this );
			// }, false);
			


		}
	}

  Odin = class Odin {
    constructor(container_element, preferences){
      
      this.container = container_element;
      this.preferences = preferences;
      this.layers = [];
      this.symbols = [];
      // initialize with a base layer
      this.current_layer = this.createLayer('background')
    }

    ////// canvas layer methods
    
    createLayer( name = 'new_layer' ){
    	// creates a new canvas layer and adds it to the renderer.
    	const layer = new Layer( this.container, name );
    	this.layers.push( layer );
    	this.current_layer = layer;
    	return layer
    }


    /// denk dat deze weg kunnen in principe is 't gewoon een referentie naar een functie die je ook kunt uitvoeren op de layer zelf

   //  fillLayer( color = 'rgba(125, 125, 125, 1)', layer = this.current_layer ){
   //  	layer.fill(color)
   //  }
 
   //  clearLayer( layer = this.current_layer ){
   //  		layer.clear();
  	// }

  	// deze is nog wel ok denk ik
  	clearAll(){
  		let l;
  		const layers = this.layers;
  					total_layers = layers.length;
    	for (l = 0; l < total_layers; l++) { layers[l].clear(); }
    }


  ////// GRID
  drawGrid(grid_size){
		// Creêert een xy-grid voor de scene...
	    
	  // Limieten aanmaken.
	  const x_start = {x: 0, y: this.current_layer.height/2},
	    		x_end = {x: this.current_layer.width, y: this.current_layer.height/2},
	    		y_start = {x: this.current_layer.width/2, y: 0},
	    		y_end = {x: this.current_layer.width/2, y: this.current_layer.height};
	  

    // Tekenen van grid op de canvas:
    // Scene opdelen in 4 secties dmv een kruisende x- en y-as...
    // Scene wordt opgedeeld in -x+y, +x+y, -x-y, +x-y...
    const x_axis_config = { stroke_thickness: 2, stroke_color: 'rgba(150, 0, 0, 0.5)' },
        	y_axis_config = { stroke_thickness: 2, stroke_color: 'rgba(0, 150, 0, 0.5)' };

    this.current_layer.drawLine( x_start, x_end, x_axis_config);
    this.current_layer.drawLine( y_start, y_end, y_axis_config);
    // Dividing the grid in smaller squares...
    let sub_lines_config = { stroke_thickness: 1, stroke_color: 'rgba(255, 255, 255, 0.25)' };
    // Adding vertical grid lines:
    const half_width = this.current_layer.width/2;
    const half_height = this.current_layer.height/2;
    for (let v = 1; v < half_width; v += grid_size){
      this.current_layer.drawLine( {x: half_width - v, y: 0}, {x: half_width - v, y: this.current_layer.height}, sub_lines_config );
      this.current_layer.drawLine( {x: half_width + v, y: 0}, {x: half_width + v, y: this.current_layer.height}, sub_lines_config );
    }
    // Adding horizontal grid lines:
    for (let u = 0; u < this.current_layer.height; u += grid_size){
      this.current_layer.drawLine( {x: 0, y: half_height - u}, {x: this.current_layer.width, y: half_height - u}, sub_lines_config );
      this.current_layer.drawLine( {x: 0, y: half_height + u}, {x: this.current_layer.width, y: half_height + u}, sub_lines_config );
    }   
	}

		  // placement(side){
		  //   switch(side){
		  //     case 'foreground':
		  //     this.layer.canvas.style.zIndex = 250;
		  //     break;
		  //     case 'background':
		  //     this.layer.canvas.style.zIndex = 0;
		  //     break;
		  //   }
			 //  }
			// }

////// RENDERING POINTS AND EDGES

		getAbsoluteLocation( 
			point = { x: -100, y: 100 }, 
			artboard = { width: 800, height: 600 } )
		{
			// get point absolute position on specified artboard object.
			// absolute position is calculated as 0,0 being the top left.
			// artboard is divided horizontally and vertically to account
			// for negative location values
			return { 
				x: ( artboard.width / 2 ) + point.x,
				y: ( artboard.height / 2 ) - point.y 
			}
		}

    renderSinglePoint( 
    	point = { x: 0, y: 0 }, 
    	layer = this.current_layer )
    {
    	// draw the point on the canvas


			const loc = this.getAbsoluteLocation(point, layer);
			// load preferences and configure the point display:
			const display_type = this.preferences.point_display,
						radius = parseInt( this.preferences.point_radius ),
						color = this.preferences.point_color,
						config = {
							fill: true,
							fill_color: color
						};

			switch(display_type){
				case 'circle':{
					layer.drawCircle(loc, radius, config)
					break;
				}
				case 'square':{
					const top_left = { x: loc.x - radius, y: loc.y - radius },
								bottom_right = { x: loc.x + radius, y: loc.y + radius };
					layer.drawRectangle(top_left,bottom_right, config);
					break;
				}
				case 'plus':{
					const v_start = {x: loc.x, y: ( loc.y - radius ) },
								v_end = {x: loc.x, y: ( loc.y + radius ) },
								h_start = {x: ( loc.x - radius ), y: loc.y },
								h_end = {x: ( loc.x + radius ), y: loc.y };
					// create horizontal and vertical lines on canvas:
					layer.drawLine( v_start, v_end );
					layer.drawLine( h_start, h_end );
					break;
				}
			}
		}

		renderPoints( 
			points = { x: 0, y: 0 }, 
			layer = this.current_layer)
		{
			// render single point or an array of points
			if(typeof(points) == 'object' && points.constructor !== Array){ // for single point in first argument
					this.renderSinglePoint(points, layer);
			}
			else if(points.constructor === Array){ // for array of points in first argument
				// render multiple points
				for (let p = points.length - 1; p >= 0; p--) {
					this.renderSinglePoint(points[p], layer);
				}
			}
		}

		renderSingleEdge( 
			edge = { points: [ { x: -100, y: -100 },{ x: -100, y: 0 } ] }, 
			layer = this.current_layer )
		{
			// edges are printed as a line
			const start = this.getAbsoluteLocation(edge.points[0], layer),
						end = this.getAbsoluteLocation(edge.points[1], layer);
			layer.drawLine( start, end, { stroke_thickness: 2 } );
		}

		renderEdges( 
			edges = { points: [ { x: 0, y: 0 },{ x: 100, y: 100 } ] }, 
			layer = this.current_layer )
		{
			const parent = this;
			if( typeof(edges) == 'object' && edges.constructor !== Array ){
					this.renderSingleEdge(edges, layer);
			}
			else if( edges.constructor === Array ){
				for (let e = edges.length - 1; e >= 0; e--) {
					this.renderSingleEdge(edges[e], layer);
				}
			}
		}
		
		renderGeometry( 
			geometry = { points: [], edges: [] }, 
			layer = this.current_layer )
		{
			let e;
			const edges = geometry.edges,
						total_edges = edges.length;
			for (e = 0; e < total_edges; e++) {
				this.renderSingleEdge( edges[e], layer );
			}
			
			let pt;
			const points = geometry.points,
						total_pts = points.length;
			for (pt = 0; pt < total_pts; pt++) {
				this.renderSinglePoint( points[pt], layer );
			}
			
		}

		clearAndRender( geometry = { points: [], edges: [] } ){
		  // clear the layer:
		  this.clearLayer();
		  // render geometry:
		  this.renderGeometry( geometry );
		  // render symbols:
		  // this.renderSymbols();
		}

// SYMBOLS

	attachGraphic( point = { x: 0, y: 0 } ){
    	// calculate absolute pixel value of the point in the canvas:
    	// const parent = this;	
    	// const graphic = {
    	// 	origin: ()=>{ return parent.getAbsoluteLocation( point, parent.current_layer ) }
    	// }


    	const graphic = new Graphic( point, this.current_layer );
    	console.log(graphic.origin);
				// let that = this;
				
				// let symbol = {
				// 	origin: function(){
				// 		const aapje = {x: point_object.nx, y: point_object.ny};
				// 		return that.getPointPixelPosition(aapje, that.current_layer)
				// 	}, 
				// 	radius: radius, 
				// 	config: {
				// 			fill: true,
				// 			fill_color: color
				// 		}
				// }
				
				// this.symbols.push(symbol);

				return graphic
  }











    addSymbol(point_object, radius, color){
    	// calculate absolute pixel value of the point in the canvas:	
				let that = this;
				
				let symbol = {
					origin: function(){
						const aapje = {x: point_object.nx, y: point_object.ny};
						return that.getPointPixelPosition(aapje, that.current_layer)
					}, 
					radius: radius, 
					config: {
							fill: true,
							fill_color: color
						}
				}
				
				this.symbols.push(symbol);

				return symbol
    }

    



  	


		renderSymbols(layer_object = this.current_layer){
			// draw shape on the canvas in a circle, point is dead center of circle
				for (let i = 0; i < this.symbols.length; i++) {
					let symbol = this.symbols[i];
					layer_object.printCircle(symbol.origin(), symbol.radius, symbol.config)
				}
						
		}

		renderSingleSymbol(symbol_object, layer_object = this.current_layer){
			// draw shape on the canvas in a circle, point is dead center of circle
			ayer_object.printCircle(symbol_object.origin(), symbol_object.radius, symbol_object.config)					
		}

		




  }
}