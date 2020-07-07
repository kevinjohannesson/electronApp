var dataURL = odin.current_layer.canvas.toDataURL('image/png');

let base64Image = dataURL.split(';base64,').pop();

console.log(base64Image)


// fs.writeFile('image.png', base64Image, {encoding: 'base64'}, function(err) {
//     console.log('File created');
// });
var bitmap = new Buffer(base64Image, 'base64');

setTimeout(function(){
//   fs.writeFile('image.png', bitmap, {encoding: 'base64'}, function(err) {
//     console.log('File created');
// });

 fs.writeFileSync("example.jpg", bitmap);   
}, 1000)


















// renderCoordinatePlane2D(plane)
// console.log(freyja)
// console.log(freyja.offset)

// console.log(freyja.centeredBox)
// console.log(freyja.offset)
// freyja.setRenderOffset(plane);

// freyja.renderBoundingBox( plane )



// freyja.layer.createLine( freyja.pos(vec2(0,0)), freyja.pos( vec2(100,100) ))

// // console.log(freyja.renderOffset)

// function renderCoordinatePlane2D( CoordinatePlane2D ) {

// 	// calculate offset to center the plane in view:
// 	const offset_x 	= ( freyja.canvas.width - CoordinatePlane2D.width ) / 2,
// 				offset_y 	= ( freyja.canvas.height - CoordinatePlane2D.height ) / 2,
// 				offset 		= vec2( offset_x, offset_y ),
// 				center = ( vector ) => { return vecAdd( vector, offset ) }

// 	// draw bounding box for the plane:
// 	freyja.boundingBox( CoordinatePlane2D.width, CoordinatePlane2D.height, offset )

// 	renderAxisLines( CoordinatePlane2D )
// 	renderNumberTicks( CoordinatePlane2D )
// 	renderGridLines( CoordinatePlane2D )

// 	function renderGridLines( CoordinatePlane2D ){
// 		renderAxisGrid( CoordinatePlane2D.axes.x )
// 		renderAxisGrid( CoordinatePlane2D.axes.y )
// 	}

// 	function renderAxisGrid( axis ) {
// 		const config = {
// 			strokeStyle: 'rgba(50,50,50,0.5)',
// 			lineWidth: 1, }
// 		// draw grid lines:
// 		axis.gridLines.forEach( (line,index, arr) => {
// 			if(index !== 0 && index !== arr.length-1) { // do not draw the first and last gridline, stylistic purposes
// 			freyja.layer.createLine( center( line.start ), center( line.end) , config ) }
// 		})
// 	}

// 	function renderNumberTicks( CoordinatePlane2D ) {
// 		renderNumberTick( CoordinatePlane2D.axes.x )
// 		renderNumberTick( CoordinatePlane2D.axes.y )
// 	}

// 	function renderAxisLines( CoordinatePlane2D ) {
// 		renderAxisLine( CoordinatePlane2D.axes.x )
// 		renderAxisLine( CoordinatePlane2D.axes.y )
// 	}

// 	function renderNumberTick( axis ) {
// 		const tickColor = 'rgba(50,50,50,0.75)'
// 		let tickWidth = 5 // setup width and height for the tick
// 		let tickHeight = 10
// 		if(axis.id === 'y') {  // swap height and widht for y axis
// 			tickHeight = (tickWidth=>tickWidth)(tickWidth,tickWidth=tickHeight) }
		
// 		freyja.layer.fillStyle = tickColor;
	
// 		axis.numbers.forEach( number => {
// 			const tickPosition = center( number.position ) // Center the tick origin in the view
// 			freyja.layer.fillRect( 
// 				(tickPosition.x - tickWidth/2), (tickPosition.y - tickHeight/2), tickWidth, tickHeight ) // create a rectangle from the centered origin.
// 		})	
// 	}


// 	function renderAxisLine( axis ) {
// 		const is_xAxis = axis.id === 'x'
// 		// axis lines extend a bit outside of the bounding box for stylistic purposes...
// 		const extendLength = 25
// 		// create vectors to extend the line with:
// 		const extendStart = is_xAxis? vec2( -extendLength, 0 ) : vec2( 0, -extendLength )
// 		const extendEnd = is_xAxis? vec2( extendLength, 0 ) : vec2( 0, extendLength )

// 		const lineStart = vectorMath.add( axis.start, extendStart )
// 		const lineEnd = vectorMath.add( axis.end, extendEnd )

// 		// set up styling for canvasContext
// 		const config = {
// 			strokeStyle: is_xAxis? 'tomato' : 'lawngreen',
// 			lineWidth: 9, }
// 		// draw axis lines:
// 		freyja.layer.createLine( center( lineStart ), center( lineEnd) , config )

// 	}
// }




// const x_min = 10, x_max = 0, y_min = -5, y_max = 15

// console.log( 'x_min: ', x_min, 'x_max: ', x_max, 'y_min: ', y_min, 'y_max: ', y_max )

