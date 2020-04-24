// new 2D world object
let Asgard;
{  
  class Point {
    constructor( xy_vector = { x: 0, y: 0 } ) { 
        this.location = {
          x: xy_vector.x,
          y: xy_vector.y
        }

        this.transform ={ 
          translate: { x: 0, y: 0 },
          rotate: { z: 0 },
          scale: { u: 1, v: 1 }
        }

        this.modifiers = {
          //
        }
      }

    echo(){
      console.log(this);
    }

    getLocation( axis = 'x' ){
      let a = this.location[axis];
      a += this.transform.translate[axis]
      for (const property in this.modifiers) {
        a += this.modifiers[property][axis];
      }
      return a;
    }

    get x(){
      return this.getLocation('x');
    }

    get y(){
      return this.getLocation('y');
    }

    getDistance( vector = { x: 0, y: 0 } ){ 
      return getVectorDistance(this.location, vector);
    }

    addModifier(modifier_name, xy_vector){
      // adds a modifier to the stack
      while(this.modifiers.hasOwnProperty(modifier_name)) modifier_name += 1;
      this.modifiers[modifier_name] = xy_vector;

      return modifier_name
    }

    removeModifier(modifier_name){
      delete this.modifiers[modifier_name];
    }
  }

  class Edge {
    constructor(point_object_a, point_object_b){
      this.points = [];
      this.points.push(point_object_a);
      this.points.push(point_object_b);
    }
    echo(){
      console.log(this);
    }
  }

  Asgard = class Asgard {
    constructor() {
      this.geometry = {
        points : [],
        edges : []
      }

      this.obj_list = [];
    }

    get_xy_vector(xy_locations){
      // function converts [0,0] array and (arg, arg2) in {x: 0, y: 0} vector
      // does nothing if argument already correct:

      // arguments are considered to be (x, y) type input
      if(arguments[1] || arguments[1] === 0) return {x: arguments[0], y: arguments[1]}
      // argument is either a [0,0] type vector or a list of vectors
      else if(xy_locations.constructor === Array){
        // argument is considered a [0,0] type vector input:
        if(typeof(xy_locations[0]) === 'number') return {x: xy_locations[0], y: xy_locations[1]}    
        // argument is an array of vectors:
        else {
          const xy_vector_collection = [];
          let v;
          const total_vectors = xy_locations.length;
          for (v = 0; v < total_vectors; v++) {
            xy_vector_collection.push( this.get_xy_vector(xy_locations[v]) );
          }

          return xy_vector_collection
        }
      } 
      // argument is a {x: 0, y: 0} type vector: 
      // argument is already valid:
      else if( typeof(xy_locations) === 'object' && 
               (xy_locations.x || xy_locations.x === 0 || xy_locations.x === -0) && 
               (xy_locations.y || xy_locations.y === 0 || xy_locations.y === -0) ) return xy_locations
    }

    get_options = (default_options, config)=>{
        // set default options:
        let options = default_options;
        if(config){
          // update options if config object is passed as second arg
          for( const property in config){
            options[property] = config[property];
          }
        }

        return options
      }

    //// primitives/////

    insertPoint( xy_vector = { x: 0, y: 0 } ){
      // check if argument is an array or a single vector:
      if(xy_vector.constructor === Array){
        // for multiple vectors at once, argument is an array of vectors
        const point_collection = [];
        const array_length = xy_vector.length;
        let v;
        for (v = 0; v < array_length; v++) {
          point_collection.push( this.insertPoint(xy_vector[v]) );
        }

        return point_collection;
      } else {
          // for single vector argument
          const point = new Point(xy_vector);
          this.geometry.points.push(point);
          
          return point
        }
    }

    insertEdge( pt_a = this.insertPoint(), pt_b = this.insertPoint( { x: 100, y: 100 } ) ){ 
      const edge = new Edge(pt_a, pt_b);
      this.geometry.edges.push(edge);

      return edge
    }

    insertObject(xy_vector_collection, edges = true, closed_shape = false){

      // create the points:
      const points = this.insertPoint( xy_vector_collection );
      // store the collection for later reference:
      this.obj_list.push(points);

      const total_points = points.length;
      if(edges){
        
        let pt;
        for(pt = 0; pt < total_points; pt++){
          const edge = (pt != 0) ? this.insertEdge( points[pt-1], points[pt] ) : false;
        }
      }
      if(closed_shape){
        const closing_edge = this.insertEdge(points[total_points-1], points[0]);
      } 
      
      return points
    }

    //// grids /////
    // point arrays in lattices/grids in different shapes:
    grid = {
      parent : this,

      diamond(iterations = 5, point_spread = 50, reverse){
        const point_collection = [];
        const total_length = ( iterations - 1 ) * point_spread;
        let h;
        for (h = 0; h < iterations; h++) {
          let v;
          for (v = 0; v < iterations; v++) {
            const x_pos = ( reverse === true  || reverse === 'horizontal' )
                          ? total_length - ( h * point_spread + v * point_spread) 
                          : -total_length + ( h * point_spread + v * point_spread);
            const y_pos = ( reverse === true  || reverse === 'vertical' ) 
                          ? h * point_spread - v * point_spread 
                          : -h * point_spread + v * point_spread;
            point_collection.push( this.parent.insertPoint( xy( x_pos, y_pos) ) );
          }
        }

        return point_collection
      },

      horizontal(points_h = 10, points_v = 10, point_spread = 50, reverse){
        // generates a set of points on a lattice 
        // horizontal points first
        const point_collection = [];
        const half_total_width = ( ( points_h-1 ) * point_spread ) / 2;
        const half_total_height = ( ( points_v-1 ) * point_spread ) / 2;
        let v;
        for (v = 0; v < points_v; v++) {
          const y_pos = ( reverse === true  || reverse === 'vertical' ) 
                        ? half_total_height-(v*point_spread) 
                        : -half_total_height+(v*point_spread);
          let h;
          for (h = 0; h < points_h; h++) {
            const x_pos = ( reverse === true || reverse === 'horizontal' ) 
                          ? half_total_width-(h*point_spread) 
                          : -half_total_width+(h*point_spread);
            point_collection.push( this.parent.insertPoint( xy( x_pos, y_pos) ) );
          }     
        }

        return point_collection
      },

      vertical(points_h = 10, points_v = 10, point_spread = 50, reverse){
        // generates a set of points on a lattice 
        // vertical points first
        const point_collection = [];
        const half_total_width = ( ( points_h-1 ) * point_spread ) / 2;
        const half_total_height = ( ( points_v-1 ) * point_spread ) / 2;
        let h;
        for (h = 0; h < points_h; h++) {
          const x_pos = ( reverse === true || reverse === 'horizontal' ) 
                          ? half_total_width-(h*point_spread) 
                          : -half_total_width+(h*point_spread);
          let v;
          for (v = 0; v < points_v; v++) {  
            const y_pos = ( reverse === true  || reverse === 'vertical' ) 
                        ? half_total_height-(v*point_spread) 
                        : -half_total_height+(v*point_spread);
            point_collection.push( this.parent.insertPoint( xy( x_pos, y_pos) ) );
          }
        }

        return point_collection
      }
    }
    


    //// shapes ///////
    shape = {
      parent: this,

      polyline(
        start = { x: 0, y: 0 }, 
        end = { x: 100, y: 100 }, 
        config )
      {
        // creates a set of points on a line, default with connecting edges
        const default_options = { line_segments: 5, create_edges: true, reverse: false},
              options = this.parent.get_options(default_options, config);
        if( options.reverse ) [ start, end ] = [ end, start ];
        const vectors = [];
        let s;
        const total_segments = options.line_segments;
        for( s = 0; s <= total_segments; s++ ) {
          const segment_loc = {
            x : getLinearInterpolation(s, 0, total_segments, start.x, end.x),
            y : getLinearInterpolation(s, 0, total_segments, start.y, end.y)
          }
           vectors.push(segment_loc)
        }
        return this.parent.insertObject(vectors, options.create_edges)
      },

      polygon( origin_xy_vector = { x: 0, y: 0 }, radius = 150, segments = 32, config ) {
        const default_options = { create_edges: true },
              options = this.parent.get_options(default_options, config);

        const xy_vector_collection = [];

        let s;
        for( s = 0; s < segments; s++ ){
          // linear interpolate the current radians per segment:
          const current_radian = getLinearInterpolation(s, 0, segments, 0, Math.PI*2);
          // creating vectors at current radian at radius length: 
          const xy_vector = {
                  x: origin_xy_vector.x + Math.cos(current_radian)*radius, 
                  y: origin_xy_vector.y + Math.sin(current_radian)*radius
                };
          xy_vector_collection.push(xy_vector);
        }
        // create the shape
        return this.parent.insertObject(xy_vector_collection, options.create_edges, 'closed')
      },

      square(origin_xy_vector = { x: 0, y: 0 }, rib_length = 150, config){
        const default_options = { create_edges: true },
              options = this.parent.get_options(default_options, config);
            
        // creating vectors for the corners
        const top_left_xy_vector = {
                x: origin_xy_vector.x - (rib_length/2),
                y: origin_xy_vector.y + (rib_length/2)
              },
              bottom_left_xy_vector = {
                x: origin_xy_vector.x - (rib_length/2),
                y: origin_xy_vector.y - (rib_length/2)
              },
              bottom_right_xy_vector = {
                x: origin_xy_vector.x + (rib_length/2),
                y: origin_xy_vector.y - (rib_length/2)
              },
              top_right_xy_vector = {
                x: origin_xy_vector.x + (rib_length/2),
                y: origin_xy_vector.y + (rib_length/2)
              };
        // storing the vectors as an array
        const vectors = [ 
                top_left_xy_vector, 
                bottom_left_xy_vector, 
                bottom_right_xy_vector,
                top_right_xy_vector
              ];
        // create the shape
        return this.parent.insertObject(vectors, options.create_edges, 'closed')    
      },

      rectangle(top_left_xy_vector = { x: -150, y: -150 }, bottom_right_xy_vector = { x: 150, y: 150 }, config){
        const default_options = { create_edges: true },
              options = this.parent.get_options(default_options, config);
        // creating vectors for the other corners
        const bottom_left_xy_vector = {
                x: top_left_xy_vector.x,
                y: bottom_right_xy_vector.y
              },
              top_right_xy_vector = {
                x: bottom_right_xy_vector.x,
                y: top_left_xy_vector.y
              };
        // storing the vectors as an array
        const vectors = [ 
                top_left_xy_vector, 
                bottom_left_xy_vector, 
                bottom_right_xy_vector,
                top_right_xy_vector
              ];  
        // create the shape
        return this.parent.insertObject(vectors, options.create_edges, 'closed')
      },

      triangle(origin_xy_vector = { x: 0, y: 0 }, rib_length = 150, config){
        const default_options = { create_edges: true },
              options = this.parent.get_options(default_options, config);
        // calculate triangle height with known variables: hypothenuse (rib_length) and short leg (rib_length/2)
        const height = Math.sqrt( Math.pow( rib_length, 2) - Math.pow( (rib_length / 2), 2) );
        // triangle midpoint is 1/3 of height
        // create vectors for the corners
        const xy_vector_top = {
                x: origin_xy_vector.x,
                y: origin_xy_vector.y + ( (height / 3) * 2 )
              },
              xy_vector_bottom_left = {
                x: origin_xy_vector.x - (rib_length / 2),
                y: origin_xy_vector.y - (height / 3)
              },
              xy_vector_bottom_right = {
                x: origin_xy_vector.x + (rib_length / 2),
                y: origin_xy_vector.y - (height / 3)
              };
        // store the vectors in an array
        const vectors = [
                xy_vector_top,
                xy_vector_bottom_left,
                xy_vector_bottom_right
              ];
        
        return this.parent.insertObject(vectors, options.create_edges, 'closed')
      },

      star(origin = { x: 0, y: 0 }, inner_radius = 100, outer_radius = 150, points = 32, config){
        const default_options = { create_edges: true },
              options = this.parent.get_options(default_options, config);

        const vectors = [],
              all_points = points * 2;
        let s;
        let radius;
        for( s = 0; s < all_points; s++ ){
          // linear interpolate the current radians per segment:
          const current_radian = getLinearInterpolation(s, 0, all_points, 0, Math.PI*2);
          // simple switching between inner and outer radius
          if( s % 2 === 0 ) radius = inner_radius; 
          else radius = outer_radius;
          // creating vectors at current radian at radius length: 
          const xy_vector = {
                  x: origin.x + Math.cos( current_radian )*radius, 
                  y: origin.y + Math.sin( current_radian )*radius
                };
          vectors.push(xy_vector);
        }
        // create the shape
        return this.parent.insertObject(vectors, options.create_edges, 'closed')
      }
    }
  }
}

