Freyja.prototype.renderVector2D = function( vector = { x: 0, y: 0}, color = 'gold' ) {
  const absolutePosition = this.CoordinatePlane2D.calculateVectorPosition( vector )
  const screenPosition = this.calculateScreenPosition( absolutePosition )
  this.layer.drawCircle(screenPosition, 5, { fill: true, fillStyle: color, lineWidth: 2})
}

Freyja.prototype.initializeCoordinatePlane2D = function( CoordinatePlane2D ) {
  this.CoordinatePlane2D = CoordinatePlane2D
  this.renderCoordinatePlane2D()
}

Freyja.prototype.renderFunction2D = function( func, subdivisions ) {
  const vectors = []
  for(let i = 0; i<=subdivisions*this.CoordinatePlane2D.axes.x.size; i++){
    const interpolatedValue = lerp( i, 0, subdivisions*this.CoordinatePlane2D.axes.x.size, this.CoordinatePlane2D.axes.x.min, this.CoordinatePlane2D.axes.x.max )
    const interpolatedValue_y = func(interpolatedValue)

    const vector = new Vector( interpolatedValue, interpolatedValue_y)
    vectors.push(vector)
  }	
  // console.log(vectors)
  for( let i = 1; i < vectors.length; i++){
    let lineStart = vectors[ i - 1 ]
        lineStart = this.CoordinatePlane2D.calculateVectorPosition( lineStart )
        lineStart = this.calculateScreenPosition( lineStart )

    let lineEnd = vectors[ i ]
        lineEnd = this.CoordinatePlane2D.calculateVectorPosition( lineEnd )
        lineEnd = this.calculateScreenPosition( lineEnd )
    
    this.layer.createLine( lineStart, lineEnd, { lineWidth: 3} )
    // this.renderVector2D( vectors[i] )
  }
}

Freyja.prototype.renderCoordinatePlane2D = function( ) {
  // set layer blending mode:
  freyja.layer.globalCompositeOperation = 'multiply';
  // center coordinatePlane:
  this.centeredBox = this.CoordinatePlane2D

  const render = axis => {
    this.renderCoordinatePlane2D_Axis( axis ) 
    this.renderCoordinatePlane2D_Grid( axis )
    this.renderCoordinatePlane2D_Ticks( axis )
    this.renderCoordinatePlane2D_Numbers( axis ) 
  }
  
  render( this.CoordinatePlane2D.axes.x )
  // console.log(this.CoordinatePlane2D.axes.x.position)
  render( this.CoordinatePlane2D.axes.y )
  // console.log(this.CoordinatePlane2D.axes.y.position)

  // reset layer blending mode:
  freyja.layer.globalCompositeOperation = 'normal';

}



Freyja.prototype.renderCoordinatePlane2D_Axis = function( axis ) {
  // axis lines extend a bit outside of the bounding box for stylistic purposes...
  const extendLength = 40
  // create vectors to extend the axis with:
  const extendStart = {
    [axis.id]: -extendLength,
    [axis.perpendicular.id]: 0 }
  const extendEnd = {
    [axis.id]: extendLength,
    [axis.perpendicular.id]: 0 }

  let lineStart = vectorMath.add( axis.start, extendStart )
      lineStart = this.calculateScreenPosition( lineStart )
  let lineEnd = vectorMath.add( axis.end, extendEnd )
      lineEnd = this.calculateScreenPosition( lineEnd )

  // set up styling for canvasContext
  const config = {
    strokeStyle: axis.id === 'x'? 'tomato' : 'olive',
    lineWidth: 9, }
  // draw axis lines:
  this.layer.createLine( lineStart,lineEnd, config )
}

Freyja.prototype.renderCoordinatePlane2D_Grid = function( axis ) {
		const config = {
			strokeStyle: 'rgba(50,50,50,0.5)',
			lineWidth: 1, }
		// draw grid lines:
		axis.gridLines.forEach( (line,index, arr) => {
      if(index !== 0 && index !== arr.length-1) { // do not draw the first and last gridline for stylistic purposes
        const lineStart = this.calculateScreenPosition(line.start)
        const lineEnd = this.calculateScreenPosition(line.end)
			  this.layer.createLine( lineStart, lineEnd, config ) }
		})
}

Freyja.prototype.renderCoordinatePlane2D_Ticks = function( axis ) {
		const tickColor = 'rgba(50,50,50,0.75)'
		let tickWidth = 5 // setup width and height for the tick
		let tickHeight = 10
		if(axis.id === 'y') {  // swap height and width for y axis
			tickHeight = (tickWidth=>tickWidth)(tickWidth,tickWidth=tickHeight) }
		
    this.layer.fillStyle = tickColor;

		axis.numbers.forEach( number => {
			let tickPosition = number.position // Center the tick origin in the view
          tickPosition.x = tickPosition.x - ( tickWidth / 2 )
          tickPosition.y = tickPosition.y + ( tickHeight / 2 )
          tickPosition = this.calculateScreenPosition( tickPosition )
      this.layer.fillRect( tickPosition.x, tickPosition.y, tickWidth, tickHeight ) // create a rectangle from the centered origin.
		})	
}

Freyja.prototype.renderCoordinatePlane2D_Numbers = function( axis ){
  // offset the number a bit from the axis for visibility
  const offset_x = axis.id === 'x'? 8 : -5
  const offset_y = axis.id === 'x'? -20 : 6
  const offset = new Vector( offset_x, offset_y ) 
  
  const renderNumber = ( number ) => {
    // setup position on screen
    let position = number.position;
        position = vectorMath.add( position, offset )
        position = this.calculateScreenPosition( position )
    // setup font
    this.layer.font = 'italic 13px Arial'
    this.layer.textAlign = axis.id === 'x'? 'left' : 'right'
    this.layer.textBaseline = 'middle'
    this.layer.fillStyle = 'black'
    // render number value
    this.layer.fillText(number.value, position.x, position.y)
  }

  axis.numbers.forEach( renderNumber )
}