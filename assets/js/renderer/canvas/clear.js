/**
 * Create a clearing rectangle from the top-left to the bottom-right of the canvas element, 
 * clearing the whole canvas. Simplification for CanvasRenderingContext2D clearRect.
 *
 * @memberof CanvasRenderingContext2D
 *
 * @example <caption>Clear the canvas:</caption>
 * CanvasRenderingContext2D.clear(); // clear the whole canvas:
 *
 */
CanvasRenderingContext2D.prototype.clear = function() { 
  this.clearRect( 0, 0, this.canvas.width, this.canvas.height);  // Create the clearing rectangle.
} 