/**
 * Draw a circle on the canvas.
 * Simplification for arc():.
 *
 * @memberof CanvasRenderingContext2D
 *
 * @param {Object} origin - A { x, y } location vector.
 * @param {number} radius - The radius of the circle.
 * @param {Object} config - Changes to the default stroke and fill style.
 *
 * @todo create examples
 * @todo finish this with comments
 */
CanvasRenderingContext2D.prototype.drawCircle = function( origin = { x: 300, y: 300 }, radius = 100, config = this.defaultConfig, circleStart = 0, circleEnd = Math.PI * 2 ) {
  this.beginPath(); 												// Start the path:
  this.arc( origin.x, origin.y, radius, circleStart, circleEnd ); 	// Create the arc.
  this.draw( config ); 													// Stroke and or fill the path.
}