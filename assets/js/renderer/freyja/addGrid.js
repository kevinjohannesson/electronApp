class Plane {
	constructor(){
		this.width = 700;
		this.height = 500;

    
    this.grid = {
      x: { 
          minValue: -15,
          maxValue: 6,
          axisConstant: 'number', 
          axisTicks: '[array]',
          gridLines: '[array]' },
      y: { 
          minValue: -30,
          maxValue: -40,
          axisConstant: 'number', 
          axisTicks: '[array]',
          gridLines: '[array]' }
      // y: { x: this.getAxisConstantValue('y', -40, -20), 
      //          yStart: 0,
      //          yEnd: this.height,
      //          ticks: [] } 
             };

    this.grid.x.axisConstant = this.getAxisConstantValue('x', this.grid.y.minValue, this.grid.y.maxValue);
    this.grid.y.axisConstant = this.getAxisConstantValue('y', this.grid.x.minValue, this.grid.x.maxValue);
    this.grid.x.gridLines = this.createGridLines();
    this.grid.y.gridLines = this.createGridLines('y');

    // this.setAxisConstantValue('y');
	}

  createGridLines( axisLetter = 'x', gridLineEvery = 1 ) {
    console.log( '  @param axisLetter: ', axisLetter );
    console.log( '%c createGridLines(): ', 'background-color: goldenrod; color: black' );
    console.log( '  @param gridLineEvery: ', gridLineEvery );
    // const axisConstantValue = this.grid[ axisLetter ].axisConstant;
    // if(debug) console.log( '  $axisConstantValue: ', axisConstantValue );
    const is_xAxis = axisLetter === 'x';
    console.log( '  $is_xAxis: ', is_xAxis );
    const perpendicularAxisLetter = is_xAxis ? 'y' : 'x';
const differenceBetweenMinAndMaxValue = diff( this.grid[perpendicularAxisLetter].minValue, this.grid[perpendicularAxisLetter].maxValue)
console.log( '  $differenceBetweenMinAndMaxValue: ', differenceBetweenMinAndMaxValue );

const heightOrWidth = this[ is_xAxis ? 'height' : 'width' ];
console.log( '  $heightOrWidth: ', heightOrWidth );
const gridSize = heightOrWidth / differenceBetweenMinAndMaxValue;
console.log( '  $gridSize: ', gridSize );

const spaceBetweenEachGridLine = gridSize * gridLineEvery
console.log( '  $spaceBetweenEachGridLine: ', spaceBetweenEachGridLine );

const axisConstant = this.grid[ axisLetter ].axisConstant;
console.log( '  $axisConstant: ', axisConstant );


const axisPositiveValues = lincr( axisConstant, heightOrWidth, spaceBetweenEachGridLine );
if(debug) console.log( '  $axisPositiveValues: ', axisPositiveValues );
const axisNegativeValues = lincr( axisConstant, 0, spaceBetweenEachGridLine );
if(debug) console.log( '  $axisNegativeValues declaration: ', axisNegativeValues );

axisNegativeValues.reverse();
if(debug) console.log( '  $axisNegativeValues after reversing the order: ', axisNegativeValues );
axisNegativeValues.pop();
if(debug) console.log( '  $axisNegativeValues after popping the last item: ', axisNegativeValues );

const axisValues = [ ...axisNegativeValues, ...axisPositiveValues ];
if(debug) console.log( '  $axisValues declaration: ', axisValues );

// let gridLineStart_vectors, gridLineEnd_vectors;
//   axisValues.forEach( function(val){
//     gridLineStart_vector = is_xAxis ? vec2( val, 0 ) : vec2( 0, val );
//   })

const gridLineStart_vectors = axisValues.map( val => {
  return is_xAxis ? vec2( 0, val ) : vec2( val, 0 ); });
if(debug) console.log( '  $gridLineStart_vectors declaration: ', gridLineStart_vectors );

const gridLineEnd_vectors = axisValues.map( val => {
  return is_xAxis ? vec2( this.width, val ) : vec2( this.height, val ); });
if(debug) console.log( '  $gridLineEnd_vectors declaration: ', gridLineEnd_vectors );

const gridLines = gridLineStart_vectors.map( (val, index) =>{
  const line = { start: val, end: gridLineEnd_vectors[index] };
  return line });
if(debug) console.log( '  $gridLines declaration: ', gridLines );

return gridLines


// const gridLineStart_vector = is_xAxis ? vec2( axisValues, 0 ) : vec2( 0, axisValues ),
      // gridLineEnd_vector = is_xAxis ? vec2( axisValues, this.height ) : vec2( this.width, axisValues );
// if(debug) console.log( '  $gridLineStart_vector declaration: ', gridLineStart_vector );
// if(debug) console.log( '  $gridLineEnd_vector declaration: ', gridLineEnd_vector );

  // const axisLineStarts = [ ...xAxisLineStartVectors, ...yAxisLineStartVectors ],
  //       axisLineEnds = [ ...xAxisLineEndVectors, ...yAxisLineEndVectors];
        // xAxisNegativeValues = lincr( x, 0, spaceBetweenEachGridLine );

// const xIncr = this.width / ( diff( xStart, xEnd ) / gridSize );


    // const xAxisPositiveValues = lincr( x, plane.width, xIncr ),
    //     xAxisNegativeValues = lincr( x, 0, xIncr );

    //     xAxisNegativeValues.reverse();
    //     xAxisNegativeValues.pop();


  }

  getAxisConstantValue( axis = 'x', perpendicularAxisStartValue = 0, perpendicularAxisEndValue = 10 ) {
    const debug = debugMode || false;
    if(debug) console.log( '%c getAxisConstantValue(): ', 'background-color: thistle; color: black' );
    if(debug) console.log( '  @param axis: ', axis );
    if(debug) console.log( '  @param perpendicularAxisStartValue: ', perpendicularAxisStartValue );
    if(debug) console.log( '  @param perpendicularAxisEndValue: ', perpendicularAxisEndValue );

    function getNormalizedPosition(){
      if(debug) console.log( '%c getNormalizedPosition(): ', 'background-color: plum; color: black' );
      // calculates a normalized position for an axis.
      let normalizedPosition; // declare an empty position value.
      if( perpendicularAxisStartValue > perpendicularAxisEndValue ) { // If numberStart is higher than numberEnd, do: 
        if(debug) console.log( '  @perpendicularAxisStartValue is bigger than perpendicularAxisEndValue' );
        if ( perpendicularAxisStartValue > 0 && perpendicularAxisEndValue < 0 ) { 
          if(debug) console.log( '  @perpendicularAxisStartValue is bigger than 0 AND perpendicularAxisEndValue is smaller than 0' );
          normalizedPosition = lerp( 0, perpendicularAxisEndValue, perpendicularAxisStartValue, 0, 1 ); } // If numberStart is positive and numberEnd is negative.
        else { 
          normalizedPosition = 1; } }
      else { // if numberStart is lower than number_end, do: 
        if ( perpendicularAxisStartValue < 0 && perpendicularAxisEndValue > 0 ) { 
          normalizedPosition = lerp( 0, perpendicularAxisStartValue, perpendicularAxisEndValue, 0, 1 ); } // If numberStart is negative and numberEnd is positive.
        else { normalizedPosition = 0; } }
      if(debug) console.log( '  $normalizedPosition: ', normalizedPosition );
      if(debug)console.log('return normalizedPosition:', normalizedPosition );
      if(debug)console.log('') 
      return normalizedPosition }

    const normalizedLocation = getNormalizedPosition(); // Get normalized y position of x-Axis numberLine
    if(debug) console.log( '  $normalizedLocation: ', normalizedLocation );
    
    const is_xAxis = axis === 'x';
    console.log( '  $is_xAxis: ', is_xAxis );
    
    const axisConstantValue = is_xAxis ?  lerp( normalizedLocation, 1, 0, 0, this.height ) :
                                          lerp( normalizedLocation, 0, 1, 0, this.width );
    console.log( '  $axisConstantValue:', axisConstantValue );
    
    console.log('return axisConstantValue:', axisConstantValue ) ;
    console.log('');

    return axisConstantValue }

	createAxis( xStart = -5, xEnd = 10, yStart = 0, yEnd = 10 ) {
		function getAxisPosition( numberStart = 0, numberEnd = 10 ){
			let position;
			if( numberStart > numberEnd ) { // If numberStart is higher than numberEnd, do: 
				if ( numberStart > 0 && numberEnd < 0 ) { position = lerp( 0, numberEnd, numberStart, 0, 1 ); } // If numberStart is positive and numberEnd is negative.
				else { position = 1; } }
			else { // if numberStart is lower than number_end, do: 
				if ( numberStart < 0 && numberEnd > 0 ) { position = lerp( 0, numberStart, numberEnd, 0, 1 ); } // If numberStart is negative and numberEnd is positive.
				else { position = 0; } }

			return position
		}

		function createAxisLine( axis, numberStart = 0, numberEnd = 10 ) {	 
			let position = getAxisPosition( numberStart, numberEnd ); // Get normalized y position of x-Axis numberLine
					// console.log('position', position)
					
					// console.log( axis.x0 || axis.y0 || 0, axis.x1 || axis.y1 || 0)
					// console.log(axis)
					// console.log( ( axis.x0 ) ? this.height : this.width )
					position = ( axis.x0 || axis.x0 === 0 ) ? 
            lerp( position, 1, 0, 0, this.height ) : 
            lerp( position, 0, 1, 0, this.width );
					// console.log('position after lerp', position)
			axis[ axis.x || axis.y ] = position;
			
			const line = { 	
							start: { x: axis.x0 || axis.x || 0, y: axis.y0 || axis.y || 0 },
							end: { x: axis.x1 || axis.x || 0, y: axis.y1 || axis.y || 0 } };

			// console.log( line )
			
			return line		
		}

		const xAxis = { x0: 0, x1: this.width, 	y: 'y' },
					yAxis = { y0: 0, y1: this.height, x: 'x' };

		// console.log(xAxis, yAxis)
		
		const xAxisLine = createAxisLine.call( this, xAxis, yStart, yEnd ),
					yAxisLine = createAxisLine.call( this, yAxis, xStart, xEnd ),
					lines = { x: xAxisLine, y: yAxisLine };

		return lines
	}
}




    // const currentAxis = `${axis}Axis`,
    //       perpendicularAxis = `${ is_xAxis ? 'y' : 'x' }`;
    // if(debug) console.log( '$currentAxis: ', currentAxis );
    // if(debug) console.log( '$perpendicularAxis: ', perpendicularAxis );

    // this.grid[ currentAxis ][ perpendicularAxis ] = axisConstantLocation;

    // if(debug)console.log( 'The constant value for the current axis is:', this.grid[ currentAxis ][ perpendicularAxis ] );

