/**
 * Stuff for vector math 
 *
 * @namespace {Object} Vector
 */

// location vector objects:
const vec3 = ( x = 0, y = 0, z = 0 ) => { return { x: x, y: y, z: z } },
      vec4 = ( x = 0, y = 0, z = 0, w = 1 ) => { return { x: x, y: y, z: z, w: w } };

// vec2 = ( x = 0, y = 0 ) => { return { x: x, y: y } },
class Vector {
  constructor ( x = 0, y = 0 ){
    this.x = x
    this.y = y
  }
}

// const vec2 = ( x = 0, y = 0 ) => {
//   if( ( typeof x === 'number' || x.constructor === Array ) && 
//       ( typeof y === 'number' || y.constructor === Array ) ) { // Check validity of arguments
//     if ( typeof x === 'number' && typeof y === 'number' ) { return { x: x, y: y } } 
//     else if ( x.constructor === Array || y.constructor === Array ) {
//       let arr;
//       if ( x.constructor === Array && y.constructor === Array ) { arr = Math.max( x.length, y.length ); } 
//       else if ( x.constructor === Array ) { arr = x.length; }
//       else { arr = y.length; }
//       const vectors = [];
//       let nX = x, nY = y;
      
//       for (let i = 0; i < arr; i++) {
//         if ( x.constructor === Array ) nX = ( x[i] ) ? x[i] : x[ x.length-1 ];
//         if ( y.constructor === Array ) nY = ( y[i] ) ? y[i] : y[ y.length-1 ];
//         vectors.push( vec2( nX, nY ) ); }
      
//       return vectors } }
//   else console.error( 'Invalid arguments for vec2')  
// }


class VectorMath {
  constructor(){

  }

  addVector = ( vector_a, vector_b )=>{
    const newVector = {};                                  
    for ( const axis in vector_a ) {                       
      newVector[axis] = vector_a[axis] + vector_b[axis]
    } 
    return newVector
  }

  add( ...vectors ){
    let newVector = { x: 0, y: 0 }
    vectors.forEach( vector => {
        newVector = this.addVector( newVector, vector )
    })
    return newVector
  }

  multiplyVector = ( vector_a, vector_b )=>{
    const newVector = {};                                  
    for ( const axis in vector_a ) {                       
      newVector[axis] = vector_a[axis] * vector_b[axis] } 
    return newVector
  }

  multiply( ...vectors ){
    let newVector;
    vectors.forEach( ( vector, index ) => {
      if ( index !== 0 ) { 
        newVector = this.multiplyVector( vectors[index-1], vector ) } 
    })
    
    return newVector
  }
  // Vector addition
  // To do: zou willen dat ie meer dan 2 vectors, liever nog een unlimited aantal arguments kan, dus arguments.foreach() oid maken
  // add( vector_a = vec2( 12 , 16 ), vector_b = vec2( 34, -18 ) ) {
  //   const newVector = {};                                  // declare a new empty vector object
  //   for ( const axis in vector_a ) {                       // iterate over all axis of the supplied vector
  //     newVector[axis] = vector_a[axis] + vector_b[axis]; } // assign the addion of the axis-key of vector_b and the axis-key of vector_a to the new vector object
  //   return newVector }                                     // return the new vector

  // createVectorXY( xValue = 0, yValue = 0 ) {
  //   const vector = { x: xValue, y: yValue };
  //   return vector }

  createVectorXY( x = 0, y = 0 ) {
  if( ( typeof x === 'number' || x.constructor === Array ) && 
      ( typeof y === 'number' || y.constructor === Array ) ) { // Check validity of arguments
    if ( typeof x === 'number' && typeof y === 'number' ) { return { x: x, y: y } } 
    else if ( x.constructor === Array || y.constructor === Array ) {
      let arr;
      if ( x.constructor === Array && y.constructor === Array ) { arr = Math.max( x.length, y.length ); } 
      else if ( x.constructor === Array ) { arr = x.length; }
      else { arr = y.length; }
      const vectors = [];
      let nX = x, nY = y;
      
      for (let i = 0; i < arr; i++) {
        if ( x.constructor === Array ) nX = ( x[i] ) ? x[i] : x[ x.length-1 ];
        if ( y.constructor === Array ) nY = ( y[i] ) ? y[i] : y[ y.length-1 ];
        vectors.push( vec2( nX, nY ) ); }
      
      return vectors } }
  else console.error( 'Invalid arguments for vec2')  
}

}

const vectorMath = new VectorMath;

const vec2 = vectorMath.createVectorXY;

const vec2n = ( x = 0, y = 0 ) => { return { x: x, y: y } }

// const aapje = vec2( 34, [1, 2, 3, 4, 5, 6] );
// const aapje1 = vec2( [1, 2, 3, 4, 5, 6], 34 );
// const aapje2 = vec2( [10, 20, 30, 40, 50, 60, 70, 80, 90], [1, 2, 3, 4, 5, 6] );
// console.log(aapje2)
/**
 * Arithmetic operations for vectors objects. 
 *
 * @namespace {Object} ArithmeticOperations
 *
 * @memberof Vector
 */

/**
 * Addition for vectors.
 *
 * @memberof ArithmeticOperations
 *
 * @param {Object} vector_a - A vec2,3,4 object.
 * @param {Object} vector_b - A vec2,3,4 object.
 *
 * @example <caption>Without argumens:</caption>
 * const freyja = new Freyja; // Initiate Freyja.
 * Freyja.addCanvas(); // Create a new canvas element with 'new_layer_n' as id.
 *
 * @example <caption>With a name argument:</caption>
 * const freyja = new Freyja; // Initiate Freyja.
 * freyja.addCanvas( 'someName' ); // create a new canvas element with 'someName' as id.
 *
 * @returns {HTMLElement} a new <code>&lt;canvas&gt;</code> element
 */
function vecAdd( vector_a = vec2( 12 , 16 ), vector_b = vec2( 34, -18 ) ) {
	const newVector = {};
	for ( const property in vector_a ) {
		newVector[property] = vector_a[property] + vector_b[property]; }
  
  return newVector
}