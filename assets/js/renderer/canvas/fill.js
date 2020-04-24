/**
 * Fills the canvas with a specified color.
 * Create a rectangle starting at top-left of the canvas and ending at the bottom-right, 
 * filling the canvas with the color. Simplification for CanvasRenderingContext2D fillRect.
 *
 * @memberof CanvasRenderingContext2D
 *
 * @param {string} color - Any css accepted color value.
 *
 * @example <caption>Using a rgba value:</caption>
 * CanvasRenderingContext2D.fill( 'rgba( 0, 0, 0, 1 )' ); // fill the whole canvas with black color:
 *
 * @example <caption>Using a hex value:</caption>
 * CanvasRenderingContext2D.fill( '#ff0000' ); // fill the whole canvas with red color:
 *
 * @example <caption>Using a css name value:</caption>
 * CanvasRenderingContext2D.fill( 'gold' ); // fill the whole canvas with gold color:
 *
 */
CanvasRenderingContext2D.prototype.fill = function( color = this.defaultConfig.fillStyle ) { 
  this.fillStyle = color;                      								// Set context fillcolor to the passed color argument.
  this.fillRect(0, 0, this.canvas.width, this.canvas.height)	// Create the rectangle.
}