// // create an x and y axis based grid plane
// class coordinatePlane {
// 	constructor( layer, xNumbers = [ 0, 15 ], yNumbers = [ 0, 15 ] ) {
// 		this.layer = layer;

// 		this.width = 800;
// 		this.height = 600;

// 		this.create( xNumbers, yNumbers );
// 	}

// 	create( xNumbers, yNumbers ) {
// 		ping();
// 		this.createAxis( xNumbers, yNumbers );
// 	}

// 	createAxis( xNumbers, yNumbers ) {
// 		function getAxisPosition( numberStart = 0, numberEnd = 10 ){
// 			let position;
// 			if( numberStart > numberEnd ) { // If numberStart is higher than numberEnd, do: 
// 				if ( numberStart > 0 && numberEnd < 0 ) { position = lerp( 0, numberEnd, numberStart, 0, 1 ); } // If numberStart is positive and numberEnd is negative.
// 				else { position = 1; } }
// 			else { // if numberStart is lower than number_end, do: 
// 				if ( numberStart < 0 && numberEnd > 0 ) { position = lerp( 0, numberStart, numberEnd, 0, 1 ); } // If numberStart is negative and numberEnd is positive.
// 				else { position = 0; } }

// 			return position
// 		}

// 		function createAxisLine( axis, numberStart = 0, numberEnd = 10 ) {	 
// 			let position = getAxisPosition( numberStart, numberEnd ); // Get normalized y position of x-Axis numberLine
// 					position = lerp( position, 0, 1, axis.x0 || axis.y0, axis.x1 || axis.y1 );

