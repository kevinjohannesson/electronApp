class Axis {
  constructor( minValue = 0, maxValue = 10 ){
    this.min = minValue
    this.max = maxValue 
    this.length = diff( this.min, this.max )
  }
  
}



class CoordinatePlane {
  constructor() {
    this.width = 700;
    this.height = 500;

    this.grid = { 
      axes: { x: new Axis(-15, 10), y: new Axis(-30, -40) },
      lines: { x: 'array', y: 'array' }
    }

    const xAxis = this.grid.axes.x
    const yAxis = this.grid.axes.y
    

    xAxis.constant = this.getAxisConstantValue( "x", yAxis.max, yAxis.min );
    yAxis.constant = this.getAxisConstantValue( "y", xAxis.min, xAxis.max );

    xAxis.start = vec2( 0, xAxis.constant )
    xAxis.end = vec2(this.width, xAxis.constant )
    
    yAxis.start = vec2( yAxis.constant, 0 )
    yAxis.end = vec2(yAxis.constant, this.height )

    this.grid.lines.x = this.createGridLines();
    this.grid.lines.y = this.createGridLines("y");

    xAxis.ticks = this.addTicks();
    yAxis.ticks = this.addTicks('y');
  }

  createGridLines(axisLetter = "x", gridLineEvery = 1) {
    const is_xAxis = axisLetter === "x"
    const perpendicularAxisLetter = is_xAxis ? "y" : "x"
    const { length } = this.grid.axes[perpendicularAxisLetter]
    // const differenceMinMaxValue = diff( min, max )

    const totalSize = this[is_xAxis ? "height" : "width"]
    const gridSize = totalSize / length

    const spaceBetweenEachGridLine = gridSize * gridLineEvery

    const axisConstant = this.grid.axes[axisLetter].constant

    const axisPositiveValues = lincr(axisConstant,totalSize,spaceBetweenEachGridLine)
    const axisNegativeValues = lincr(axisConstant, 0, spaceBetweenEachGridLine)

    axisNegativeValues.reverse()
    axisNegativeValues.pop()

    const axisValues = [...axisNegativeValues, ...axisPositiveValues]

    const createVectorStart = (element) => { return is_xAxis ? vec2(0, element) : vec2(element, 0) }

    const createVectorEnd = (element) => { return is_xAxis ? vec2(this.width, element) : vec2(element, this.height) }
    

    const gridLineStart_vectors = axisValues.map( createVectorStart )
    const gridLineEnd_vectors = axisValues.map( createVectorEnd )
    
    const createGridLine = (val, index) => {
      const line = { start: val, end: gridLineEnd_vectors[index] };
      return line;
    }

    const gridLines = gridLineStart_vectors.map( createGridLine )

    return gridLines;
  }

  getAxisConstantValue(
    axis = "x", otherAxisMin = 0, otherAxisMax = 10 ) {
    
    function getNormalizedPosition() {
      // calculates a normalized position for an axis.
      let normalizedPosition; // declare an empty position value.
      if (otherAxisMin > otherAxisMax) {
        if (otherAxisMax > 0 && otherAxisMax < 0) {
          normalizedPosition = lerp( 0, otherAxisMax, otherAxisMin, 0, 1 ) } 
        else { normalizedPosition = 1 } } 
      else {
        if (otherAxisMin < 0 && otherAxisMax > 0) {
          normalizedPosition = lerp( 0, otherAxisMin, otherAxisMax, 0, 1  ) } 
        else { normalizedPosition = 0 } }
      
      return normalizedPosition;
    }

    const normalizedLocation = getNormalizedPosition(); // Get normalized y position of x-Axis numberLine

    const is_xAxis = axis === "x";

    const axisConstantValue = is_xAxis
      ? lerp(normalizedLocation, 0, 1, 0, this.height)
      : lerp(normalizedLocation, 0, 1, 0, this.width);

    return axisConstantValue;
  }

  addTicks( axis = 'x'){
  if ( axis === 'x' ) { return this.grid.lines.y.map( ( line )=>{
    return { x: line.start.x, y: this.grid.axes.x.constant } } ) }
  else { return this.grid.lines.x.map( ( line )=>{
    return { x: this.grid.axes.y.constant, y: line.start.y } } ) } 
  }
}

// createAxis(xStart = -5, xEnd = 10, yStart = 0, yEnd = 10) {
//   function getAxisPosition(numberStart = 0, numberEnd = 10) {
//     let position;
//     if (numberStart > numberEnd) {
//       // If numberStart is higher than numberEnd, do:
//       if (numberStart > 0 && numberEnd < 0) {
//         position = lerp(0, numberEnd, numberStart, 0, 1);
//       } // If numberStart is positive and numberEnd is negative.
//       else {
//         position = 1;
//       }
//     } else {
//       // if numberStart is lower than number_end, do:
//       if (numberStart < 0 && numberEnd > 0) {
//         position = lerp(0, numberStart, numberEnd, 0, 1);
//       } // If numberStart is negative and numberEnd is positive.
//       else {
//         position = 0;
//       }
//     }

//     return position;
//   }

//   function createAxisLine(axis, numberStart = 0, numberEnd = 10) {
//     let position = getAxisPosition(numberStart, numberEnd); // Get normalized y position of x-Axis numberLine
//     // console.log('position', position)

//     // console.log( axis.x0 || axis.y0 || 0, axis.x1 || axis.y1 || 0)
//     // console.log(axis)
//     // console.log( ( axis.x0 ) ? this.height : this.width )
//     position =
//       axis.x0 || axis.x0 === 0
//         ? lerp(position, 1, 0, 0, this.height)
//         : lerp(position, 0, 1, 0, this.width);
//     // console.log('position after lerp', position)
//     axis[axis.x || axis.y] = position;

//     const line = {
//       start: { x: axis.x0 || axis.x || 0, y: axis.y0 || axis.y || 0 },
//       end: { x: axis.x1 || axis.x || 0, y: axis.y1 || axis.y || 0 },
//     };

//     // console.log( line )

//     return line;
//   }

//   const xAxis = { x0: 0, x1: this.width, y: "y" },
//     yAxis = { y0: 0, y1: this.height, x: "x" };

//   // console.log(xAxis, yAxis)

//   const xAxisLine = createAxisLine.call(this, xAxis, yStart, yEnd),
//     yAxisLine = createAxisLine.call(this, yAxis, xStart, xEnd),
//     lines = { x: xAxisLine, y: yAxisLine };

//   return lines;
// }



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



  // addTicks( axis = 'x'){
  //   if ( axis === 'x' ) { return this.grid.y.gridLines.map( ( line )=>{
  //     return { x: line.start.x, y: this.grid.x.axisConstant } } ) }
  //   else { return this.grid.x.gridLines.map( ( line )=>{
  //     return { x: this.grid.y.axisConstant, y: line.start.y } } ) } }



  // addTicks( axis = 'x'){
  //   if(axis==='x') { return this.grid[ is_xAxis ? 'y' : 'x' ].gridLines.map((line)=>{
  //     return {x: this.grid.y.axisConstant, y: line.start.y}})}
  //   else { return { x: this.grid.y.axisConstant, y: line.start.y } }
  //   const arr = this.grid[ is_xAxis ? 'y' : 'x' ].gridLines.map((line)=>{
  //     if(is_xAxis){ return { x: line.start.x, y: this.grid.x.axisConstant }; }
  //     else { return { x: this.grid.y.axisConstant, y: line.start.y } }
  //   });

  //   return arr
  // }