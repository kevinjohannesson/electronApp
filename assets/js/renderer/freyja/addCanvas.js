/**
 * Adds a new canvas element to the document.
 *
 * @memberof Freyja
 *
 * @param {string} name - a name for the layer.
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
Freyja.prototype.addCanvas = function( name = `new_layer_${ this.layers.length }` ) {
	const canvas = document.createElement('canvas'); 	// Create a new canvas element.
	canvas.setAttribute( 'id', name ); 								// Set the canvas id attribute to the passed name argument.
	canvas.height = this.container.clientHeight;			// Set height of the canvas to be the same as the container.
 	canvas.width = this.container.clientWidth;				// Set width of the canvas to be the same as the container.
	this.container.appendChild( canvas ); 						// Append the canvas to a container element.
	this.layers.push( canvas ); 											// Add the canvas to Freyja layer set.
	this.current_layer = canvas; 											// Set created canvas to be Freyja current layer.
	return canvas 																		// Return the created canvas element.
}