// 			axis[ axis.x || axis.y ] = position;
			
// 			const line = { 	
// 							start: { x: axis.x0 || axis.x, y: axis.y0 || axis.y },
// 							end: { x: axis.x1 || axis.x, y: axis.y1 || axis.y } };
			
// 			return line		
// 		}

// 		const xAxis = {
// 						x0: 0, 
// 						x1: this.width, 
// 						y: 'y' },
// 					yAxis = { 
// 						y0: 0, 
// 						y1: this.height, 
// 						x: 'x' };
// 		console.log(xAxis, yAxis)
		
// 		const xAxisLine = createAxisLine( xAxis, yNumbers ),
// 					yAxisLine = createAxisLine( yAxis, xNumbers );

		

// 		this.layer.createLine( xAxisLine.start, xAxisLine.end, { strokeStyle: 'red' } );
// 		// this.layer.createLine( yAxisLine.start, yAxisLine.end, { strokeStyle: 'green' } );



// 	}





// }	






// Freyja.prototype.addGrid = function( xStart = 0, xEnd = 15, yStart = 0, yEnd = 15, xSteps = 5, ySteps = 3 ){
// 	// Set up plane boundaries:
// 	const margin = 0.05, // Set up plane margin.
// 				xMargin = margin * this.canvas.width,
// 				yMargin = margin * this.canvas.height;

