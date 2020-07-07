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
freyja.layer.fillLayer( maincolor );

// console.log(freyja.canvas, freyja.layer)

freyja.addCanvas( 'CoordinatePlane_2D' )

// console.log(freyja.canvas, freyja.layer)


const xMin = document.querySelector('[data-x_min]')
const xMax = document.querySelector('[data-x_max]')
const yMin = document.querySelector('[data-y_min]')
const yMax = document.querySelector('[data-y_max]')
const vals = [ xMin, xMax, yMin, yMax]
const coordinatePlane = new CoordinatePlane2D( parseInt(xMin.value), parseInt(xMax.value), parseInt(yMin.value), parseInt(yMax.value) )
console.log( coordinatePlane )
freyja.initializeCoordinatePlane2D( coordinatePlane )

const func = x => 5 * Math.pow( x, 3 ) + 2 * Math.pow( x, 2 )// + 2 * x
const subdivisions = 20

freyja.addCanvas( 'function' )
// freyja.renderFunction2D( func, subdivisions)

vals.forEach( element => {
	element.addEventListener('change', function(){
		freyja.canvas = freyja.layers[1]
		freyja.layer.clearLayer()
		freyja.CoordinatePlane2D.rebuild( parseInt(xMin.value), parseInt(xMax.value), parseInt(yMin.value), parseInt(yMax.value) )
		console.log(freyja.CoordinatePlane2D)
		freyja.renderCoordinatePlane2D()
		freyja.canvas = freyja.layers[2]
		freyja.layer.clearLayer()
		freyja.renderVector2D( vector )

	})
})

const xvalue = document.querySelector('[data-vector_x]')
const yvalue = document.querySelector('[data-vector_y]')
const vectorvalues = [ xvalue, yvalue ]

const vector = new Vector( xvalue.value, yvalue.value )
freyja.canvas = freyja.layers[2]
freyja.renderVector2D( vector )

vectorvalues.forEach( val => {
	val.addEventListener('change', function(){
		freyja.canvas = freyja.layers[2]
		freyja.layer.clearLayer()
		vector.x = xvalue.value
		vector.y = yvalue.value
		freyja.renderVector2D( vector )
	})
})

// const functionspan = document.querySelector('[data-function]')
// console.log(functionspan)
// functionspan.addEventListener('input', function(){
// 	console.log(this)
// 	console.log(this.innerHTML)

	

// 	// var str = "Hello world, welcome to the universe.";
// 	// var n = str.includes("or");
// 	// console.log(n)

// // 	//make a regular expression out of your needle
// // var needle = '<sup>'
// // var re = new RegExp(needle,'gi');
// // var haystack = this.innerHTML;

// // var results = new Array();//this is the results you want
// // while (re.exec(haystack)){
// //   results.push(re.lastIndex);
// // }

// const math = {
// 	'+': ( x, y ) => x + y,
// 	'-': ( x, y ) => x - y,
// 	'*': ( x, y ) => x * y
// }

// // console.log(math['+'](3,7))


	
// 	// freyja.renderFunction2D( func, subdivisions)

// 	if( typeof parseInt(this.innerHTML ) === 'number' 
// 		&& !isNaN( parseInt( this.innerHTML ) ) ) {
// 			freyja.canvas = freyja.layers[2]
// 			freyja.layer.clearLayer()
			
// 			const _function = x => x * parseInt(this.innerHTML)
// 			freyja.renderFunction2D( _function, 10)
// 	} 
	

	

// // const math = {
// // 	'+': function (x, y) { return x + y },
// // 	'-': function (x, y) { return x - y }
// // }​​​​​​​

// // console.log( math['+'](1, 2) )

// // console.log(results)


// 	// console.log( _function(1) )


// })

// // console.log(parseInt(xMax.value),parseInt(xMin.value),parseInt(yMax.value),parseInt(yMin.value))