// const plane = new CoordinatePlane(x_min, x_max, y_min, y_max);
// console.log(plane);

// // const arr = plane.axis.x.numbers



// const sPlane = new sizedCoordinatePlane(plane)
// console.log(sPlane)
// freyja.layer.globalCompositeOperation = 'multiply';

// const offset_x 	= ( freyja.canvas.width - sPlane.width ) / 2,
// 			offset_y 	= ( freyja.canvas.height - sPlane.height ) / 2,
// 			offset 		= vec2( offset_x, offset_y ),
// 			center = ( vector ) => { return vecAdd( vector, offset ) }

// // set up styling for canvasContext
// const config = {
// 	strokeStyle: 'tomato',
// 	lineWidth: 9, }
// // draw axis lines:
// freyja.layer.createLine( center(sPlane.axes.x.start), center(sPlane.axes.x.end), config )

// // set up styling for canvasContext
// const config_y = {
// 	strokeStyle: 'lawngreen',
// 	lineWidth: 9, }
// // draw axis lines:
// freyja.layer.createLine( center(sPlane.axes.y.start), center(sPlane.axes.y.end), config_y )

// sPlane.gridLines.x.forEach( (element, index) => {
// 	// console.log(element)
// 	const config = {
// 		strokeStyle: 'rgba(50,50,50,0.5)',
// 		lineWidth: 1, }
// 	freyja.layer.createLine( center(element.start), center(element.end), config )
// })

// sPlane.gridLines.y.forEach( (element, index) => {
// 	// console.log(element)
// 	const config = {
// 		strokeStyle: 'rgba(50,50,50,0.5)',
// 		lineWidth: 1, }
// 	freyja.layer.createLine( center(element.start), center(element.end), config )
// })


// console.log(renderplane.createAxis())

// function createAxis( coordinatePlane, width = 700, height =  600 ) {
// 	const normal = coordinatePlane.axes.x.position
// 	const y = height - normal * height
// 	const start = vec2( 0, y )
// 	const end = vec2( width, y )

// 	console.log(start, end)
	
// }

// createAxis(plane)


// function renderCoordinatePlane2( plane ) {

// 	freyja.layer.globalCompositeOperation = 'multiply';

// 	const width = 800
// 	const height = 600

// 	const offset_x 	= ( freyja.canvas.width - width ) / 2,
// 				offset_y 	= ( freyja.canvas.height - height ) / 2,
// 				offset 		= vec2( offset_x, offset_y ),
// 				center = ( vector ) => { return vecAdd( vector, offset ) }

	

// 	function renderAxisLines( axis = 'x' ) {
// 		const is_xAxis = axis === 'x'
// 		const axisNormalPosition = plane.axes[axis].position
// 		// axis lines extend a bit outside of the bounding box for stylistic purposes...
// 		const extendLength = 25
// 		// create vectors to extend the line with:
// 		const extendStart = is_xAxis? vec2( -extendLength, 0 ) : vec2( 0, -extendLength )
// 		const extendEnd = is_xAxis? vec2( extendLength, 0 ) : vec2( 0, extendLength )

// 		// console.log(currentAxis.start, offset, extendStart)

// 		console.log(currentAxis)
// 		const axisPosition = is_xAxis? height - ( axisNormalPosition * height ) : axisNormalPosition * width
// 		console.log(axisPosition)
// 		const start = is_xAxis? vec2(0, axisPosition) : vec2(axisPosition, 0)
// 		console.log(start);
// 		const end = is_xAxis? vec2(width, axisPosition): vec2(axisPosition, height)
// 		const lineStart = vectorMath.add( start, extendStart )
// 		const lineEnd = vectorMath.add( end, extendEnd )

// 		console.log( lineStart, lineEnd)

// 	}

// 	renderBoundingBox( width, height, offset)

// 	// renderAxisLines( plane, offset )
// 	// renderAxisLines( plane, offset, 'y' )
// }

// renderCoordinatePlane(plane);


// function createCoordinatePlane(){

// const plane = new CoordinatePlane();
// console.log(plane);

// function renderCoordinatePlane( plane ) {
// 	const offset_x 	= ( freyja.canvas.width - plane.width ) / 2,
// 				offset_y 	= ( freyja.canvas.height - plane.height ) / 2,
// 				offset 		= vec2( offset_x, offset_y ),
// 				setOffset = ( vector ) => { return vecAdd( vector, offset ) }
	
// 	freyja.layer.globalCompositeOperation = 'multiply';
	
	
// 	// renderGridBorder( plane, offset ); 

// 	renderAxisLines( plane, offset )
// 	renderAxisLines( plane, offset, 'y')

// 	renderGridLines(plane, offset)
// 	renderGridLines(plane, offset, 'y')

// 	renderTicks(plane, offset)
// 	renderTicks(plane, offset, 'y')

// 	renderNumbers(plane, offset)
// 	renderNumbers(plane, offset, 'y')
// }


// function renderGridBorder( plane, offset ){
// 	// Create a rectangular bounding box around the coordinate plane using a dashed line.
	
