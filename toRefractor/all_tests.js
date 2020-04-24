var exp = {
	asgard: {
		point: (x = 0, y = 0)=>{ 
			const pt = asgard.insertPoint( xy(x,y) ); 
			console.log( pt ); 
			return pt 
		},
		edge: (pt_a, pt_b)=>{ 
			const e = asgard.insertEdge(pt_a, pt_b);
			console.log( e );
			return e 
		},
		shape_polyline: ()=>{ console.log( asgard.shape.polyline() ); },
		shape_polygon: ()=>{ console.log( asgard.shape.polygon() ); },
		shape_square: ()=>{ console.log( asgard.shape.square() ); },
		shape_rectangle: ()=>{ console.log( asgard.shape.rectangle() ); },
		shape_triangle: ()=>{ console.log( asgard.shape.triangle() ); },
		shape_star: ()=>{ console.log( asgard.shape.star() ); },
		grid_diamond: ()=> { console.log( asgard.grid.diamond() ); },
		grid_horizontal: ()=> { console.log( asgard.grid.horizontal() ); },
		grid_vertical: ()=> { console.log( asgard.grid.vertical() ); }
	},
	odin: {
		render_point: (pt)=>{ odin.renderSinglePoint(pt); },
		render_points: ()=>{ odin.renderPoints( [ exp.asgard.point( -100, 0 ), exp.asgard.point( 50, 100 ) ] ); },
		render_edge: ()=>{ odin.renderSingleEdge(); },
		render_edges: ()=>{ odin.renderEdges( [ exp.asgard.edge() ] ); },
		render_geometry: ()=>{
			exp.asgard.edge( exp.asgard.point(100, -100), exp.asgard.point(100, 0) ); 
			odin.renderGeometry( asgard.geometry ); 
		},
		clear_and_render: ( geometry )=> {
		  odin.current_layer.clear(); 
		  odin.renderGeometry( geometry );	  
		},
		attach_graphic: ()=>{

			const graphic = odin.attachGraphic();

			graphic.image( 'assets/img/test.png', img_callback );

			function img_callback(){
				pong();

				const pt = exp.freya.rotate_point_cosine();
				graphic.point = pt;
				graphic.drawImage();
				
				freya.addAnimation(function(){
					graphic.drawImage();
				})
			}

			return graphic;
		}
	},
	freya: {
		start_animation: ()=> { freya.start( true ) },
		add_animation: ()=> { freya.addAnimation( console.log( 'Hello World' ) ); freya.start() },
		rotate_point: ()=> {
			const pt = exp.asgard.point( 100, 0 );
			exp.odin.render_point( pt );

			freya.addAnimation( ()=>{
				rotatePoint( pt, xy(0,0), 360/freya.framecount );
				exp.odin.render_point( pt );
			} );

			freya.start();

			return pt
		},
		rotation: ()=> { 
			const line = asgard.shape.polyline( xy(50, 0), xy(300, 0), {line_segments: 15} );
			
			freya.framecount = 600;

			exp.odin.clear_and_render( asgard.geometry );

			freya.addAnimation( ()=>{
				for (var i = 0; i < line.length; i++) {
					// each iteration does one less rotation for the total length of the animation
					const angle = 360 / ( freya.framecount / (line.length - i ) );
					rotatePoint( line[i], xy(0,0), -angle );
				}
				exp.odin.clear_and_render( asgard.geometry );
			} );

			freya.start() 
		},
		rotate_point_cosine: ()=> { 
			// function rotates a point around an origin with easing at the start and end
			// create basic point
			const pt = exp.asgard.point( 100, 0 );
			// set framecount
			freya.framecount = 300;
			// render the point
			exp.odin.clear_and_render( asgard.geometry );

			// calculates the current angle by subtracting the previous angle
			const get_angle = ()=>{
				// interpolate current frame cosine interpolated value for one rotation
				let current_angle = ( getCosineInterpolation(f(), 1, freya.framecount, 0, 360) );
				// if animation has started, subtract the previous frame's angle
				if(f() > 0) current_angle -= ( getCosineInterpolation(f()-1, 1, freya.framecount, 0, 360) );
				
				return current_angle
			}
			// add functions to the animation stack
			freya.addAnimation( ()=>{
				// rotate the point around the center with previously calculated angle value
				rotatePoint( pt, xy(0,0), get_angle() );
				// clear previous render and render the point
				exp.odin.clear_and_render( asgard.geometry );
			} );

			freya.start(true);

			return pt
		},
		rotation_cosine: ()=> { 
			// function rotates a line around an origin with easing at the start and end
			// each point does one more rotation than the previous point on the line
			// create the line:
			const line = asgard.shape.polyline( xy(50, 0), xy(300, 0), {line_segments: 7} );
			// set framecount:
			freya.framecount = 300;
			// render the point:
			exp.odin.clear_and_render( asgard.geometry );

			// calculates the current angle by subtracting the previous angle
			const get_angle = ()=>{
				// interpolate current frame cosine interpolated value for one rotation
				let current_angle = ( getCosineInterpolation(f(), 1, freya.framecount, 0, 360) );
				// if animation has started, subtract the previous frame's angle
				if(f() > 0) current_angle -= ( getCosineInterpolation(f()-1, 1, freya.framecount, 0, 360) );
				
				return current_angle
			}
			// add functions to the animation stack
			freya.addAnimation( ()=>{
				// rotate the line around the center with previously calculated angle value
				for (var i = 0; i < line.length; i++) {
					// each iteration does one less rotation for the total length of the animation
					rotatePoint( line[i], xy(0,0), ( get_angle() * ( i + 1 ) ) );
				}		
				// clear previous render and render the point
				exp.odin.clear_and_render( asgard.geometry );
			} );

			freya.start(true);
		}
	},
	l_system: {
		line: ( location_vector, angle, length = 20 )=>{
			// 'extrude' new point from previous point and rotating it to instruction specified degrees
			const extruded_location = { x: location_vector.x, y: ( location_vector.y + length ) };
			// insert a vector in the scene at the new location
			const new_location = rotateSingleVector( extruded_location, location_vector, angle );
			// create a line between previous and newly created point
			return { start: location_vector, end: new_location }
		},
		geometry_from_lines: ( line_set )=>{
			const total_lines = line_set.lines.length;
			let l;
			for (l = 0; l < total_lines; l++) {
				const pt_a = asgard.insertPoint( line_set.lines[l].start ),
							pt_b = asgard.insertPoint( line_set.lines[l].end );
				asgard.insertEdge( pt_a, pt_b );
			}
		},
		create: ( type )=>{ 
			let l_system;

			switch(type){
				// Lindenmayer's original L-system for modelling the growth of algae:
				case 'algae':
					l_system = createLSystem( 7, 'A', { A: 'AB', B: 'BB' } );
					break;
				case 'cantor_set':
					l_system = createLSystem( 4, 'A', { A: 'ABA', B: 'BBB' } );
					break;
				case 'koch_curve':
					l_system = createLSystem( 3, 'F', { F: 'F+F-F-F+F' } );
					break;
				case 'sierpinski_triangle':
					l_system = createLSystem( 5, 'F-G-G', { F: 'F-G+F+G-F', G: 'GG' } );
					break;
				case 'sierpinski_arrowhead':
					l_system = createLSystem( 5, 'A', { A: 'B-A-B', B: 'A+B+A' } );
					break;
				case 'dragon_curve':
					l_system = createLSystem(9, 'FX', { X: 'X+YF+', Y: '-FX-Y'} );
					break;
				// Fractal (binary) tree:	
				default: 
					l_system = createLSystem();
			}

			console.log( l_system );

			return l_system
		},
		draw: (type)=> { 

			let line_set;

			switch(type){
				// Lindenmayer's original L-system for modelling the growth of algae:
				case 'koch_curve':{
					const l_system = exp.l_system.create( 'koch_curve' ),
								axiom_location = xy(-270,0), 
								instructions = { angle: 90, current_location: axiom_location },
								rules = [
									{ char: 'F', operation: (instruction)=>{ // operation instructions per character
											// create a line between previous and newly created point
											const line = exp.l_system.line( instructions.current_location, instructions.angle );
											// set current_loc to newly created:
											instructions.current_location = line.end;
											// add to return values:
											output.lines.push(line);
									} },
									{ char: '+', operation: (instruction)=>{
										  // add angle to current instructions
										  instructions.angle -= 90;
									} },
									{ char: '-', operation: (instruction)=>{
										  // add angle to current instructions
										  instructions.angle += 90;
									} } ],
								output = { lines: [] };

					const all_lines = drawLSystem( l_system, axiom_location, instructions, rules, output );

					exp.l_system.geometry_from_lines( all_lines );
					
					line_set = all_lines;
					break;
				}
				case 'sierpinski_triangle':{
					const l_system = exp.l_system.create( 'sierpinski_triangle' ),
								axiom_location = xy(-200,300),
								instructions = { angle: 120, current_location: axiom_location },
								rules = [
									{ char: 'F', operation: ()=>{ // operation instructions per character
											// create a line between previous and newly created point
											const line = exp.l_system.line( instructions.current_location, instructions.angle );
											// set current_loc to newly created:
											instructions.current_location = line.end;
											// add to return values:
											output.lines.push(line);
									} },
									{ char: 'G', operation: ()=>{ // operation instructions per character
											rules[0].operation();
									} },
									{ char: '+', operation: ()=>{
										  // add angle to current instructions
										  instructions.angle -= 120;
									} },
									{ char: '-', operation: ()=>{
										  // add angle to current instructions
										  instructions.angle += 120;
									} } ],
								output = { lines: [] };

					const all_lines = drawLSystem( l_system, axiom_location, instructions, rules, output );

					exp.l_system.geometry_from_lines( all_lines );	
					
					line_set = all_lines;
					break;
				}
				case 'sierpinski_arrowhead':{
					const l_system = exp.l_system.create( 'sierpinski_arrowhead' ),
								axiom_location = xy(-325,-250),
								instructions = { angle: 30, current_location: axiom_location },
								rules = [
									{ char: 'A', operation: ()=>{ // operation instructions per character
											// create a line between previous and newly created point
											const line = exp.l_system.line( instructions.current_location, instructions.angle );
											// set current_loc to newly created:
											instructions.current_location = line.end;
											// add to return values:
											output.lines.push(line);
									} },
									{ char: 'B', operation: ()=>{ // operation instructions per character
											rules[0].operation();
									} },
									{ char: '+', operation: ()=>{
										  // add angle to current instructions
										  instructions.angle -= 60;
									} },
									{ char: '-', operation: ()=>{
										  // add angle to current instructions
										  instructions.angle += 60;
									} } ],
								output = { lines: [] };

					const all_lines = drawLSystem( l_system, axiom_location, instructions, rules, output );

					exp.l_system.geometry_from_lines( all_lines );
					
					line_set = all_lines;
					break;
				}
				case 'fractal_tree':{
					const all_lines = drawLSystem();

					const total_lines = all_lines.lines.length;
					let l;
					for (l = 0; l < total_lines; l++) {
						const pt_a = asgard.insertPoint( all_lines.lines[l].start ),
									pt_b = asgard.insertPoint( all_lines.lines[l].end );
						asgard.insertEdge( pt_a, pt_b );
						if( all_lines.lines[l].hasOwnProperty( 'leaf' ) ) odin.addSymbol( pt_b, 8, restcolors[getRandomInt(3)] );
					}
					
					line_set = all_lines;
					break;
				}
				case 'dragon_curve':{
					const l_system = exp.l_system.create('dragon_curve'),
								axiom_location = xy(-150,-100),
								instructions = { angle: 0, current_location: axiom_location },
								rules = [
									{ char: 'F', operation: ()=>{ // operation instructions per character
											// create a line between previous and newly created point
											const line = exp.l_system.line( instructions.current_location, instructions.angle );
											// set current_loc to newly created:
											instructions.current_location = line.end;
											// add to return values:
											output.lines.push(line);
									} },
									{ char: '+', operation: ()=>{
										  // add angle to current instructions
										  instructions.angle += 90;
									} },
									{ char: '-', operation: ()=>{
										  // add angle to current instructions
										  instructions.angle -= 90;
									} } ],
								output = { lines: [] };

					const all_lines = drawLSystem( l_system, axiom_location, instructions, rules, output );

					exp.l_system.geometry_from_lines( all_lines );
					
					line_set = all_lines;
					break;
				}
				default:{
					line_set = drawLSystem();
				}
			}

			exp.odin.clear_and_render(asgard.geometry);

			console.log( line_set );

			return line_set
		}
	},
	noise: {

	},

	cache: ()=>{
		const shape = exp.asgard.shape_star();
		
		// render out the shape:
		exp.odin.clear_and_render( asgard.geometry );
	},
}