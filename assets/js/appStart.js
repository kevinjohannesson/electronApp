// showing version number in the window:
document.querySelector('span[data-version_number]').innerHTML = `version ${
  require('electron').remote.app.getVersion()
}`;

// loading preferences.json:
const pref = new Preferences;
// referencing the actual preferences:
const preferences = ()=> { return pref.readAll() };

// Retrieving colorscheme from the preferences:
const colorscheme = preferences().current_colorscheme;
// Store colors for easier access:
const maincolor = colorscheme[0];
// clone array and remove main color
const restcolors = [].concat(colorscheme);
			restcolors.shift();




// set up worldspace:
const space = new Asgard,
			pt_a = space.insertPoint( vec4( 150, -250 ) ),
			pt_b = space.insertPoint( vec4( 400, -150 ) ),
			pt_c = space.insertPoint( vec4( -100, 300 ) );
// console.log( space );
// console.log( pt_a, pt_b, pt_c );


// set up renderer:
const startFreya = ()=>{
	// allocate element to serve as wrapper for the canvas elements
	const container = document.querySelector('#layer_container');
	// start renderer with conainer:
	const renderer = new Freyja( container );
	
	return renderer;
}, freyja = startFreya();

// fill first layer:
freyja.layer.fill( maincolor );
// freyja.addGrid();


// const plane = new coordinatePlane( freyja.layer );
const plane = new Plane();
console.log(plane)
freyja.layer.fillStyle = 'black';
const offsetX = ( freyja.canvas.width - plane.width ) / 2,
			offsetY = ( freyja.canvas.height - plane.height ) / 2,
			offset = vec2( offsetX, offsetY ),
			setOffset = ( vector ) => { return vecAdd( vector, offset ) }
// freyja.layer.setLineDash([10, 15]);
// freyja.layer.lineWidth = 2;
// freyja.layer.strokeRect( offsetX, offsetY, plane.width, plane.height );
// freyja.layer.setLineDash([]);

const xStart = -33, xEnd = 77,
			yStart = -30, yEnd = 10;

const axes = plane.createAxis( xStart, xEnd, yStart, yEnd ),
			lineExtend = 50,
			xAxisStart = vecAdd( vecAdd( axes.x.start, offset ), vec2( -lineExtend, 0 ) ),
			xAxisEnd = vecAdd( vecAdd( axes.x.end, offset ), vec2( lineExtend, 0 ) ),//,

			yAxisStart = vecAdd( vecAdd( axes.y.start, offset ), vec2( 0, -lineExtend ) ),
			yAxisEnd = vecAdd( vecAdd( axes.y.end, offset ), vec2( 0, lineExtend ) );

freyja.layer.globalCompositeOperation = 'multiply';
freyja.layer.createLine( xAxisStart, xAxisEnd, {strokeStyle: 'red', lineWidth: 8} );
freyja.layer.createLine( yAxisStart, yAxisEnd, {strokeStyle: 'lightgreen', lineWidth: 8} );

const xSteps = 10, ySteps = 1;

// need to add ticks on the axis;
let x = axes.y.start.x;
const xIncr = plane.width / ( diff( xStart, xEnd ) / xSteps );


let y = axes.x.start.y;
const yIncr = plane.height / ( diff( yStart, yEnd ) / ySteps ) ;


