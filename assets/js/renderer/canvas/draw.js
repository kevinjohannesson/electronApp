/**
 * Draw the path on the canvas.
 * Simplification for fill() and stroke() for path.
 * <br>
 * This function needs a {@link drawLine|path} in order to function properly:
 * 
 * @memberof CanvasRenderingContext2D
 *
 * 
 * @param {Object} config - A configuration for the stroke and fill.
 *
 * @example <caption>Stroke the path:</caption>
 * // defaultConfig is stroke only:
 * CanvasRenderingContext2D.draw();
 *
 * @example <caption>Stroke and fill the path:</caption>
 * CanvasRenderingContext2D.draw( { fill: true } ); // defaultConfig.fill is false:
 *
 * @example <caption>Fill the path with a color:</caption>
 * CanvasRenderingContext2D.draw( { stroke: false, fill: true, fillStyle: 'rgba( 123, 43, 210 )' } ); // Turn on fill and provide a color.
 *
 * @example <caption>Stroke and fill the path with a color:</caption>
 * CanvasRenderingContext2D.draw( { strokeStyle: 'rgba( 123, 43, 210 )', fill: true, fillStyle: 'rgba( 210, 123, 43 )' } ); // Fill path with a color and stroke with a different color.
 * 
 * @see {@link drawLine}
 */
CanvasRenderingContext2D.prototype.draw = function ( config = this.defaultConfig ) {
  if ( config != this.defaultConfig ) {                          // Check if an alternate config has been passed.
    let defaultConfig = JSON.stringify( this.defaultConfig );    // Create a copy of the default config.
    defaultConfig = JSON.parse( defaultConfig );                 // parse the copy back to a readable object
    config = Object.assign( defaultConfig, config );             // Alter the default config with changes from the passed config argument.
  }
  if ( config.stroke === true ) {                                // Check if the config specifies a stroke for the path:
    this.strokeStyle = config.strokeStyle;                       // Set the specified stroke color from the config.
    this.lineWidth = config.lineWidth;                           // Set the specified line thickness from the config.
    this.stroke();                                               // Stroke the path with the color and thickness.
  }
  if ( config.fill === true ) {                                  // Check if the config specifies a fill for the path:
    this.fillStyle = config.fillStyle;                           // Set fill color from the config.
    this.fill();                                                 // Fill the path with the color.
  }
}