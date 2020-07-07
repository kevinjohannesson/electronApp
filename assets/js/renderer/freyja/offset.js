Object.defineProperty(Freyja.prototype, "offset", {
  get() { 
    if(this._offset == undefined) return { x: 0, y: 0 }
    return this._offset; },

  set( vector = { x: 0, y: 0 } ) { 
    if( vector.x && vector.y ) {
      this._offset = vector }
    else console.log('Offset needs a x and y vector.') },
});

Object.defineProperty(Freyja.prototype, "centeredBox", {
  set( boundingBox = { width: 500, height: 300 } ) { 
    if( boundingBox.width && boundingBox.height ) {
      const offset = {
        x: ( this.canvas.width - boundingBox.width ) / 2,
        y: ( this.canvas.height - boundingBox.height ) / 2 }
      this._offset = offset 
      // console.log(boundingBox)
      this.boundingBox = { width: boundingBox.width, height: boundingBox.height }
    }
    else console.log('centeredBox needs a width and height property.') },
});

Freyja.prototype.pos = function( vector ) {
  return vectorMath.add( vector, this.offset )
}

Freyja.prototype.calculateScreenPosition = function( vector ) {
  const screenPosition = this.boundingBox? new Vector( vector.x, this.boundingBox.height - vector.y ) 
                                         : new Vector( vector.x, this.canvas.height - vector.y )
  return vectorMath.add( screenPosition, this.offset )
}