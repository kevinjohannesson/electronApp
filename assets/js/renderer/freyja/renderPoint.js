Freyja.prototype.renderPoint = function( point = { x: 0, y: 0 }, scale = 1 ) {
		// configure the plus stroke and fill:
		const config = { // configure the path rendering options:
			strokeStyle: 'black', 
			strokeThickness: ( 2 * scale ), 
			stroke: true, 
			fill: false 
		};
		// get absolute location of the point:
		const location_abs = this.getAbsoluteLocation( point ),
		// get endpoint locations of horizontal and vertical lines:
					line_h_a = { x: location_abs.x - ( 5 * scale ), y: location_abs.y },
					line_h_b = { x: location_abs.x + ( 5 * scale ), y: location_abs.y },
					line_v_a = { x: location_abs.x, y: location_abs.y + ( 5 * scale ) },
					line_v_b = { x: location_abs.x, y: location_abs.y - ( 5 * scale ) };
		// draw horizontal line:
		this.current_layer.Line( line_h_a, line_h_b, config );
		// draw vertical line:
		this.current_layer.Line( line_v_a, line_v_b, config );
	}