// 	// Declare variables for styling of the stroke:
// 	const lineWidth = 2;
// 	const dashLength = 8;
// 	const dashSpace = 20;
// 	const strokeColor = 'rgba(50,50,50,0.5)';

// 	// Style the canvas stroke:
// 	freyja.layer.strokeStyle = strokeColor;
// 	freyja.layer.lineWidth = lineWidth;
// 	freyja.layer.setLineDash([dashLength, dashSpace]);

// 	// Draw the rectangle:
// 	freyja.layer.strokeRect( offset.x, offset.y, plane.width, plane.height );

// 	// Reset the canvas linedash():
// 	freyja.layer.setLineDash([]); 
// }

// renderCoordinatePlane(plane);

// function renderAxisLines( plane, offset, axis = 'x' ) {
// 	const is_xAxis = axis === 'x';
// 	const currentAxis = plane.grid.axes[axis]

// 	// axis lines extend a bit outside of the bounding box for stylistic purposes...
// 	const extendLength = 25
// 	const extendStart = is_xAxis? vec2( -extendLength, 0 ) : vec2( 0, -extendLength )
// 	const extendEnd = is_xAxis? vec2( extendLength, 0 ) : vec2( 0, extendLength )

// 	// console.log(currentAxis.start, offset, extendStart)
// 	const lineStart = vectorMath.add( currentAxis.start, offset, extendStart )
// 	const lineEnd = vectorMath.add( currentAxis.end, offset, extendEnd )

// 	// console.log( lineStart, lineEnd)

// 	// set up styling for canvasContext
// 	const config = {
// 		strokeStyle: is_xAxis? 'tomato' : 'lawngreen',
// 		lineWidth: 9, }
// 	// draw axis lines:
// 	freyja.layer.createLine( lineStart, lineEnd, config )
// }

// function renderGridLines(plane, offset, axis = 'x'){
// 	const { lines } = plane.grid

// 	const drawGridLine = (vector_pair) => {
// 		const lineStart_vector = vectorMath.add(vector_pair.start, offset )
// 		const lineEnd_vector = vectorMath.add(vector_pair.end, offset )

// 		const config = { 
// 			strokeStyle: 'rgba(50,50,50,0.75)',
// 			lineWidth: 1, }

// 		freyja.layer.createLine( lineStart_vector, lineEnd_vector, config )
// 	}

// 	lines[axis].forEach(drawGridLine)
// }

// function renderTicks(plane, offset, axis = 'x') {
// 	const { ticks } = plane.grid.axes[axis]
	
// 	const drawTicks = origin_vector => {
		
// 		const tickOrigin_vector = vectorMath.add( origin_vector, offset );
		
// 		let tickWidth =  4 
// 		let tickHeight = 12
// 		if(axis === 'y') tickHeight = (tickWidth=>tickWidth)(tickWidth,tickWidth=tickHeight);

// 		const tickTopLeft_vector = {
// 			x: tickOrigin_vector.x - tickWidth / 2,
// 			y: tickOrigin_vector.y - tickHeight / 2 }
		
// 		freyja.layer.fillStyle = 'rgba(50,50,50,0.75)'
		
// 		freyja.layer.fillRect( tickTopLeft_vector.x, tickTopLeft_vector.y, tickWidth, tickHeight)
// 	}

// 	ticks.forEach(drawTicks)
// }


// function renderNumbers(plane, offset, axis = 'x'){
// 	const { ticks } = plane.grid.axes[axis]

// 	const lastIndex = plane.grid.axes[ axis ].numbers.length-1
// 	const drawNumbers = (origin_vector, index) => {
// 		// console.log(origin_vector)

// 		const value = plane.grid.axes[ axis ].numbers[axis === 'x' ? index : lastIndex-index ]

// 		const textOffset_vector = axis === 'x'? vec2( 7, 10) : vec2(-15, -5);
// 		// console.log(textOffset_vector)
// 		const textOrigin_vector = 
// 			vectorMath.add( 
// 				vectorMath.add(origin_vector, offset), 
// 				textOffset_vector
// 			)


		
// 		freyja.layer.font = 'italic 10px Arial';
//     freyja.layer.textAlign = 'center';
//     freyja.layer. textBaseline = 'middle';
//     freyja.layer.fillStyle = 'black';  // a color name or by using rgb/rgba/hex values
//     freyja.layer.fillText(value, textOrigin_vector.x, textOrigin_vector.y); // text and position	

// 	}
// 	ticks.forEach(drawNumbers)
// }

// }
// const plane = new coordinatePlane( freyja.layer );
// const plane = new Plane();
// console.log(plane)
// freyja.layer.fillStyle = 'black';
// const offsetX = ( freyja.canvas.width - plane.width ) / 2,
// 			offsetY = ( freyja.canvas.height - plane.height ) / 2,
// 			offset = vec2( offsetX, offsetY ),
// 			setOffset = ( vector ) => { return vecAdd( vector, offset ) }
// // freyja.layer.setLineDash([10, 15]);
// // freyja.layer.lineWidth = 2;
// // freyja.layer.strokeRect( offsetX, offsetY, plane.width, plane.height );
// // freyja.layer.setLineDash([]);

