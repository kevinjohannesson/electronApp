// transform functions

const getVectorDistance = (origin_vector, vector) =>{
  const distance = {};
      // calculation is to see if the distance is going in the negative or positive direction for both x and y
      distance.x = ( (vector.x < origin_vector.x) ? -1 : 1 ) * Math.sqrt( Math.pow((origin_vector.x - vector.x), 2) );
      distance.y = ( (vector.y < origin_vector.y) ? -1 : 1 ) * Math.sqrt( Math.pow((origin_vector.y - vector.y), 2) );
      
      if(distance.x === -0) distance.x = 0;
      if(distance.y === -0) distance.y = 0;
      distance.xy = Math.sqrt( Math.pow((origin_vector.x - vector.x), 2) + Math.pow((origin_vector.y - vector.y), 2) );
      
      return distance
}

const rotateVector = ( vector = { x: 100, y: 0}, origin = { x: 0, y: 0}, deg = 45 ) => {
  // returns new vector location after rotating a certain degrees
  const rad = (Math.PI / 180) * deg,
        cos = Math.cos( rad ),
        sin = Math.sin( rad ),
        distance = { x : vector.x - origin.x,
                     y : vector.y - origin.y },
        new_location = { x: ( cos * distance.x ) + ( sin * distance.y ) + origin.x,
                            y: ( cos * distance.y ) - ( sin * distance.x ) + origin.y };
  return new_location
}

const rotatePoint = ( point, origin, angle ) => {
  const rotate_vector = rotateVector( point, origin, angle );
  const pt_distance = point.getDistance( rotate_vector );
  
  const new_translate = {
    x: (pt_distance.x - point.transform.translate.x),
    y: (pt_distance.y - point.transform.translate.y)
  }
  
  translateSinglePoint( point, new_translate );
}

function rotateSinglePoint(point_object, origin_vector, angle) {

    // calculate new point location
    let radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    new_x = (cos * (point_object.x - origin_vector.x)) + (sin * (point_object.y - origin_vector.y)) + origin_vector.x,
    new_y = (cos * (point_object.y - origin_vector.y)) - (sin * (point_object.x - origin_vector.x)) + origin_vector.y;
    // update point
    console.log(new_x, new_y)
    // point_object.x = new_x;
    // point_object.y = new_y;
  }




// translate
/// new translate

const translateSinglePoint = ( point, vector ) => {
  point.transform.translate.x += vector.x;
  point.transform.translate.y += vector.y;
}




function translate(object, xy_vector){
	if(object.constructor !== Array){
    translateSinglePoint(object, xy_vector);
  }
  else {
    let p; // index
    const all_points = object.length-1;
    for (p = all_points; p >= 0; p--) {
      translateSinglePoint(object[p], xy_vector);
    }
  }

  function translateSinglePoint(point_object, xy_vector){
    point_object.x += xy_vector.x;
    point_object.y += xy_vector.y;
  }
}

function translate2(object, xy_vector){
  if(object.constructor !== Array){
    translateSinglePoint(object, xy_vector);
  }
  else {
    let p; // index
    const all_points = object.length-1;
    for (p = all_points; p >= 0; p--) {
      translateSinglePoint(object[p], xy_vector);
    }
  }

  function translateSinglePoint(point_object, xy_vector){
    point_object.modifiers.translate = xy_vector;
  }
}

function rotate(object, origin_vector, angle){
  if(object.constructor !== Array){
    rotateSinglePoint(object, origin_vector, angle);
  }
  else {
    let p; // index
    const all_points = object.length-1;
    for (p = all_points; p >= 0; p--) {
      rotateSinglePoint(object[p], origin_vector, angle);
    }
  }

  function rotateSinglePoint(point_object, origin_vector, angle) {

    // calculate new point location
    let radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    new_x = (cos * (point_object.x - origin_vector.x)) + (sin * (point_object.y - origin_vector.y)) + origin_vector.x,
    new_y = (cos * (point_object.y - origin_vector.y)) - (sin * (point_object.x - origin_vector.x)) + origin_vector.y;
    // update point
    point_object.x = new_x;
    point_object.y = new_y;
  }
}









function scale(object, origin_vector, scale){
  if(object.constructor !== Array){
    scaleSinglePoint(object, origin_vector, scale);
  }
  else {
    let p; // index
    const all_points = object.length-1;
    for (p = all_points; p >= 0; p--) {
      scaleSinglePoint(object[p], origin_vector, scale);
    }
  }

  function scaleSinglePoint(point_object, origin_vector, scale){
    const distance = point_object.getDistance(origin_vector);
    const current_radian = Math.acos(distance.x / distance.xy);
    point_object.x = origin_vector.x + Math.cos(current_radian)*(distance.xy * scale);
    point_object.y = ((point_object.y < 0) ? -1 : 1 ) * (origin_vector.y + Math.sin(current_radian)*(distance.xy * scale));
  }
}

function scaleSinglePoint2(point_object, origin_vector, scale){
    const distance = point_object.getDistance(origin_vector);
    const current_radian = Math.acos(distance.x / distance.xy);
    const deviant = {
      x: ( origin_vector.x + Math.cos(current_radian)*(distance.xy * scale) ) - point_object.x,
      y: ( ((point_object.y < 0) ? -1 : 1 ) * (origin_vector.y + Math.sin(current_radian)*(distance.xy * scale)) ) - point_object.y
    }
    // return { x: origin_vector.x + Math.cos(current_radian)*(distance.xy * scale),
    //          y: ((point_object.y < 0) ? -1 : 1 ) * (origin_vector.y + Math.sin(current_radian)*(distance.xy * scale))
    //        }
    return deviant
  }


