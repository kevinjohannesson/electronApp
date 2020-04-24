/** This is a description of the foo function. */
function foo() {
}


// Prototype values: 
// ----------------

// Default configuration for the styles:
CanvasRenderingContext2D.prototype.defaultConfig = {
  fillStyle: 'rgba( 0, 0, 0, 1 )',
  fill: false,
  strokeStyle: 'rgba( 0, 0, 0, 1)',
  strokeThickness: 2,
  stroke: true
};

// Prototype methods:
// -----------------

// Graphical operations:

// Simplification for clearRect:
HTMLCanvasElement.prototype.clear = function() { this.clearRect( 0, 0, this.width, this.height); } // Create a clearing rectangle starting at top-left and ending at bottom-right, clearing the canvas.

/**
 * Fills the canvas with a specified color.
 * @memberof HTMLCanvasElement
 * Simplification for CanvasRenderingContext2D fillRect.
 *
 * @param {string} color - Any css accepted color value.
 *
 * @example <caption>Using a rgba value</caption>
 * // Fills the canvas with a black color:
 * HTMLCanvasElement.fill( 'rgba( 0, 0, 0, 1 )' );
 *
 * @example <caption>Using a hex value</caption>
 * // Fills the canvas with a red color:
 * HTMLCanvasElement.fill( '#ff0000' );
 *
 * @example <caption>Using a css name value</caption>
 * // Fills the canvas with a gold color:
 * HTMLCanvasElement.fill( 'gold' );
 *
 */

function fill( color = this.getContext('2d').defaultConfig.fillStyle ) { 
  const context = this.getContext('2d'); // Get this canvas' CanvasRenderingContext2D object.
  context.fillStyle = color; // Set context fillcolor to the passed color argument.
  context.fillRect(0, 0, this.width, this.height) // Create a rectangle starting at top-left of the canvas and ending at the bottom-right, filling the canvas.
};

HTMLCanvasElement.prototype.fill = function( color = this.getContext('2d').defaultConfig.fillStyle ) { 
  const context = this.getContext('2d'); // Get this canvas' CanvasRenderingContext2D object.
  context.fillStyle = color; // Set context fillcolor to the passed color argument.
  context.fillRect(0, 0, this.width, this.height) // Create a rectangle starting at top-left of the canvas and ending at the bottom-right, filling the canvas.
}

// Simplification for fill() and stroke() for path:
HTMLCanvasElement.prototype.draw = function ( config = this.getContext('2d').defaultConfig ) {
  const context = this.getContext('2d'); // Get this canvas' CanvasRenderingContext2D object.
  if ( config != this.defaultConfig ) { // Check if an alternate config has been passed.
    const defaultConfig = JSON.parse( JSON.stringify( context.defaultConfig ) ); // Create a copy of the default config.
    config = Object.assign( defaultConfig, config ); // Alter the default config with changes from the passed config argument.
  }
  // Check if the config specifies a stroke for the path:
  if ( config.stroke === true ) {
    context.strokeStyle = config.strokeStyle; // Set the specified stroke color from the config.
    context.lineWidth = config.lineWidth; // Set the specified line thickness from the config.
    context.stroke(); // Stroke the path with the color and thickness.
  }
  // Check if the config specifies a fill for the path:
  if ( config.fill === true ) { 
    context.fillStyle = config.fillStyle; // Set fill color from the config.
    context.fill(); // Fill the path with the color.
  }
}

// Simplification for lineTo():
HTMLCanvasElement.prototype.drawLine = function ( vector_start = { x: 0, y: 0 }, vector_end = { x: 100, y: 100 }, config = this.getContext('2d').defaultConfig ) {
  const context = this.getContext('2d');
  context.beginPath();
  context.moveTo( vector_start.x, vector_start.y );
  context.lineTo( vector_end.x, vector_end.y );
  this.draw( config );
}

HTMLCanvasElement.prototype.addToDocument = function ( container = document.querySelector( 'body' ) ) {
  console.log('hallo')
}

// class to create and edit html canvas elements
class Layer{
  constructor(){
    // every layer is a new canvas element:
    this.canvas = document.createElement('canvas');
    // store the context
    this.context = this.ctx = this.canvas.getContext('2d');
    // default canvas context stroke and fill config:
    this.ctx_default_config = {
    	fill_style: 'rgba( 0, 0, 0, 1 )',
    	fill: false,
    	stroke_style: 'rgba( 0, 0, 0, 1)',
    	stroke_thickness: 1,
    	stroke: true
    };
  }