// const xStart = -33, xEnd = 77,
// 			yStart = -30, yEnd = 10;

// const axes = plane.createAxis( xStart, xEnd, yStart, yEnd ),
// 			lineExtend = 50,
// 			xAxisStart = vecAdd( vecAdd( axes.x.start, offset ), vec2( -lineExtend, 0 ) ),
// 			xAxisEnd = vecAdd( vecAdd( axes.x.end, offset ), vec2( lineExtend, 0 ) ),//,

// 			yAxisStart = vecAdd( vecAdd( axes.y.start, offset ), vec2( 0, -lineExtend ) ),
// 			yAxisEnd = vecAdd( vecAdd( axes.y.end, offset ), vec2( 0, lineExtend ) );

// freyja.layer.globalCompositeOperation = 'multiply';
// freyja.layer.createLine( xAxisStart, xAxisEnd, {strokeStyle: 'red', lineWidth: 8} );
// freyja.layer.createLine( yAxisStart, yAxisEnd, {strokeStyle: 'lightgreen', lineWidth: 8} );

// const xSteps = 10, ySteps = 1;

// // need to add ticks on the axis;
// let x = axes.y.start.x;
// const xIncr = plane.width / ( diff( xStart, xEnd ) / xSteps );


// let y = axes.x.start.y;
// const yIncr = plane.height / ( diff( yStart, yEnd ) / ySteps ) ;


// // console.log( lerpVals() );


// 	const xAxisPositiveValues = lincr( x, plane.width, xIncr ),
// 				xAxisNegativeValues = lincr( x, 0, xIncr );

// 				xAxisNegativeValues.reverse();
// 				xAxisNegativeValues.pop();

// 	const xAxisValues = [ ...xAxisNegativeValues, ...xAxisPositiveValues ];
			
// 	// xAxisValues.splice( xAxisNegativeValues.length, 1 );

// 	const yAxisPositiveValues = lincr( y, plane.height, yIncr ),
// 				yAxisNegativeValues = lincr( y, 0, yIncr );

// 				yAxisNegativeValues.reverse();

// 	const yAxisValues = [ ...yAxisNegativeValues, ...yAxisPositiveValues ];
			
// 	yAxisValues.splice( yAxisNegativeValues.length, 1 );

// 	const xAxisLineStartVectors = vec2( xAxisValues, 0 ),
// 				xAxisLineEndVectors = vec2( xAxisValues, plane.height ),
// 				yAxisLineStartVectors = vec2( 0, yAxisValues ),
// 				yAxisLineEndVectors = vec2( plane.width, yAxisValues );

// 	const axisLineStarts = [ ...xAxisLineStartVectors, ...yAxisLineStartVectors ],
// 				axisLineEnds = [ ...xAxisLineEndVectors, ...yAxisLineEndVectors];

// 	for (let i = axisLineStarts.length - 1; i >= 0; i--) {
// 			const lineStart = vecAdd( axisLineStarts[i], offset ),
// 						lineEnd = vecAdd( axisLineEnds[i], offset );
// 			freyja.layer.createLine( lineStart, lineEnd, {strokeStyle: 'darkgrey', lineWidth: 1} );	}	


// freyja.layer.font = 'italic 9px Arial';
//     freyja.layer.textAlign = 'center';
//     freyja.layer. textBaseline = 'middle';
//     freyja.layer.fillStyle = 'black';  // a color name or by using rgb/rgba/hex values
//     freyja.layer.fillText('Hello World!', 150, 50); // text and position	



// 	const axisTickSize = 8;

// 	for (let i = 0; i < xAxisValues.length; i++) {
// 			const tickOriginVector = vec2( xAxisValues[i], axes.x.start.y );
// 			let lineStart = vecAdd( tickOriginVector, vec2( 0, axisTickSize/2 ) ) ,
// 					lineEnd = vecAdd( tickOriginVector, vec2( 0, -axisTickSize/2 ) );

// 			// console.log( lineStart, lineEnd );

// 			lineStart = setOffset( lineStart );
// 			lineEnd = setOffset( lineEnd );


// 			textCoordinate = setOffset(tickOriginVector);
// 			textCoordinate = vecAdd( textCoordinate, vec2( 10, 10 ) ) // move down-right a little
			
// 			let number = i; 
// 			if ( i < xAxisNegativeValues.length ) number = -xAxisNegativeValues.length + i;
// 			else number = i - xAxisNegativeValues.length;

// 			number *= xSteps;
// 			freyja.layer.fillText(number, textCoordinate.x, textCoordinate.y); // text and position	
			
// 			// console.log( lineStart, lineEnd );

// 		// }

// 			freyja.layer.createLine( lineStart, lineEnd, {strokeStyle: 'lightslategrey', lineWidth: 4} );	}	