class ModifierStack{
  constructor(){

  }

  addNoise(point_object, noise, bounding_box){
    const x = function(){
      noise.evaluate(point_object,bounding_box)
    }
    point_object.addModifier({noise}, x() )

  }
}

let Modifiers;
{
  class Noise{
    constructor(lattice_density, random_seed){
      this.density = lattice_density;
      this.points = [];

      // Feed a 32 bit hash based on a seed into a pseudo random number generator
      const rand = mulberry32( xmur3(random_seed)() );
      // create lattice/grid points on a scale of 0-1:
      let c;
      for (c = 0; c <= lattice_density; c++) { // gridsizes +1 to generate a point on both 0 and maximum
        const x_pos = getLinearInterpolation(c, 0, lattice_density, 0, 1);

        let r;
        for (r = 0; r <= lattice_density; r++){ // 2D involves a lattice of x and y coordinates
          const y_pos = getLinearInterpolation(r, 0, lattice_density, 0, 1);

          const lattice_pt = {x: x_pos, y: y_pos};
          // grid needs to be tile-able so the all the extremeties are the same as their mirrored counterpart
          if (c === lattice_density ) lattice_pt.value = this.points[r].value;
            else if (r === lattice_density) lattice_pt.value = this.points[this.points.length - lattice_density].value;
              else lattice_pt.value = rand();

          this.points.push(lattice_pt); // add points to grid
        }
      }
    }

    echo(){
      console.log(this);
    }

    evaluate(xy_vector, bounding_box){
      // finds the noise value at a xy_vector position
      
      // finding top left gridPt:
      // split bounding_box width to account for negative space IE: x: -100
      const half_layer_w = bounding_box.width/2,
            half_layer_h = bounding_box.height/2;

      // interpolate point position on the noise in terms of columns and rows     
      const location_x = getLinearInterpolation(xy_vector.x, -half_layer_w, half_layer_w, 0, noise.density),
            location_y = getLinearInterpolation(xy_vector.y, half_layer_h, -half_layer_h, 0, noise.density);

      // floor the number to get the column and row in an integer range of 0 to density
      const top_left_col = Math.floor(location_x),
            top_left_row = Math.floor(location_y);

      const top_left_ptnum = ( top_left_col * ( noise.density + 1 ) ) + top_left_row,
            bottom_left_ptnum = top_left_ptnum + 1,
            top_right_ptnum = top_left_ptnum + ( noise.density + 1 ),
            bottom_right_ptnum = top_right_ptnum + 1;

      const x_value_top =  getLinearInterpolation( location_x - Math.floor(location_x), 0, 1, noise.points[ top_left_ptnum ].value, noise.points[ top_right_ptnum ].value ),
            x_value_bottom = getLinearInterpolation( location_x - Math.floor(location_x), 0, 1, noise.points[ bottom_left_ptnum ].value, noise.points[ bottom_right_ptnum ].value ),
            y_value = getLinearInterpolation( location_y - Math.floor(location_y), 0, 1, x_value_top, x_value_bottom );
    
      return y_value
    }

    evaluateCosine(xy_vector, bounding_box){
      // finds the noise value at a xy_vector position
      
      // finding top left gridPt:
      // split bounding_box width to account for negative space IE: x: -100
      const half_layer_w = bounding_box.width/2,
            half_layer_h = bounding_box.height/2;

      // interpolate point position on the noise in terms of columns and rows     
      const location_x = getLinearInterpolation(xy_vector.x, -half_layer_w, half_layer_w, 0, noise.density),
            location_y = getLinearInterpolation(xy_vector.y, half_layer_h, -half_layer_h, 0, noise.density);

      // floor the number to get the column and row in an integer range of 0 to density
      const top_left_col = Math.floor(location_x),
            top_left_row = Math.floor(location_y);

      const top_left_ptnum = ( top_left_col * ( noise.density + 1 ) ) + top_left_row,
            bottom_left_ptnum = top_left_ptnum + 1,
            top_right_ptnum = top_left_ptnum + ( noise.density + 1 ),
            bottom_right_ptnum = top_right_ptnum + 1;

      const x_value_top =  getCosineInterpolation( location_x - Math.floor(location_x), 0, 1, noise.points[ top_left_ptnum ].value, noise.points[ top_right_ptnum ].value ),
            x_value_bottom = getCosineInterpolation( location_x - Math.floor(location_x), 0, 1, noise.points[ bottom_left_ptnum ].value, noise.points[ bottom_right_ptnum ].value ),
            y_value = getCosineInterpolation( location_y - Math.floor(location_y), 0, 1, x_value_top, x_value_bottom );
    
      return y_value
    }
  }

  Modifiers = class Modifiers{
    constructor(){

    }

    createValueNoise(lattice_density, random_seed){
      return new Noise(lattice_density, random_seed)
    }
  }
}










function showNoiseCircles(){
  let n;
  const all_points = noise.points.length;

  // console.log(all_points)

  const layer_size = (odin.current_layer.width >= odin.current_layer.height) ? odin.current_layer.width : odin.current_layer.height;

  for (n = 0; n < all_points; n++) {
    const config = {
            fill: true,
            fill_color: restcolors[ Math.floor( getLinearInterpolation( noise.points[n].value, 0, 1, 0, 4 ) )]
          };
    const xy_vector = { x: noise.points[n].x * layer_size,
                        y: noise.points[n].y * layer_size
                      };
    odin.current_layer.printCircle(xy_vector, 1 + noise.points[n].value * 10, config)
  }
}