  // canvas dimensions
  get height() { return this.canvas.height }
  set height( h ) { this.canvas.height = h; }

  get width() { return this.canvas.width }
  set width( w ) { this.canvas.width = w; }

  // append the canvas element to the dom tree
  addToDocument( container_element ){
    // edit canvas dimensions to container div:
    this.height = container_element.clientHeight;
    this.width = container_element.clientWidth;
    // add canvas element to container div...
    container_element.appendChild(this.canvas);
    // make visible as the default...
    this.show(true);
  }

  // naming the layer:
  get id(){ return this.canvas.attributes.id }
  set id( name ) { this.canvas.setAttribute('data-layer', name); }

  // css display and opacity:
  show( bool ) {
    if( bool ) this.canvas.style.display = 'block';
    else this.canvas.style.display = 'none';
  }

  get opacity() { return this.canvas.style.opacity }
  set opacity( float_val = 0.5 ){ this.canvas.style.opacity = float_val; }
  
  // Graphical operations:

  // fill whole layer with single color:
  fill( color = 'rgba( 255, 255, 255, 1 )' ) {
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}
	// clear whole layer
  clear() { this.context.clearRect(0,0, this.canvas.width, this.canvas.height); }

  // update canvas context config for stroke and fill styles:
  getConfig( config_changes = { stroke: true } ) { 
  	// getter config for canvas context operations with optional changes:
  	// create a copy, not a reference, of the default config:
  	const target = JSON.parse( JSON.stringify( this.ctx_default_config ) )
  	// alter the copy with input from the optional changes:
  	return Object.assign( target, config_changes );
  }

  fillPath( config = this.ctx_default_config ) {
  	if ( config.fill === true ) {
  		const ctx = this.ctx;
  		ctx.fillStyle = config.fill_style;
			ctx.fill();
		}
  }

  strokePath( config = this.ctx_default_config ) {
  	if ( config.stroke === true ) {
  		const ctx = this.ctx; 
	  	ctx.strokeStyle = config.stroke_style;
			ctx.lineWidth = config.stroke_thickness;
			ctx.stroke();
		}
  }

  strokeAndFillPath( config = this.ctx_default_config ) {
  	this.strokePath( config );
  	this.fillPath( config );
  }

  // canvas stroke and fill operations with configuration:
  ctx_draw( config = this.ctx_default_config ) {
    // update canvas configuration if changes have been passed as arguments:
    if ( config != this.ctx_default_config ) this.getConfig( config );
    if ( config.stroke === true ) {
      this.ctx.strokeStyle = config.stroke_style;
      this.ctx.lineWidth = config.stroke_thickness;
      this.ctx.stroke();
    }
    if ( config.fill === true ) {
      this.ctx.fillStyle = config.fill_style;
      this.ctx.fill();
    }
  }

  // draw a circle on the canvas:
  drawCircle( vector = { x: 300, y: 300 }, radius = 100, config_changes = { fill: this.ctx_default_config.fill } ){
    // start the path:
    this.ctx.beginPath();
    this.ctx.arc( vector.x, vector.y, radius, 0, Math.PI * 2 );
    // stroke and fill path with config_changes:
    this.strokeAndFillPath( this.config( config_changes ) );
  }

  drawLine( vector_start = { x: 0, y: 0 }, vector_end = { x: 300, y: 300 }, config_changes = { fill: this.ctx_default_config.fill } ){
    // create path at supplied coordinates:
    // this.ctx.beginPath();
    // this.ctx.moveTo( vector_start.x, vector_start.y );
    // this.ctx.lineTo( vector_end.x, vector_end.y );

    // console.log(this.ctx)
    // console.log(this.ctx.defaultConfig)
    this.canvas.drawLine();
    // this.canvas.addToDocument();
    // console.dir(this.canvas)
    // this.ctx.aapje = ()=> {
    // // update canvas configuration if changes have been passed as arguments:
    //   // if ( config != this.ctx_default_config ) this.getConfig( config );
    //   // if ( config.stroke === true ) {
    //     // this.strokeStyle = config.stroke_style;
    //     // this.lineWidth = config.stroke_thickness;
    //     console.log(this.ctx)
    //     // this.stroke();
    //   // }
    //   // if ( config.fill === true ) {
    //     // this.fillStyle = config.fill_style;
    //     // this.fill();
    //   // }
    // }

    // this.ctx.aapje();
    // this.ctx_draw( config_changes )
    // this.strokeAndFillPath( this.config( config_changes ) );
  }
}