// 	const plane = {}; // create a coordinate plane
// 	plane.topLeftCorner = { // Get the location of the top-left corner of the plane on layer.
// 			x: xMargin, 
// 			y: yMargin 
// 	};
// 	plane.bottomRightCorner = { // Get the location of the bottom-right corner of the plane on layer.
// 		x: ( 1 - margin ) * this.canvas.width, 
// 		y: ( 1 - margin ) * this.canvas.height 
// 	}
// 	plane.width = plane.bottomRightCorner.x - plane.topLeftCorner.x; // Get plane width.
// 	plane.height = plane.bottomRightCorner.y - plane.topLeftCorner.y; // Get plane height.

// 	console.log('xStart', xStart, 'xEnd', xEnd)
// 	console.log('yStart', yStart, 'yEnd', yEnd)
// 	if ( yStart === yEnd  || xStart === xEnd ){ // Do not execute function when the passed arguments are not valid.
// 		if( yStart === yEnd ){ console.error( 'yStart and yEnd cannot be equal.' ); } // Error message for y.
// 		else { console.error( 'xStart and xEnd cannot be equal.' ); } } // Error message for x.  
// 	else {

// 		function getAxisPosition( numberStart = 0, numberEnd = 10 ){
// 			let position;
// 			if( numberStart > numberEnd ) { // If numberStart is higher than numberEnd, do: 
// 				if ( numberStart > 0 && numberEnd < 0 ) { position = getLinearInterpolation( 0, numberEnd, numberStart, 0, 1 ); } // If numberStart is positive and numberEnd is negative.
// 				else { position = 1; } }
// 			else { // if numberStart is lower than number_end, do: 
// 				if ( numberStart < 0 && numberEnd > 0 ) { position = getLinearInterpolation( 0, numberStart, numberEnd, 0, 1 ); } // If numberStart is negative and numberEnd is positive.
// 				else { position = 0; } }

// 			return position
// 		}

// 		const coordinatePlane = pln = { };
// 					coordinatePlane.height = this.canvas.height;
// 					coordinatePlane.width = this.canvas.width;
// 		console.log(pln)

// 		const xAxis = {  // Set up objects for the axes
// 						x0: 0, 
// 						x1: pln.width, 
// 						y: 'y',
// 						color: 'red' },
// 					yAxis = { 
// 						y0: 0, 
// 						y1: pln.height, 
// 						x: 'x',
// 						color: 'green' };

	