// console.log( lerpVals() );


	const xAxisPositiveValues = lincr( x, plane.width, xIncr ),
				xAxisNegativeValues = lincr( x, 0, xIncr );

				xAxisNegativeValues.reverse();
				xAxisNegativeValues.pop();

	const xAxisValues = [ ...xAxisNegativeValues, ...xAxisPositiveValues ];
			
	// xAxisValues.splice( xAxisNegativeValues.length, 1 );

	const yAxisPositiveValues = lincr( y, plane.height, yIncr ),
				yAxisNegativeValues = lincr( y, 0, yIncr );

				yAxisNegativeValues.reverse();

	const yAxisValues = [ ...yAxisNegativeValues, ...yAxisPositiveValues ];
			
	yAxisValues.splice( yAxisNegativeValues.length, 1 );

	const xAxisLineStartVectors = vec2( xAxisValues, 0 ),
				xAxisLineEndVectors = vec2( xAxisValues, plane.height ),
				yAxisLineStartVectors = vec2( 0, yAxisValues ),
				yAxisLineEndVectors = vec2( plane.width, yAxisValues );

	const axisLineStarts = [ ...xAxisLineStartVectors, ...yAxisLineStartVectors ],
				axisLineEnds = [ ...xAxisLineEndVectors, ...yAxisLineEndVectors];

	for (let i = axisLineStarts.length - 1; i >= 0; i--) {
			const lineStart = vecAdd( axisLineStarts[i], offset ),
						lineEnd = vecAdd( axisLineEnds[i], offset );
			freyja.layer.createLine( lineStart, lineEnd, {strokeStyle: 'darkgrey', lineWidth: 1} );	}	


freyja.layer.font = 'italic 9px Arial';
    freyja.layer.textAlign = 'center';
    freyja.layer. textBaseline = 'middle';
    freyja.layer.fillStyle = 'black';  // a color name or by using rgb/rgba/hex values
    freyja.layer.fillText('Hello World!', 150, 50); // text and position	



	const axisTickSize = 8;

	for (let i = 0; i < xAxisValues.length; i++) {
			const tickOriginVector = vec2( xAxisValues[i], axes.x.start.y );
			let lineStart = vecAdd( tickOriginVector, vec2( 0, axisTickSize/2 ) ) ,
					lineEnd = vecAdd( tickOriginVector, vec2( 0, -axisTickSize/2 ) );

			// console.log( lineStart, lineEnd );

			lineStart = setOffset( lineStart );
			lineEnd = setOffset( lineEnd );


			textCoordinate = setOffset(tickOriginVector);
			textCoordinate = vecAdd( textCoordinate, vec2( 10, 10 ) ) // move down-right a little
			
			let number = i; 
			if ( i < xAxisNegativeValues.length ) number = -xAxisNegativeValues.length + i;
			else number = i - xAxisNegativeValues.length;

			number *= xSteps;
			freyja.layer.fillText(number, textCoordinate.x, textCoordinate.y); // text and position	
			
			// console.log( lineStart, lineEnd );

		// }

			freyja.layer.createLine( lineStart, lineEnd, {strokeStyle: 'lightslategrey', lineWidth: 4} );	}	

function addTicks( axisValues, axis = 'x' ){
	// console.log(axisValues, axis);
	const is_xAxis = axis === 'x'; // Check which axis we're working with.
	// console.log(is_xAxis);
	const createTickLocationVector = ( locationValue ) => {
		const vector = is_xAxis ? vec2( locationValue, axes.x.start.y ) : vec2( axes.y.start.x, locationValue );
		// console.log(vector);
		return vector
	}
	const axisTickOriginVectors = axisValues.map( createTickLocationVector );
	axisTickOriginVectors.forEach( drawTicks );
}

addTicks( xAxisValues );
	
function drawTicks( tickOrigin_vector ) {
	// ping('green');
	// console.log(tickOrigin_vector)
	// console.log(axis);

	// const createTicks = ( tickOrigin_vector) => {
		// console.log(tickOrigin_vector)
		// const tickStartOffset_vector = xAxis ? vec2( 0, axisTickSize ) : vec2( axisTickSize, 0 ),
		// 			tickEndOffset_vector = xAxis ? vec2( 0, -axisTickSize ) : vec2( -axisTickSize, 0 );
		// console.log(tickStartOffset_vector, tickEndOffset_vector);
		// let tickStart_vector = vector.add( tickOrigin_vector, tickStartOffset_vector ),
		// 		tickEnd_vector = vector.add( tickOrigin_vector, tickEndOffset_vector );

		// let lineStartVector = 
	}



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