class CoordinatePlane {
  constructor( xMin = 0, xMax = 10, yMin = 0, yMax = 10 ) {
    this.initialize( xMin, xMax, yMin, yMax )  
  }

  initialize( xMin, xMax, yMin, yMax ) {
    this.axes = { 
      x: new NumberLine(xMin, xMax ), 
      y: new NumberLine(yMin, yMax ) }
  
    this.axes.x.id = 'x'
    this.axes.x.perpendicular = this.axes.y
    this.axes.x.position = this.getNormalizedAxisPosition( this.axes.x )

    this.axes.y.id = 'y'
    this.axes.y.perpendicular = this.axes.x
    this.axes.y.position = this.getNormalizedAxisPosition( this.axes.y )
  }

  

  getNormalizedAxisPosition( axis ){
    const { min, max } = axis.perpendicular
    // Calculates the normalized position of 0 between a min and max value.
    if( min === 0 ) return 0
    if( max === 0 ) return 1
    if( _positive( min, max ) ) return min < max ? 0 : 1
    if( _negative( min, max ) ) return min < max ? 1 : 0
    return lerp( 0, min, max, 0, 1 ) 
  }
  
}

class sizedCoordinatePlane extends CoordinatePlane {
  constructor( xMin = 0, xMax = 10, yMin = 0, yMax = 10, width = 700, height = 500 ){
    super(xMin, xMax, yMin, yMax)
    
    this.initializeSizedCoordinatePlane( width, height )
  }

  initializeSizedCoordinatePlane( width, height ) {

    this.width = width
    this.height = height


    this.boundingBox = {
      width: width,
      height: height }
    
    this.calculateNumberPositions( this.axes.x )
    this.calculateNumberPositions( this.axes.y )

    this.axes.x.position *= this.height
    this.axes.y.position *= this.width

    this.axes.x.length = this.width
    this.axes.y.length = this.height
  }

  calculateNumberPositions( axis ){
    const axisLength = axis.id === 'x'? this.width : this.height

    const calculatePosition = ( number ) => {
      number.position = number.segment * axisLength }
    
    axis.numbers.forEach( calculatePosition )
  }

  calculateVectorPosition( vector ) {
    const normalizedPosition = {
      x: this.axes.x.calculatePosition( vector.x ),
      y: this.axes.y.calculatePosition( vector.y ) }
    const length = {
      x: this.width,
      y: this.height }
    const position = vectorMath.multiply( normalizedPosition, length )
    return position
  }
}

class CoordinatePlane2D extends sizedCoordinatePlane {
  constructor( xMin = 0, xMax = 10, yMin = 0, yMax = 10, width = 700, height = 500 ){ 
    super( xMin, xMax, yMin, yMax, width, height )

    this.initiatePlane2D()
  }

  rebuild( xMin = 0, xMax = 10, yMin = 0, yMax = 10 ) {
    this.initialize( xMin, xMax, yMin, yMax )
    this.initializeSizedCoordinatePlane( this.width, this.height )
    this.initiatePlane2D()
  }

  initiatePlane2D(){
    this.initiate2D( this.axes.x )
    this.initiate2D( this.axes.y )
  }

  initiate2D( axis ){
    this.make2D( axis )
    this.createGridLines( axis )
  }

  make2D( axis ){
    this.makeAxis2D( axis )
    this.makeNumberPosition2D( axis )
  }

  makeAxis2D( axis ) {
    axis.start = {
      [axis.id]: 0,
      [axis.perpendicular.id]: axis.position }

    axis.end = {
      [axis.id]: axis.id === 'x'? this.width : this.height,
      [axis.perpendicular.id]: axis.position }
  }

  makeNumberPosition2D( axis ) {
    axis.numbers.forEach( number => {
      number.position = {
        [axis.id]: number.position,
        [axis.perpendicular.id]: axis.position }
    })
  }

  createGridLines( axis ) {
    this.axes[axis.id].gridLines = this.axes[axis.id].numbers.map( number => {
      return { 
        start: {
          [axis.id]: number.position[axis.id],
          [axis.perpendicular.id]: 0 }, 
        end: {
          [axis.id]: number.position[axis.id],
          [axis.perpendicular.id]: this.axes[axis.perpendicular.id].length } }
    })
  }
}