// function addTicks( axisValues, axis = 'x' ){
// 	// console.log(axisValues, axis);
// 	const is_xAxis = axis === 'x'; // Check which axis we're working with.
// 	// console.log(is_xAxis);
// 	const createTickLocationVector = ( locationValue ) => {
// 		const vector = is_xAxis ? vec2( locationValue, axes.x.start.y ) : vec2( axes.y.start.x, locationValue );
// 		// console.log(vector);
// 		return vector
// 	}
// 	const axisTickOriginVectors = axisValues.map( createTickLocationVector );
// 	axisTickOriginVectors.forEach( drawTicks );
// }

// addTicks( xAxisValues );
	
// function drawTicks( tickOrigin_vector ) {
// 	// ping('green');
// 	// console.log(tickOrigin_vector)
// 	// console.log(axis);

// 	// const createTicks = ( tickOrigin_vector) => {
// 		// console.log(tickOrigin_vector)
// 		// const tickStartOffset_vector = xAxis ? vec2( 0, axisTickSize ) : vec2( axisTickSize, 0 ),
// 		// 			tickEndOffset_vector = xAxis ? vec2( 0, -axisTickSize ) : vec2( -axisTickSize, 0 );
// 		// console.log(tickStartOffset_vector, tickEndOffset_vector);
// 		// let tickStart_vector = vector.add( tickOrigin_vector, tickStartOffset_vector ),
// 		// 		tickEnd_vector = vector.add( tickOrigin_vector, tickEndOffset_vector );

// 		// let lineStartVector = 
// 	}



				// axisValues.forEach( currentVector, function() {
				// 	createTicks( currentVector );
				// })

			// 	for (let i = 0; i < axisValues.length; i++) {

			// 	const tickOriginVector = vec2( axisValues[i], axes.x.start.y );
			// 	let lineStart = vecAdd( tickOriginVector, vec2( 0, axisTickSize/2 ) ) ,
			// 			lineEnd = vecAdd( tickOriginVector, vec2( 0, -axisTickSize/2 ) );

			// 	// console.log( lineStart, lineEnd );

			// 	lineStart = setOffset( lineStart );
			// 	lineEnd = setOffset( lineEnd );


			// 	textCoordinate = setOffset(tickOriginVector);
			// 	textCoordinate = vecAdd( textCoordinate, vec2( 10, 10 ) ) // move down-right a little
				
			// 	let number = i; 
			// 	if ( i < xAxisNegativeValues.length ) number = -xAxisNegativeValues.length + i;
			// 	else number = i - xAxisNegativeValues.length;

			// 	number *= xSteps;
			// 	freyja.layer.fillText(number, textCoordinate.x, textCoordinate.y); // text and position	

			// freyja.layer.createLine( lineStart, lineEnd, {strokeStyle: 'lightslategrey', lineWidth: 4} );	}	
			// }

			






// render geometry:
// renderer.renderPoint( pt_a );
// renderer.renderPoint( pt_b );
// renderer.renderPoint( pt_c );
// renderer.renderPoints( space.geometry.points );

// // Simpler way to write xy vectors:
// const xy = xy_vector = (x, y)=> { return asgard.get_xy_vector(x, y) };
// // Storing current frame for animation purposes:
// const f = ()=>{ return freya.current_frame};


// // Set up basic canvas layer:

