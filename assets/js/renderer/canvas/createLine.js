/**
 * Draw a line on the canvas.
 * Simplification for lineTo():.
 *
 * @memberof CanvasRenderingContext2D
 *
 * @param {Object} vector_start - A { x, y } location vector.
 * @param {Object} vector_end - A { x, y } location vector.
 *
 * @todo create examples
 * @todo finish this with comments
 */
CanvasRenderingContext2D.prototype.createLine = function ( vector_start = { x: 0, y: 0 }, vector_end = { x: 100, y: 100 }, config = this.defaultConfig ) {
  this.beginPath();
  this.moveTo( vector_start.x, vector_start.y );
  this.lineTo( vector_end.x, vector_end.y );
  this.draw( config );
}