// 		// ,
// 		// 	corners: {
// 		// 		topLeft: padding * , 
// 		// 		bottomLeft: , 
// 		// 		bottomRight: , 
// 		// 		topRight: 
// 		// 	}
// 		// 	xAxis: getAxisPosition( yStart, yEnd ),
// 		// 	xStart: 
// 		// 	yAxis: getAxisPosition( xStart, xEnd ),
// 		// 	xSteps: xSteps,
// 		// 	ySteps: ySteps
// 		// }; 





// 		// console.log( coordinatePlane)
// 		// // console.log( aap)
			
// 		// 	const xAxis = {  // Set up objects for the axes
// 		// 					x0: plane.topLeftCorner.x, 
// 		// 					x1: plane.bottomRightCorner.x, 
// 		// 					y: 'y',
// 		// 					color: 'red' },
// 		// 				yAxis = { 
// 		// 					y0: plane.topLeftCorner.y, 
// 		// 					y1: plane.bottomRightCorner.y, 
// 		// 					x: 'x',
// 		// 					color: 'green' };

// 			function createAxisLine( axis, numberStart = 0, numberEnd = 10, planeStart = 50, planeEnd = 500 ) {
				 
// 				let position = getAxisPosition( numberStart, numberEnd ); // Get normalized y position of x-Axis numberLine
// 						position = getLinearInterpolation( position, 0, 1, planeStart, planeEnd );

// 				axis[ axis.x || axis.y ] = position;
				
// 				const lineStart = { x: axis.x0 || axis.x, y: axis.y0 || axis.y },
// 							lineEnd = { x: axis.x1 || axis.x, y: axis.y1 || axis.y};
				
// 				console.log(lineStart, lineEnd)
// 				this.layer.createLine( lineStart, lineEnd, { strokeStyle: axis.color } );


// 			}



// 			createAxisLine.call( this, xAxis, yStart, yEnd, plane.bottomRightCorner.y, plane.topLeftCorner.y );
// 			// createAxisLine.call( this, yAxis, xStart, xEnd, plane.topLeftCorner.x, plane.bottomRightCorner.x );

// 			// // draw ticks every step:
// 			// const tickSize = 5;
// 			// // xAxis
// 			// for (let i = 0; i < xSteps; i++) {
// 			// 	const tick = {
// 			// 		x: getLinearInterpolation(i, 0, xSteps, xAxis.x0, xAxis.x1),
// 			// 		y: xAxis.y,
// 			// 		lineStart: function() { return { x: this.x, y: this.y + tickSize } },
// 			// 		lineEnd: function() { return { x: this.x, y: this.y - tickSize } }
// 			// 	}
// 			// 	this.layer.createLine( tick.lineStart(), tick.lineEnd() )
// 			// }

// 			// function createTicks( axis, totalTicks = 10) {
// 			// 	for (let i = 0; i < totalTicks; i++) {
// 			// 	const tick = {
// 			// 		x: getLinearInterpolation(i, 0, totalTicks-1, xAxis.x0, xAxis.x1),
// 			// 		y: xAxis.y,
// 			// 		lineStart: function() { return { x: this.x, y: this.y + tickSize } },
// 			// 		lineEnd: function() { return { x: this.x, y: this.y - tickSize } }
// 			// 	}
// 			// 	this.layer.createLine( tick.lineStart(), tick.lineEnd(), { strokeStyle: 'grey' } )
// 			// 	}
// 			// }
			

			 
// 		}



// // let t;

// 			// console.log(xAxis.start, xAxis.end)

// 			// if( yStart > yEnd ) { // If yStart is higher than yEnd, do: 
// 			// 	if ( yStart > 0 && yEnd < 0 ) { // If yStart is negative and yEnd is positive, do:
// 			// 		t = getLinearInterpolation( 0, yEnd, yStart, 0, 1 );
// 			// 		ping('red')
// 			// 	}
// 			// 	else {
// 			// 		t = 1;
// 			// 		pong('red');	
// 			// 	}
				
// 			// }
// 			// else { // if yStart is lower than yEnd, do: 
// 			// 	if ( yStart < 0 && yEnd > 0 ) { // If yStart is negative and yEnd is positive, do:
// 			// 		t = getLinearInterpolation( 0, yStart, yEnd, 0, 1 );
// 			// 		ping( 'green');
// 			// 	}
// 			// 	else {
// 			// 		t = 0;
// 			// 		pong( 'green');
// 			// 	}
// 			// }