// // draw a grid on the first layer:
// odin.drawGrid(50);
// // add new layer to show geometry:
// odin.createLayer('geometry_layer');
  create_2(type){

      function convertToVector(input){
        // function converts [0,0] array in {x: 0, y: 0} 
        // does nothing if argument already correct:
        function convertVector(vector){
          vector = { x: vector[0], y: vector[1] };

          return vector
        }
        if(input.constructor === Array){
          // argument is either a [0,0] type vector or a list of vectors
          if(typeof(input[0]) === 'number'){
            // argument is a [0,0] type vector 

            return convertVector(input);
          } else {
            // argument is an array of vectors:
            let xy_vector_collection = [];
            for (let v = 0; v < input.length; v++) {
              xy_vector_collection.push( convertToVector(input[v]) );
            }

            return xy_vector_collection
          }
        } else if(typeof(input) === 'object'){
            // argument is a {x: 0, y: 0} type vector: 
            if((input.x || input.x === 0)&& (input.y || input.y === 0)){
              // vector is already valid

              return input;  
            }
          }
      }


      function createRectangle(xy_vector) {
        xy_vector = convertToVector(xy_vector);
        return (second_arg) => {
          if(typeof(second_arg) === 'number'){
            let rectangle_rib_length = second_arg;
            // second argument is NOT a coordinate, so it is assumed to be a rib length
            return (config_arg) => {
              // create rectangle from a centerpoint:
              let rectangle = new Shapes
              return third_arg + xy_vector.x
            }
          }
        }
      }
      function created_object(first_arg) {
        return (from_origin) => {
          return (third_argument) => {
            return first_arg + from_origin + third_argument
          }
        }
      }
      console.log( createRectangle([0,0])(50)('third') )
      return created_object('aapje')('gayboi')('third')
    } 
    create(){

      function convertToVector(input){
        // function converts [0,0] array in {x: 0, y: 0} 
        // does nothing if argument already correct:
        function convertVector(vector){
          vector = { x: vector[0], y: vector[1] };

          return vector
        }
        if(input.constructor === Array){
          // argument is either a [0,0] type vector or a list of vectors
          if(typeof(input[0]) === 'number'){
            // argument is a [0,0] type vector 

            return convertVector(input);
          } else {
            // argument is an array of vectors:
            let xy_vector_collection = [];
            for (let v = 0; v < input.length; v++) {
              xy_vector_collection.push( convertToVector(input[v]) );
            }

            return xy_vector_collection
          }
        } else if(typeof(input) === 'object'){
            // argument is a {x: 0, y: 0} type vector: 
            if((input.x || input.x === 0)&& (input.y || input.y === 0)){
              // vector is already valid

              return input;  
            }
          }
      }

      switch(arguments[0]){
        case 'point': {
          let xy_vector = arguments[1];
          xy_vector = convertToVector(arguments[1]);

          return this.insert.geometry.point.call(this, xy_vector);
          break;
        }
        case 'edge': {
          let point_object_a = arguments[1], 
              point_object_b = arguments[2];
          return this.insert.geometry.edge.call(this, point_object_a, point_object_b)
          break;
        }
        case 'polyline':{
          let poly_line_start_xy_vector = convertToVector(arguments[1]),
              poly_line_end_xy_vector = convertToVector(arguments[2]),
              config = arguments[3];
          return this.insert.object.polyline.call(this, poly_line_start_xy_vector, poly_line_end_xy_vector, config);
          break;
        }
        case 'polygon':{
        let polygon_origin_xy_vector = convertToVector(arguments[1]),
            polygon_radius = arguments[2],
            polygon_segments = arguments[3],
            config = arguments[4];
            console.log(polygon_origin_xy_vector, polygon_radius, polygon_segments);
        return this.insert.object.polygon.call(this, polygon_origin_xy_vector, polygon_radius, polygon_segments, config);
        break;
        }
        case 'rectangle':{

          function multiply(a) {
    return (b) => {
        return (c) => {
            return a + b + c
        }
    }
}
        const rectangle = new Shape_Rectangle();
        // rectangle.create('from_center')('aapje')('duif');
        console.log( multiply('from_center')('aapje')('duif')  )
        return rectangle;
        break;
        }
      }
    }
    insert = {
      geometry: {
        point: function createPoint(xy_vector){
          if(xy_vector.constructor === Array){
            // for multiple vectors at once, argument is an array of vectors
            let point_collection = [];
            for (let v = 0; v < xy_vector.length; v++) {
              point_collection.push( createPoint.call(this, xy_vector[v]) );
            }

            return point_collection;
          } else {
              // for single vector argument
              if(xy_vector === undefined) xy_vector = {x: 0, y: 0};
              const point = new Point(xy_vector);
              this.geometry.points.push(point);
              // point.echo();
              
              return point
            }
        },

        edge: function create_edge(point_object_a, point_object_b){ 
          const edge = new Edge(point_object_a, point_object_b);
          this.geometry.edges.push(edge);
          // edge.echo();

          return edge
        }
      },


      object: {
        polyline: function(line_start_xy_vector, line_end_xy_vector, config){
          // create a line from one vector to the other, optionally divided into segments
          config = { line_segments: 1, create_edges: true };
          // check if there is a configuration:
          if(arguments[2]){
            let config_object = arguments[2];
            // update config if config is passed
            for( const property in config_object){
              config[property] = config_object[property];
            }
          }
          let point_collection = [];
          // create points:
          for (let s = 0; s <= config.line_segments; s++) {
            let line_segment_xy_vector = {
              // use linear interpolation to find point position
              x : map(s, 0, config.line_segments, line_start_xy_vector.x, line_end_xy_vector.x),
              y : map(s, 0, config.line_segments, line_start_xy_vector.y, line_end_xy_vector.y)
            }
            // create point at linear interpolated location:
            let line_segment_point = this.create('point', line_segment_xy_vector);
            // store points in object:
             point_collection.push(line_segment_point)
          }
          // create edges:
          if(config.create_edges){
            for (let e = 0; e < point_collection.length-1; e++){
              let point_object_a = point_collection[e];
              let point_object_b = point_collection[e+1];
              let edge = this.create('edge', point_object_a, point_object_b)
            }
          }

          return point_collection
        },
        polygon: function(polygon_origin_xy_vector, polygon_radius, polygon_segments, config){
          // set default config
          config = { create_edges: true };

          let point_collection = [];
          if(arguments[3]){
            let config_object = arguments[3];
            // update config if config is passed
            for( const property in config_object){
              config[property] = config_object[property];
            }
          }
          // create points:
          for(let s = 0; s < polygon_segments; s++){
            // linear interpolate the current radians per segment
            let current_radian = map(s, 0, polygon_segments, 0, Math.PI*2); 
            let point_xy_vector = {
              x: polygon_origin_xy_vector.x + Math.cos(current_radian)*polygon_radius, 
              y: polygon_origin_xy_vector.y + Math.sin(current_radian)*polygon_radius
            }
            let point = this.create('point', point_xy_vector)
            point_collection.push(point);
          }
          
          if(config.create_edges){
            // create edges:
            for(let e = 0; e < point_collection.length; e++){
              let edge = (e!=0) ? this.create('edge', point_collection[e-1], point_collection[e]) : false;
            }
            // create final edge to close shape:
            let edge = this.create('edge', point_collection[point_collection.length-1], point_collection[0]);
          }
          return point_collection
        },
        test: f => {

          return n => (f * n);
          // const aux = (n, xs) =>
          //   n === 0 ? f (...xs) : x => aux (n - 1, [...xs, x])
          // return aux (f.length, [])
        },
        rectangle: function(type){
          

          return (rectangle_origin_xy_vector) => {
            return (rectangle_rib_length) => {
              return ()=>{
                return 8
              }
            }
          }

          // // store the default config:
          // config = { create_edges: true};
          // if(arguments[2]){
          //   let config_object = arguments[2];
          //   // update config if config is passed
          //   for( const property in config_object){
          //     config[property] = config_object[property];
          //   }
          // }

          // if(typeof(arguments[2]) === 'number'){
          //   // create square from it's centerpoint
          //   // creating vectors for the corners
          //   let rectangle_top_left_xy_vector = {
          //     x: rectangle_origin.x - (rectangle_rib_length/2),
          //     y: rectangle_origin.y + (rectangle_rib_length/2)
          //   },
          //   rectangle_bottom_left_xy_vector = {
          //     x: rectangle_origin.x - (rectangle_rib_length/2),
          //     y: rectangle_origin.y - (rectangle_rib_length/2)
          //   },
          //   rectangle_bottom_right_xy_vector = {
          //     x: rectangle_origin.x + (rectangle_rib_length/2),
          //     y: rectangle_origin.y - (rectangle_rib_length/2)
          //   },
          //   rectangle_top_right_xy_vector = {
          //     x: rectangle_origin.x + (rectangle_rib_length/2),
          //     y: rectangle_origin.y + (rectangle_rib_length/2)
          //   };

          //   // group vectors for easier workflow and readability
          //   let xy_vector_collection = [
          //     rectangle_top_left_xy_vector,
          //     rectangle_bottom_left_xy_vector,
          //     rectangle_bottom_right_xy_vector,
          //     rectangle_top_right_xy_vector
          //   ];

          //   // this.create('point')
          // }
          // // creating a square shape from it's centerpoint
        
        
        
        }
      }
    }

    evaluate = {
      pointDistance: function(point_object_start, point_object_end){
        let distance = {};
        // calculation is to see if the distance is going in the negative or positive direction for both x and y
        distance.x = ( (point_object_end.x < point_object_start.x) ? -1 : 1 ) * Math.sqrt( Math.pow((point_object_start.x - point_object_end.x), 2) );
        distance.y = ( (point_object_end.y < point_object_start.y) ? -1 : 1 ) * Math.sqrt( Math.pow((point_object_start.y - point_object_end.y), 2) );
        if(distance.x == -0) distance.x = 0;
        if(distance.y == -0) distance.y = 0;
        distance.xy = Math.sqrt( Math.pow((point_object_start.x - point_object_end.x), 2) + Math.pow((point_object_start.y - point_object_end.y), 2) );
        
        return distance;
      }
    }

    createShape()
      {
        console.log(arguments)
        // get type of object to create:
        let object = arguments[0];
        // call functions to create object:
        switch(object){
          case 'polygon':
            console.log('polygon');

            break;
        }
        
      }
    createObject(object_type, 
      // line:
      line_start_xy_vector, 
      line_end_xy_vector,
      // polygon: 
      polygon_origin,
      polygon_radius,
      polygon_segments,
      // rectangle
      rectangle_top_left_xy_vector,
      rectangle_bottom_right_xy_vector,
      rectangle_origin,
      rectangle_rib_length,

      // general:
      config){
      console.log(arguments)
      let point_collection = [];
      switch(object_type){
        case 'polyline':
        // create a line from one vector to the other, optionally divided into segments
        line_start_xy_vector = arguments[1];
        line_end_xy_vector = arguments[2];
        let line_segments = 1,
            edges = true;
      
        
        // check if there is a configuration:
        if(arguments[3]){
          config = arguments[3];
          // divide polyline into optional sections:
          if(config.segments){
            line_segments = parseInt(config.segments);
          }
          // optionally turn off default edges
          if(config.edges){
            line_edges = config.edges
          }
        }
        // create points:
        for (let s = 0; s <= line_segments; s++) {
          let line_segment_xy_vector = {
            // use linear interpolation to find point position
            x : map(s, 0, line_segments, line_start_xy_vector.x, line_end_xy_vector.x),
            y : map(s, 0, line_segments, line_start_xy_vector.y, line_end_xy_vector.y)
          }
          // create point at linear interpolated location:
          let line_segment_point = this.createPoint(line_segment_xy_vector);
          // store points in object:
           point_collection.push(line_segment_point)
        }
        // create edges:
        if(edges){
          for (let e = 0; e < point_collection.length-1; e++){
            let point_object_a = point_collection[e];
            let point_object_b = point_collection[e+1];
            let edge = this.createEdge(point_object_a, point_object_b)
          }
        }

        break;
      case 'polygon':

        polygon_origin = arguments[1];
        polygon_radius = arguments[2];
        polygon_segments = arguments[3];
        // create points:
        for(let s = 0; s < polygon_segments; s++){
          // linear interpolate the current radians per segment
          let current_radian = map(s, 0, polygon_segments, 0, Math.PI*2); 
          let point = this.createPoint({x: polygon_origin.x + Math.cos(current_radian)*polygon_radius, y: polygon_origin.y + Math.sin(current_radian)*polygon_radius}, 0);
          point_collection.push(point);
        }
        // create edges:
        for(let e = 0; e < point_collection.length; e++){
          let edge = (e!=0) ? this.createEdge(point_collection[e-1], point_collection[e]) : false;
        }
        // create final edge to close shape:
        let edge = this.createEdge(point_collection[point_collection.length-1], point_collection[0]);
        break;
      case 'rectangle':
        // creating a square shape from it's centerpoint
        // store the default config:
        config = { create_edges: true};
        // allocating arguments to the correct variables
        rectangle_origin = arguments[1];
        rectangle_rib_length = arguments[2];
        // creating vectors for the corners
        rectangle_top_left_xy_vector = {
          x: rectangle_origin.x - (rectangle_rib_length/2),
          y: rectangle_origin.y + (rectangle_rib_length/2)
        };
        let rectangle_bottom_left_xy_vector = {
          x: rectangle_origin.x - (rectangle_rib_length/2),
          y: rectangle_origin.y - (rectangle_rib_length/2)
        };
        rectangle_bottom_right_xy_vector = {
          x: rectangle_origin.x + (rectangle_rib_length/2),
          y: rectangle_origin.y - (rectangle_rib_length/2)
        };
        let rectangle_top_right_xy_vector = {
          x: rectangle_origin.x + (rectangle_rib_length/2),
          y: rectangle_origin.y + (rectangle_rib_length/2)
        };

        // group vectors for easier workflow and readability
        let xy_vector_collection = [
          rectangle_top_left_xy_vector,
          rectangle_bottom_left_xy_vector,
          rectangle_bottom_right_xy_vector,
          rectangle_top_right_xy_vector
        ];

        // create set of points with the vectors:
        point_collection = this.createPoint(xy_vector_collection);

        // add to this geometry property
        this.geometry.points.concat( point_collection );

        // create edges yes or no:
        // check for config
        if(arguments[3]){
          config = arguments[3];
          if(!config.create_edges){

          }
        }
        
        break;
      }

      return point_collection
    }
  }
}


































 create_2(type){

      function convertToVector(input){
        // function converts [0,0] array in {x: 0, y: 0} 
        // does nothing if argument already correct:
        function convertVector(vector){
          vector = { x: vector[0], y: vector[1] };

          return vector
        }
        if(input.constructor === Array){
          // argument is either a [0,0] type vector or a list of vectors
          if(typeof(input[0]) === 'number'){
            // argument is a [0,0] type vector 

            return convertVector(input);
          } else {
            // argument is an array of vectors:
            let xy_vector_collection = [];
            for (let v = 0; v < input.length; v++) {
              xy_vector_collection.push( convertToVector(input[v]) );
            }

            return xy_vector_collection
          }
        } else if(typeof(input) === 'object'){
            // argument is a {x: 0, y: 0} type vector: 
            if((input.x || input.x === 0)&& (input.y || input.y === 0)){
              // vector is already valid

              return input;  
            }
          }
      }


      function createRectangle(xy_vector) {
        xy_vector = convertToVector(xy_vector);
        return (second_arg) => {
          if(typeof(second_arg) === 'number'){
            let rectangle_rib_length = second_arg;
            // second argument is NOT a coordinate, so it is assumed to be a rib length
            return (config_arg) => {
              // create rectangle from a centerpoint:
              let rectangle = new Shapes
              return third_arg + xy_vector.x
            }
          }
        }
      }
      function created_object(first_arg) {
        return (from_origin) => {
          return (third_argument) => {
            return first_arg + from_origin + third_argument
          }
        }
      }
      console.log( createRectangle([0,0])(50)('third') )
      return created_object('aapje')('gayboi')('third')
    } 