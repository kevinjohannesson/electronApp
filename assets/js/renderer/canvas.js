// Prototype values: 
// ----------------
 
/**
 * The CanvasRenderingContext2D interface, part of the Canvas API, provides the 2D rendering context for the drawing surface of a <code>&lt;canvas&gt;</code> element. It is used for drawing shapes, text, images, and other objects.See {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D|MDN}.
 *
 * @namespace {Object} CanvasRenderingContext2D
 */



/**
 * Default configuration for the canvasRenderingContext2D stroke and fill.
 * By default stroke is set to true, 2 pixels wide and black. 
 * By default fill is set to false and black.
 *
 * @memberof CanvasRenderingContext2D
 *
 * @example <caption>Full object</caption>
 * defaultConfig = {
  fillStyle: 'rgba( 0, 0, 0, 1 )',
  fill: false,
  strokeStyle: 'rgba( 0, 0, 0, 1)',
  strokeThickness: 2,
  stroke: true
};
 */
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




/**
 * The HTMLCanvasElement interface provides properties and methods for manipulating the layout and presentation of <code>&lt;canvas&gt;</code> elements. The HTMLCanvasElement interface also inherits the properties and methods of the HTMLElement interface. See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement|MDN}.
 *
 * @namespace {Object} HTMLCanvasElement
 */

















HTMLCanvasElement.prototype.addToDocument = function ( container = document.querySelector( 'body' ) ) {
  console.log('hallo')

  // // edit canvas dimensions to container div:
  //   this.height = container_element.clientHeight;
  //   this.width = container_element.clientWidth;
  //   // add canvas element to container div...
  //   container_element.appendChild(this.canvas);
  //   // make visible as the default...
  //   this.show(true);
}