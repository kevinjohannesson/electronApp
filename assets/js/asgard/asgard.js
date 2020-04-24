/** @class */
class Asgard {
	constructor () {
    this.geometry = {
      points: [],
      edges: []
    }
	}

  // quicker reference to geometry objects:
  get points () { return this.geometry.points }
  get edges () { return this.geometry.edges }

  // insert a point in space:
  insertPoint ( vector = { x: 0, y: 0, z: 0, w: 1 } ) {
    // assert wether argument is a single vector or an array for multiple point insertion
    if ( vector.x || vector.x === 0 ) {
      // vector is a single vector, create single point: 
      const pt = new Point( vector );
      // add reference to point in parent geometry:
      this.points.push( pt );

      return pt
    } else if ( vector.constructor === Array ) {
      // passed argument is an array of vectors, create collection of points:
      const pt_collection = [],
            total_vectors = vector.length;
      let i;
      for ( i = 0; i < total_vectors; i++ ) {
        // pass every index of the array through this method as a single vector:
        pt_collection.push( this.insertPoint( vector[i] ) );
      }

      return pt_collection
    }
  }
}

class Point {
  constructor ( vector = { x: 0, y: 0 } ) {
    // set location in space:
    for( const key in vector ){
      this[ key ] = vector[ key ];
    }
  }
}


class vertex {
  constructor( point ){
    this.point = point;
    this.connected_edges = [];
  }



  generateNormal () {
    // give point a normal on account of it's location in space according to x0y0:
    // const distance = getVectorDistance ( { x: 0, y: 0 }, vector);

    // console.log( distance );

    console.log( this.location )
    const getMaxValue = ( val, val2 ) => { return Math.max( Math.abs( val ), Math.abs( val2) ) };
    const max_val = getMaxValue( this.location.x, this.location.y );
    
    this.normals = {
      x: (max_val) ? getLinearInterpolation( this.location.x, -max_val, max_val, -1, 1 ) : 0,
      y: (max_val) ? getLinearInterpolation( this.location.y, -max_val, max_val, -1, 1 ) : 0
    };
    console.log( round( this.normals.x, 3 ), round( this.normals.y, 3 ) );

  }
}

class edge {
  constructor() {

  }
}

// class Geometry extends Origin {
//   constructor ( vector, point ) {
//     super( vector );

//     this.points = [];
//     this.edges = [];
//   }
// }


// pt.generateNormal();

// const pt1 = new Point( {x: -100, y: 400 } )
// pt1.generateNormal();

// const pt2 = new Point( { x: -300, y: -372 } );
// pt2.generateNormal();

// const pt3 = new Point( { x: 244, y: -98 } );
// pt3.generateNormal();
// const geo = new Geometry( {x: 130, y: 310}, pt )

// console.log(geo)