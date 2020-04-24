var dataURL = odin.current_layer.canvas.toDataURL('image/png');

let base64Image = dataURL.split(';base64,').pop();

console.log(base64Image)


// fs.writeFile('image.png', base64Image, {encoding: 'base64'}, function(err) {
//     console.log('File created');
// });
var bitmap = new Buffer(base64Image, 'base64');

setTimeout(function(){
//   fs.writeFile('image.png', bitmap, {encoding: 'base64'}, function(err) {
//     console.log('File created');
// });

 fs.writeFileSync("example.jpg", bitmap);   
}, 1000)



  create_2(type){

      function convertToVector(input){
        // function converts [0,0] array in {x: 0, y: 0} 
        // does nothing if argument already correct:
        function convertVector(vector){
          vector = { x: vector[0], y: vector[1] };

          return vector
        }
        if(input.constructor === Array){
          // argument is either a [0,0] type vector or a list of vectors
          if(typeof(input[0]) === 'number'){
            // argument is a [0,0] type vector 

            return convertVector(input);
          } else {
            // argument is an array of vectors:
            let xy_vector_collection = [];
            for (let v = 0; v < input.length; v++) {
              xy_vector_collection.push( convertToVector(input[v]) );
            }

            return xy_vector_collection
          }
        } else if(typeof(input) === 'object'){
            // argument is a {x: 0, y: 0} type vector: 
            if((input.x || input.x === 0)&& (input.y || input.y === 0)){
              // vector is already valid

              return input;  
            }
          }
      }


      function createRectangle(xy_vector) {
        xy_vector = convertToVector(xy_vector);
        return (second_arg) => {
          if(typeof(second_arg) === 'number'){
            let rectangle_rib_length = second_arg;
            // second argument is NOT a coordinate, so it is assumed to be a rib length
            return (config_arg) => {
              // create rectangle from a centerpoint:
              let rectangle = new Shapes
              return third_arg + xy_vector.x
            }
          }
        }
      }
      function created_object(first_arg) {
        return (from_origin) => {
          return (third_argument) => {
            return first_arg + from_origin + third_argument
          }
        }
      }
      console.log( createRectangle([0,0])(50)('third') )
      return created_object('aapje')('gayboi')('third')
    } 
    create(){

      function convertToVector(input){
        // function converts [0,0] array in {x: 0, y: 0} 
        // does nothing if argument already correct:
        function convertVector(vector){
          vector = { x: vector[0], y: vector[1] };

          return vector
        }
        if(input.constructor === Array){
          // argument is either a [0,0] type vector or a list of vectors
          if(typeof(input[0]) === 'number'){
            // argument is a [0,0] type vector 

            return convertVector(input);
          } else {
            // argument is an array of vectors:
            let xy_vector_collection = [];
            for (let v = 0; v < input.length; v++) {
              xy_vector_collection.push( convertToVector(input[v]) );
            }

            return xy_vector_collection
          }
        } else if(typeof(input) === 'object'){
            // argument is a {x: 0, y: 0} type vector: 
            if((input.x || input.x === 0)&& (input.y || input.y === 0)){
              // vector is already valid

              return input;  
            }
          }
      }

      switch(arguments[0]){
        case 'point': {
          let xy_vector = arguments[1];
          xy_vector = convertToVector(arguments[1]);

          return this.insert.geometry.point.call(this, xy_vector);
          break;
        }
        case 'edge': {
          let point_object_a = arguments[1], 
              point_object_b = arguments[2];
          return this.insert.geometry.edge.call(this, point_object_a, point_object_b)
          break;
        }
        case 'polyline':{
          let poly_line_start_xy_vector = convertToVector(arguments[1]),
              poly_line_end_xy_vector = convertToVector(arguments[2]),
              config = arguments[3];
          return this.insert.object.polyline.call(this, poly_line_start_xy_vector, poly_line_end_xy_vector, config);
          break;
        }
        case 'polygon':{
        let polygon_origin_xy_vector = convertToVector(arguments[1]),
            polygon_radius = arguments[2],
            polygon_segments = arguments[3],
            config = arguments[4];
            console.log(polygon_origin_xy_vector, polygon_radius, polygon_segments);
        return this.insert.object.polygon.call(this, polygon_origin_xy_vector, polygon_radius, polygon_segments, config);
        break;
        }
        case 'rectangle':{

          function multiply(a) {
    return (b) => {
        return (c) => {
            return a + b + c
        }
    }
}
        const rectangle = new Shape_Rectangle();
        // rectangle.create('from_center')('aapje')('duif');
        console.log( multiply('from_center')('aapje')('duif')  )
        return rectangle;
        break;
        }
      }
    }
    insert = {
      geometry: {
        point: function createPoint(xy_vector){
          if(xy_vector.constructor === Array){
            // for multiple vectors at once, argument is an array of vectors
            let point_collection = [];
            for (let v = 0; v < xy_vector.length; v++) {
              point_collection.push( createPoint.call(this, xy_vector[v]) );
            }

            return point_collection;
          } else {
              // for single vector argument
              if(xy_vector === undefined) xy_vector = {x: 0, y: 0};
              const point = new Point(xy_vector);
              this.geometry.points.push(point);
              // point.echo();
              
              return point
            }
        },

        edge: function create_edge(point_object_a, point_object_b){ 
          const edge = new Edge(point_object_a, point_object_b);
          this.geometry.edges.push(edge);
          // edge.echo();

          return edge
        }
      },


      object: {
        polyline: function(line_start_xy_vector, line_end_xy_vector, config){
          // create a line from one vector to the other, optionally divided into segments
          config = { line_segments: 1, create_edges: true };
          // check if there is a configuration:
          if(arguments[2]){
            let config_object = arguments[2];
            // update config if config is passed
            for( const property in config_object){
              config[property] = config_object[property];
            }
          }
          let point_collection = [];
          // create points:
          for (let s = 0; s <= config.line_segments; s++) {
            let line_segment_xy_vector = {
              // use linear interpolation to find point position
              x : map(s, 0, config.line_segments, line_start_xy_vector.x, line_end_xy_vector.x),
              y : map(s, 0, config.line_segments, line_start_xy_vector.y, line_end_xy_vector.y)
            }
            // create point at linear interpolated location:
            let line_segment_point = this.create('point', line_segment_xy_vector);
            // store points in object:
             point_collection.push(line_segment_point)
          }
          // create edges:
          if(config.create_edges){
            for (let e = 0; e < point_collection.length-1; e++){
              let point_object_a = point_collection[e];
              let point_object_b = point_collection[e+1];
              let edge = this.create('edge', point_object_a, point_object_b)
            }
          }

          return point_collection
        },
        polygon: function(polygon_origin_xy_vector, polygon_radius, polygon_segments, config){
          // set default config
          config = { create_edges: true };

          let point_collection = [];
          if(arguments[3]){
            let config_object = arguments[3];
            // update config if config is passed
            for( const property in config_object){
              config[property] = config_object[property];
            }
          }
          // create points:
          for(let s = 0; s < polygon_segments; s++){
            // linear interpolate the current radians per segment
            let current_radian = map(s, 0, polygon_segments, 0, Math.PI*2); 
            let point_xy_vector = {
              x: polygon_origin_xy_vector.x + Math.cos(current_radian)*polygon_radius, 
              y: polygon_origin_xy_vector.y + Math.sin(current_radian)*polygon_radius
            }
            let point = this.create('point', point_xy_vector)
            point_collection.push(point);
          }
          
          if(config.create_edges){
            // create edges:
            for(let e = 0; e < point_collection.length; e++){
              let edge = (e!=0) ? this.create('edge', point_collection[e-1], point_collection[e]) : false;
            }
            // create final edge to close shape:
            let edge = this.create('edge', point_collection[point_collection.length-1], point_collection[0]);
          }
          return point_collection
        },
        test: f => {

          return n => (f * n);
          // const aux = (n, xs) =>
          //   n === 0 ? f (...xs) : x => aux (n - 1, [...xs, x])
          // return aux (f.length, [])
        },
        rectangle: function(type){
          

          return (rectangle_origin_xy_vector) => {
            return (rectangle_rib_length) => {
              return ()=>{
                return 8
              }
            }
          }

          // // store the default config:
          // config = { create_edges: true};
          // if(arguments[2]){
          //   let config_object = arguments[2];
          //   // update config if config is passed
          //   for( const property in config_object){
          //     config[property] = config_object[property];
          //   }
          // }

          // if(typeof(arguments[2]) === 'number'){
          //   // create square from it's centerpoint
          //   // creating vectors for the corners
          //   let rectangle_top_left_xy_vector = {
          //     x: rectangle_origin.x - (rectangle_rib_length/2),
          //     y: rectangle_origin.y + (rectangle_rib_length/2)
          //   },
          //   rectangle_bottom_left_xy_vector = {
          //     x: rectangle_origin.x - (rectangle_rib_length/2),
          //     y: rectangle_origin.y - (rectangle_rib_length/2)
          //   },
          //   rectangle_bottom_right_xy_vector = {
          //     x: rectangle_origin.x + (rectangle_rib_length/2),
          //     y: rectangle_origin.y - (rectangle_rib_length/2)
          //   },
          //   rectangle_top_right_xy_vector = {
          //     x: rectangle_origin.x + (rectangle_rib_length/2),
          //     y: rectangle_origin.y + (rectangle_rib_length/2)
          //   };

          //   // group vectors for easier workflow and readability
          //   let xy_vector_collection = [
          //     rectangle_top_left_xy_vector,
          //     rectangle_bottom_left_xy_vector,
          //     rectangle_bottom_right_xy_vector,
          //     rectangle_top_right_xy_vector
          //   ];

          //   // this.create('point')
          // }
          // // creating a square shape from it's centerpoint
        
        
        
        }
      }
    }

    evaluate = {
      pointDistance: function(point_object_start, point_object_end){
        let distance = {};
        // calculation is to see if the distance is going in the negative or positive direction for both x and y
        distance.x = ( (point_object_end.x < point_object_start.x) ? -1 : 1 ) * Math.sqrt( Math.pow((point_object_start.x - point_object_end.x), 2) );
        distance.y = ( (point_object_end.y < point_object_start.y) ? -1 : 1 ) * Math.sqrt( Math.pow((point_object_start.y - point_object_end.y), 2) );
        if(distance.x == -0) distance.x = 0;
        if(distance.y == -0) distance.y = 0;
        distance.xy = Math.sqrt( Math.pow((point_object_start.x - point_object_end.x), 2) + Math.pow((point_object_start.y - point_object_end.y), 2) );
        
        return distance;
      }
    }

    createShape()
      {
        console.log(arguments)
        // get type of object to create:
        let object = arguments[0];
        // call functions to create object:
        switch(object){
          case 'polygon':
            console.log('polygon');

            break;
        }
        
      }
    createObject(object_type, 
      // line:
      line_start_xy_vector, 
      line_end_xy_vector,
      // polygon: 
      polygon_origin,
      polygon_radius,
      polygon_segments,
      // rectangle
      rectangle_top_left_xy_vector,
      rectangle_bottom_right_xy_vector,
      rectangle_origin,
      rectangle_rib_length,

      // general:
      config){
      console.log(arguments)
      let point_collection = [];
      switch(object_type){
        case 'polyline':
        // create a line from one vector to the other, optionally divided into segments
        line_start_xy_vector = arguments[1];
        line_end_xy_vector = arguments[2];
        let line_segments = 1,
            edges = true;
      
        
        // check if there is a configuration:
        if(arguments[3]){
          config = arguments[3];
          // divide polyline into optional sections:
          if(config.segments){
            line_segments = parseInt(config.segments);
          }
          // optionally turn off default edges
          if(config.edges){
            line_edges = config.edges
          }
        }
        // create points:
        for (let s = 0; s <= line_segments; s++) {
          let line_segment_xy_vector = {
            // use linear interpolation to find point position
            x : map(s, 0, line_segments, line_start_xy_vector.x, line_end_xy_vector.x),
            y : map(s, 0, line_segments, line_start_xy_vector.y, line_end_xy_vector.y)
          }
          // create point at linear interpolated location:
          let line_segment_point = this.createPoint(line_segment_xy_vector);
          // store points in object:
           point_collection.push(line_segment_point)
        }
        // create edges:
        if(edges){
          for (let e = 0; e < point_collection.length-1; e++){
            let point_object_a = point_collection[e];
            let point_object_b = point_collection[e+1];
            let edge = this.createEdge(point_object_a, point_object_b)
          }
        }

        break;
      case 'polygon':

        polygon_origin = arguments[1];
        polygon_radius = arguments[2];
        polygon_segments = arguments[3];
        // create points:
        for(let s = 0; s < polygon_segments; s++){
          // linear interpolate the current radians per segment
          let current_radian = map(s, 0, polygon_segments, 0, Math.PI*2); 
          let point = this.createPoint({x: polygon_origin.x + Math.cos(current_radian)*polygon_radius, y: polygon_origin.y + Math.sin(current_radian)*polygon_radius}, 0);
          point_collection.push(point);
        }
        // create edges:
        for(let e = 0; e < point_collection.length; e++){
          let edge = (e!=0) ? this.createEdge(point_collection[e-1], point_collection[e]) : false;
        }
        // create final edge to close shape:
        let edge = this.createEdge(point_collection[point_collection.length-1], point_collection[0]);
        break;
      case 'rectangle':
        // creating a square shape from it's centerpoint
        // store the default config:
        config = { create_edges: true};
        // allocating arguments to the correct variables
        rectangle_origin = arguments[1];
        rectangle_rib_length = arguments[2];
        // creating vectors for the corners
        rectangle_top_left_xy_vector = {
          x: rectangle_origin.x - (rectangle_rib_length/2),
          y: rectangle_origin.y + (rectangle_rib_length/2)
        };
        let rectangle_bottom_left_xy_vector = {
          x: rectangle_origin.x - (rectangle_rib_length/2),
          y: rectangle_origin.y - (rectangle_rib_length/2)
        };
        rectangle_bottom_right_xy_vector = {
          x: rectangle_origin.x + (rectangle_rib_length/2),
          y: rectangle_origin.y - (rectangle_rib_length/2)
        };
        let rectangle_top_right_xy_vector = {
          x: rectangle_origin.x + (rectangle_rib_length/2),
          y: rectangle_origin.y + (rectangle_rib_length/2)
        };

        // group vectors for easier workflow and readability
        let xy_vector_collection = [
          rectangle_top_left_xy_vector,
          rectangle_bottom_left_xy_vector,
          rectangle_bottom_right_xy_vector,
          rectangle_top_right_xy_vector
        ];

        // create set of points with the vectors:
        point_collection = this.createPoint(xy_vector_collection);

        // add to this geometry property
        this.geometry.points.concat( point_collection );

        // create edges yes or no:
        // check for config
        if(arguments[3]){
          config = arguments[3];
          if(!config.create_edges){

          }
        }
        
        break;
      }

      return point_collection
    }
  }
}


































 create_2(type){

      function convertToVector(input){
        // function converts [0,0] array in {x: 0, y: 0} 
        // does nothing if argument already correct:
        function convertVector(vector){
          vector = { x: vector[0], y: vector[1] };

          return vector
        }
        if(input.constructor === Array){
          // argument is either a [0,0] type vector or a list of vectors
          if(typeof(input[0]) === 'number'){
            // argument is a [0,0] type vector 

            return convertVector(input);
          } else {
            // argument is an array of vectors:
            let xy_vector_collection = [];
            for (let v = 0; v < input.length; v++) {
              xy_vector_collection.push( convertToVector(input[v]) );
            }

            return xy_vector_collection
          }
        } else if(typeof(input) === 'object'){
            // argument is a {x: 0, y: 0} type vector: 
            if((input.x || input.x === 0)&& (input.y || input.y === 0)){
              // vector is already valid

              return input;  
            }
          }
      }


      function createRectangle(xy_vector) {
        xy_vector = convertToVector(xy_vector);
        return (second_arg) => {
          if(typeof(second_arg) === 'number'){
            let rectangle_rib_length = second_arg;
            // second argument is NOT a coordinate, so it is assumed to be a rib length
            return (config_arg) => {
              // create rectangle from a centerpoint:
              let rectangle = new Shapes
              return third_arg + xy_vector.x
            }
          }
        }
      }
      function created_object(first_arg) {
        return (from_origin) => {
          return (third_argument) => {
            return first_arg + from_origin + third_argument
          }
        }
      }
      console.log( createRectangle([0,0])(50)('third') )
      return created_object('aapje')('gayboi')('third')
    } 