// 	// const yAxis = { start: {}, end: {} };
// 	// yAxis.start.y = plane.topLeftCorner.y 
// 	// if ( xStart < 0 ) {
// 	// 	if ( xEnd <= 0 ) { yAxis.start.x = plane.bottomRightCorner.x - xMargin; }
// 	// 	else { yAxis.start.x = getLinearInterpolation( 0, xStart, xEnd, plane.topLeftCorner.x + xMargin, plane.bottomRightCorner.x - xMargin ); } } 
// 	// else { yAxis.start.x = plane.topLeftCorner.x + xMargin; }
// 	// yAxis.end.x = yAxis.start.x;
// 	// yAxis.end.y = plane.bottomRightCorner.y;


// 	// const yAxis = { start: {}, end: {} };
// 	// yAxis.start.y = plane.topLeftCorner.y 
// 	// if ( ( xStart <= 0 && xEnd <= 0 ) ) { 
// 	// 	if ( xStart < xEnd ) yAxis.start.x = plane.topLeftCorner.x + xMargin;
// 	// 	else { ping(); yAxis.start.x = plane.bottomRightCorner.x - xMargin; }
// 	// }
	
// 	// else if ( xStart >= 0 && xEnd >= 0 ) { 
// 	// 	ping();
// 	// 	if ( xStart < xEnd )	{
// 	// 		pong();
// 	// 		yAxis.start.x = plane.bottomRightCorner.x - xMargin; }
// 	// 	else yAxis.start.x = plane.topLeftCorner.x + xMargin;
// 	// }

// 	// else { ping(); yAxis.start.x = getLinearInterpolation( 0, xStart, xEnd, plane.topLeftCorner.x - xMargin, plane.bottomRightCorner.x + xMargin )};

// 	// yAxis.end.x = yAxis.start.x;
// 	// yAxis.end.y = plane.bottomRightCorner.y;


// 	/// De x axis werkt de y axis nog niet: werkt allebei niet met een positieve start en negatieve eind
// 	// const xAxis = { start: {}, end: {} };
// 	// xAxis.start.x = plane.topLeftCorner.x 
// 	// if ( ( yStart <= 0 && yEnd <= 0 ) ) { 
// 	// 	if ( yStart < yEnd ) xAxis.start.y = plane.topLeftCorner.x + yMargin;
// 	// 	else xAxis.start.y = plane.bottomRightCorner.y - yMargin;
// 	// }
// 	// else if ( yStart < 0 && yEnd > 0 ) {
// 	// 	ping();
// 	// 	xAxis.start.y = getLinearInterpolation( 0, yStart, yEnd, plane.topLeftCorner.y - yMargin, plane.bottomRightCorner.y + yMargin );}
// 	// else if ( yStart >= 0 && yEnd >= 0 ) { 
// 	// 	if ( yStart < yEnd )	xAxis.start.y = plane.bottomRightCorner.y - yMargin; 
// 	// 	else xAxis.start.y = plane.topLeftCorner.x + yMargin;
// 	// }

// 	// xAxis.end.x = plane.bottomRightCorner.x;
// 	// xAxis.end.y = xAxis.start.y;

	

	
	
// 	// console.log(plane)
// 	// this.layer.createLine( yAxis.start, yAxis.end, { strokeStyle: 'green', lineWidth: 2 } )// create a line for the y axis 
// 	// this.layer.createLine( xAxis.start, xAxis.end, { strokeStyle: 'red', lineWidth: 2 } )// create a line for the x axis 
// 	// this.layer.createLine( gridBottomRight, { x: gridTopLeft.x, y: gridBottomRight.y } )// create a line for the x axis 
// 	// this.layer.font = 'italic 18px Arial';
//  //    this.layer.textAlign = 'center';
//  //    this.layer. textBaseline = 'middle';
//  //    this.layer.fillStyle = 'red';  // a color name or by using rgb/rgba/hex values
//  //    this.layer.fillText('Hello World!', 150, 50); // text and position
// }
