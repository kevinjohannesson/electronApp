const debugMode = true; // global debuggin mode boolean



// sort of a .length for {} objects
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

const ping = ( color = 'gold' )=>{ console.log('%c ping ', `background-color: ${ color }; color: black;`) };
const pong = ( color = 'salmon' )=>{ console.log('%c pong ', `background-color: ${ color }; color: white;`) };



function echo(){
  if(arguments.length != 0) {
    for (const property in arguments[0]) {
      console.log(`${property}: ${arguments[0][property]}`);
    }
  }

  else console.log('%c Hello! ', 'background-color: gold; color: black;'); 
}

function round(value = 1, decimals = 3) {
  // returns a rounded float value to a specified decimal
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals); // Expected output: 1.000
}

function getRandomInt(max) {
  // returns a random integer between 0 and a maximum
  return Math.floor(Math.random() * Math.floor(max));
}

// return an array of values between start and end with incr as spacing until start is bigger than end
const lerpValsOLD = ( start = 12, end = 343, incr = 21 ) => {
  const n = [];
  while( start < end ) { n.push( start ); 
    start += incr; };
  return n
}


const lerpVals2 = ( start = 12, end = 343, incr = 21 ) => {
  const n = [];
  if ( end < start ) {  
    while( start > end ) { 
      n.push( start );
      start -= incr; }; }
  else if ( start > end ) { 
    while( start < end ) { 
      n.push( start );
      start += incr; }; }
  return n
}


const lincr = ( start = 12, end = 343, incr = 21 ) => {
  const n = [];
  if ( start <= end ) { 
    while( start <= end ) { 
      n.push( start );
      start += incr; }; }
  else if ( start >= end ) {  
    while( start >= end ) { 
      n.push( start );
      start -= incr; }; }
  return n
}



// Calculate absolute difference between 2 numbers.
const diff = ( a = 12, b = 34 ) => { return Math.abs( a - b ) }

// Linear interpolation of x between in_min ... in_max to out_min ... out_max.
const lerp = ( x,  in_min,  in_max,  out_min,  out_max) => {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
// Cosine interpolation of x between in_min ... in_max to out_min ... out_max.
const clerp = (x, in_min,  in_max,  out_min,  out_max ) => {
  const x_normalized = lerp( x, in_min,  in_max, 0, 1 ),
        x_cosine = ( 1 - Math.cos( x_normalized * Math.PI ) ) * 0.5;
  return lerp( x_cosine, 0, 1, out_min, out_max )
}

function getLinearInterpolation( x,  in_min,  in_max,  out_min,  out_max){
  // returns a value between out_min and out_max linear interpolated
  //  of x between in_min and in_max 
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}



function getCosineInterpolation(x, in_min,  in_max,  out_min,  out_max){
  // returns a value between out_min and out_max cosine interpolated
  // of x between in_min and in_max, so it eases in and out
  const x_normalized = this.getLinearInterpolation(x, in_min,  in_max, 0, 1),
        x_cosine = (1 - Math.cos(x_normalized * Math.PI)) * 0.5,
        out_cosine = this.getLinearInterpolation(x_cosine, 0, 1, out_min, out_max);
  return out_cosine
}

function decodeRgba(rgbaValueString = 'rgba(0,0,0,1'){
  // function accepts an rgba string such as rgba(0, 0, 0, 1) and
  // returns the color as an object {r: 0, g: 0, b: 0, a: 1}
  // break the string into parts per each comma
  const string_breakdown = rgbaValueString.split(','),
        total_parts = string_breakdown.length,
        all_colors = [];

  let current_part;
  for(current_part = 0; current_part < total_parts; current_part++){
    // loop over the parts of the broken down string
    const total_characters = string_breakdown[current_part].length;
    let color_value = '';

    let current_character;
    for(current_character = 0; current_character < total_characters; current_character++) {
      // loop over each character per part of string
      const character = string_breakdown[current_part][current_character];
      // add to color_value if character is a number
      if( character !== ' ' && !(isNaN(character)) || character === '.' ) color_value += character;
    }

    all_colors.push( Number( color_value ) ); 
  }
  
  return { r: all_colors[0], g: all_colors[1], b: all_colors[2], a: (all_colors[3]) ? all_colors[3] : 1 }
}

function parseFunction(func){
  // returns passed function as a string without the function declaration:
  // convert the function to a string:
  let str = func.toString()
  // check where function opens and closes by the first and last brackets
  let function_open = str.indexOf('{');
  let function_close = str.lastIndexOf('}');
  let total_saved_chars = function_close - function_open;
  // remove function declaration and closing bracket from string:
  // convert the string to an array of characters:
  str = [...str];
  // cut out the part we want to keep
  // remove closing bracket:
  str = str.splice(0, function_close);
  // remove function declaration:
  str = str.splice(function_open+1);
  // convert back to string
  str = str.join('');

  return str
}

function createElement(element, css_class){ // moet even uitbouwen tot (element_type, config met daarin div, class etc)
  const e = document.createElement(element);
  e.setAttribute('class', css_class);
  return e;
}


















/// random number generator:

function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

// Create xmur3 state:
var seed = xmur3("apples");

// Output one 32-bit hash to provide the seed for mulberry32.
var rand = mulberry32(seed());


// // // Obtain sequential random numbers like so:
// console.log( rand() );
// console.log( rand() );


const getRandomVector = ( total_vectors = 1, radius = 500 ) => {
  // generate pseudo random x,y vectors 
  const all_vectors = [];
  let i;
  for (i = 0; i < total_vectors; i++) {
    // create a pseudo random vector with values ranging from -radius to +radius
    const vector = {
      x: ( rand() * ( radius * 2 ) ) - radius,
      y: ( rand() * ( radius * 2 ) ) - radius
    }
    all_vectors.push( vector )
  }

  return all_vectors
}