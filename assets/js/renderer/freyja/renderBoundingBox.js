Freyja.prototype.renderBoundingBox = function( boundingBox = { width: 500, height: 300 } ){
  // Create a rectangular bounding box using a dashed line.

  // Declare variables for styling of the stroke:
  const lineWidth = 2;
  const dashLength = 8;
  const dashSpace = 20;
  const strokeColor = 'rgba(50,50,50,0.5)';

  // Style the canvas stroke:
  this.layer.strokeStyle = strokeColor;
  this.layer.lineWidth = lineWidth;
  this.layer.setLineDash([dashLength, dashSpace]);

  // Draw the rectangle:
  this.layer.strokeRect( this.offset.x, this.offset.y, boundingBox.width, boundingBox.height );

  // Reset the canvas linedash():
  this.layer.setLineDash([]); 
}
  