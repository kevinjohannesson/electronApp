/** @class */
class Freyja {
	constructor( container_element = document.querySelector('#layer_container') ) {
		this.layers = []; 																						// Store canvas elements as layers:
		this.container = container_element; 													// Store container HTMLElement:
		this.canvas = this.addCanvas(); 															// Create the first canvas.
		this.boundingBox = { width: this.canvas.width, height: this.canvas.heigt } // picture in picture kind of thing
		this.CoordinatePlane2D = 'none'
		Object.defineProperty( this, 'layer', { 
			get: function() { 		// Define a get property to this.CanvasRenderingContext2D
				return this.canvas.getContext('2d'); } 												// Get the canvas' context.
		});
	}
}
