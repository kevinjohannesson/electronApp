class NumberLine {
  constructor( minValue = 0, maxValue = 10 ){
    this.min = minValue
    this.max = maxValue 
    this.size = diff( this.min, this.max )
    this.numbers = this.getNumbers()
  }

  calculatePosition( number ) {
    let { min, max } = this
    if(max < min) max = (min=>min)(min,min=max) // swap min and max if max is lower than min
    if( number >= min && number <= max ) {    // if number is within range of line
      return lerp( number, min, max, 0, 1 ) } // return linear interpolated value of number between min...max to 0...1
  }

  getNumbers() {
    let { min, max } = this
    // if(max < min) max = (min=>min)(min,min=max) // swap min and max if max is lower than min

    const all_values = []
    

    if( min <= max ) {
      while(min <= max){
        all_values.push(min++);  
      }
    }
    else {
      while(max <= min){
        all_values.push(min--);  
      }
    }
    
    const numbers = all_values.map( ( value, index ) => {
      const number = {
        value: value,
        segment: ( 1 / this.size ) * index }
      return number } )

    return numbers
  } 
}