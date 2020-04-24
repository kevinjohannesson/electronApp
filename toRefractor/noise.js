function createValueNoise(lattice_density, random_seed){
  const noise = [];
  // Feed a 32 bit hash based on a seed into a pseudo random number generator
  const rand = mulberry32( xmur3( random_seed ? random_seed :'kevin' )() );
  // create lattice/grid points on a scale of 0-1:
  let c;
  for (c = 0; c <= lattice_density; c++) { // gridsizes +1 to generate a point on both 0 and maximum
    const x_pos = kvn.getLinearInterpolation(c, 0, lattice_density, 0, 1);

    let r;
    for (r = 0; r <= lattice_density; r++){ // 2D involves a lattice of x and y coordinates
      const y_pos = kvn.getLinearInterpolation(r, 0, lattice_density, 0, 1);

      const grid_pt = {x: x_pos, y: y_pos};
      // grid needs to be tile-able so the all the extremeties are the same as their mirrored counterpart
      if (c === lattice_density ) grid_pt.value = noise[r].value;
        else if (r === lattice_density) grid_pt.value = noise[noise.length - lattice_density].value;
          else grid_pt.value = rand();

      noise.push(grid_pt); // add points to grid
    }
  }

  return noise
}

function evaluateValueNoise(noise, layer, xy_vector_to_evaluate) {
  // finds the noise value at a xy_vector position
  console.log( Math.sqrt(noise.length)-1 )
  // let location = [];
  // location.x = map(x, 0, noise.width, 0, noise.columns);
  // location.y = map(y, 0, noise.height, 0, noise.rows);

  // //console.log(location);
  // //
  // //console.log(noise.columns*Math.floor(location.x) + Math.floor(location.x) + Math.floor(location.y));

  // // finding top left gridPt:
  // let topLeftGridPt = noise.columns*Math.floor(location.x) + Math.floor(location.x) + Math.floor(location.y);
  // // //console.log( ( noise.rows * Math.floor(location.x) ) + ( noise.columns *  Math.floor(location.y) ) );

  // // retrieving values for the 4 grid points around the requested point to create
  // // a cell around the point.
  // let topLeftGridPtValue = noise.grid[ topLeftGridPt ].value;
  // let bottomLeftGridPtValue = noise.grid[ topLeftGridPt + 1 ].value;
  // let topRightGridPtValue = noise.grid[ topLeftGridPt + 1 + noise.columns ].value;
  // let bottomRightGridPtValue = noise.grid[ topLeftGridPt + 1 + noise.columns + 1 ].value;
  // //
}



// function createValueNoise(layer, columns, rows, random_seed){
//   const noise = {
//     total_columns: columns,
//     total_rows: rows,
//     gridpoints: []
//   }
//   // Feed a 32 bit hash based on a seed into a pseudo random number generator
//   const rand = mulberry32( xmur3( random_seed)() );

//   // create lattice/grid points
//   let c;
//   const all_columns = columns+1;
//   for (c = 0; c < all_columns; c++) { // gridsizes +1 to generate a point on both 0 and maximum
//     const x_pos = layer.width / columns * c;

//     let r;
//     const all_rows = rows+1;
//     for (r = 0; r < all_rows; r++){ // 2D involves a lattice of x and y coordinates

//       const y_pos = layer.height / rows * r;

//       const grid_pt = {x: x_pos, y: y_pos};

//       if (c === columns ) grid_pt.value = noise.gridpoints[r].value;
//         else if (r === rows) grid_pt.value = noise.gridpoints[noise.gridpoints.length - rows].value;
//           else grid_pt.value = rand();

//       noise.gridpoints.push(grid_pt); // add points to grid
//     }
//   }

//   return noise
// }






function evaluateValueNoise2DLinear(x, y, noise, offset) {
  if (offset === undefined) offset = 0;

  //console.log(x);
  //console.log(y);

  x = canvas.width/2 + x;

  if (y < 0) y = canvas.height/2 + Math.abs(y);
    else y = canvas.height/2 - y;


  //console.log(x);
  //console.log(y);

  let limit = [];
  limit.x = noise.width;
  limit.y = noise.height;

  if (x == limit.x) x = 0;

  x = x + offset;
  y = y + offset;

  if (x == limit.x || x > limit.x) x = x % limit.x;

  if (y == limit.y || y > limit.y) y = y % limit.y

  let result;

  let location = [];
  location.x = map(x, 0, noise.width, 0, noise.columns);
  location.y = map(y, 0, noise.height, 0, noise.rows);

  //console.log(location);
  //
  //console.log(noise.columns*Math.floor(location.x) + Math.floor(location.x) + Math.floor(location.y));

  // finding top left gridPt:
  let topLeftGridPt = noise.columns*Math.floor(location.x) + Math.floor(location.x) + Math.floor(location.y);
  // //console.log( ( noise.rows * Math.floor(location.x) ) + ( noise.columns *  Math.floor(location.y) ) );

  // retrieving values for the 4 grid points around the requested point to create
  // a cell around the point.
  let topLeftGridPtValue = noise.grid[ topLeftGridPt ].value;
  let bottomLeftGridPtValue = noise.grid[ topLeftGridPt + 1 ].value;
  let topRightGridPtValue = noise.grid[ topLeftGridPt + 1 + noise.columns ].value;
  let bottomRightGridPtValue = noise.grid[ topLeftGridPt + 1 + noise.columns + 1 ].value;
  // //
  //console.log(topLeftGridPtValue, bottomLeftGridPtValue, topRightGridPtValue, bottomRightGridPtValue);
  //
  // extrapolating point's value based on relative x Location in cell, top side
  let xValue1 = map( (location.x - Math.floor(location.x)), 0, 1, topLeftGridPtValue, topRightGridPtValue );
  //console.log(xValue1);

  // extrapolating point's value based on relative x Location in cell, bottom side
  let xValue2 = map( (location.x - Math.floor(location.x)), 0, 1, bottomLeftGridPtValue, bottomRightGridPtValue );
  //console.log(xValue2);

  // extrapolating the final value based on the previous value's
  let value = map( (location.y - Math.floor(location.y)), 0, 1, xValue1, xValue2);

  //console.log(value)

  // c.beginPath();
  // c.strokeStyle = "rgba(255, 50, 50, 0.75)";
  // c.arc(x, y, value*5, 0, 2 * Math.PI);
  // c.stroke();
  //
  // //
  // c.beginPath();
  // c.strokeStyle = "rgba(255, 50, 50, 0.75)";
  // c.arc(noise.grid[ topLeftGridPt ].x, noise.grid[ topLeftGridPt ].y, 10, 0, 2 * Math.PI);
  // c.arc(noise.grid[ topLeftGridPt  + 1 ].x, noise.grid[ topLeftGridPt  + 1 ].y, 10, 0, 2 * Math.PI);
  // c.arc(noise.grid[ topLeftGridPt  + 1 + noise.columns ].x, noise.grid[ topLeftGridPt  + 1 + noise.columns ].y, 10, 0, 2 * Math.PI);
  // c.arc(noise.grid[ topLeftGridPt  + 1 + noise.columns + 1 ].x, noise.grid[ topLeftGridPt  + 1 + noise.columns + 1 ].y, 10, 0, 2 * Math.PI);
  // c.stroke();

  return value;
}

































function ValueNoise2D(columns, rows, randomSeed){
  this.width = canvas.width;
  this.height = canvas.height;

  this.columns = columns;
  this.rows = rows;

  this.grid = [];

  randomSeed = xmur3(randomSeed);
  let rand = mulberry32(randomSeed());

  // create points based on the gridsize
  for (let i = 0; i < this.columns+1; i++){ // gridsize+1 to generate a point on both 0 and maximum
    let x = this.width / this.columns * i;

    for (let j = 0; j < this.rows+1; j++) { // 2D involves a lattice of x and y coordinates

      let y = this.height / this.rows * j;

      let gridPt = {x}

      if (i == this.columns ) {
        //console.log("hoi" + j);
        gridPt.value = this.grid[j].value;
      } else if (j == this.rows) {
          //console.log(this.grid.length - this.rows);
          gridPt.value = this.grid[this.grid.length - this.rows].value;
        } else {
            gridPt.value = rand();
          }

      this.grid.push(gridPt); // add points to grid

    }

    // for (var h = 0; h < this.grid.length; h++) {
    //   c.beginPath();
    //   c.strokeStyle = "rgba(255, 255, 255, 0.25)";
    //   c.arc(this.grid[h].x, this.grid[h].y, this.grid[h].value*5, 0, 2 * Math.PI);
    //   c.stroke();
    // }

    // debugger;

  }

  //console.log(this.grid);

  // for (var i = 0; i < this.grid.length; i++) {
  //   c.beginPath();
  //   c.strokeStyle = "rgba(255, 255, 255, 0.25)";
  //   c.arc(this.grid[i].x, this.grid[i].y, this.grid[i].value*5, 0, 2 * Math.PI);
  //   c.stroke();
  // }
  // assign first point's value to last point to make the noise tileable

  //console.log(this.grid);

}

function NoiseGridPoint2D(x, y) {
  this.x = x;
  this.y = y;

  this.value
}

function evaluateValueNoise2DLinear(x, y, noise, offset) {
  if (offset === undefined) offset = 0;

  //console.log(x);
  //console.log(y);

  x = canvas.width/2 + x;

  if (y < 0) y = canvas.height/2 + Math.abs(y);
    else y = canvas.height/2 - y;


  //console.log(x);
  //console.log(y);

  let limit = [];
  limit.x = noise.width;
  limit.y = noise.height;

  if (x == limit.x) x = 0;

  x = x + offset;
  y = y + offset;

  if (x == limit.x || x > limit.x) x = x % limit.x;

  if (y == limit.y || y > limit.y) y = y % limit.y

  let result;

  let location = [];
  location.x = map(x, 0, noise.width, 0, noise.columns);
  location.y = map(y, 0, noise.height, 0, noise.rows);

  //console.log(location);
  //
  //console.log(noise.columns*Math.floor(location.x) + Math.floor(location.x) + Math.floor(location.y));

  // finding top left gridPt:
  let topLeftGridPt = noise.columns*Math.floor(location.x) + Math.floor(location.x) + Math.floor(location.y);
  // //console.log( ( noise.rows * Math.floor(location.x) ) + ( noise.columns *  Math.floor(location.y) ) );

  // retrieving values for the 4 grid points around the requested point to create
  // a cell around the point.
  let topLeftGridPtValue = noise.grid[ topLeftGridPt ].value;
  let bottomLeftGridPtValue = noise.grid[ topLeftGridPt + 1 ].value;
  let topRightGridPtValue = noise.grid[ topLeftGridPt + 1 + noise.columns ].value;
  let bottomRightGridPtValue = noise.grid[ topLeftGridPt + 1 + noise.columns + 1 ].value;
  // //
  //console.log(topLeftGridPtValue, bottomLeftGridPtValue, topRightGridPtValue, bottomRightGridPtValue);
  //
  // extrapolating point's value based on relative x Location in cell, top side
  let xValue1 = map( (location.x - Math.floor(location.x)), 0, 1, topLeftGridPtValue, topRightGridPtValue );
  //console.log(xValue1);

  // extrapolating point's value based on relative x Location in cell, bottom side
  let xValue2 = map( (location.x - Math.floor(location.x)), 0, 1, bottomLeftGridPtValue, bottomRightGridPtValue );
  //console.log(xValue2);

  // extrapolating the final value based on the previous value's
  let value = map( (location.y - Math.floor(location.y)), 0, 1, xValue1, xValue2);

  //console.log(value)

  // c.beginPath();
  // c.strokeStyle = "rgba(255, 50, 50, 0.75)";
  // c.arc(x, y, value*5, 0, 2 * Math.PI);
  // c.stroke();
  //
  // //
  // c.beginPath();
  // c.strokeStyle = "rgba(255, 50, 50, 0.75)";
  // c.arc(noise.grid[ topLeftGridPt ].x, noise.grid[ topLeftGridPt ].y, 10, 0, 2 * Math.PI);
  // c.arc(noise.grid[ topLeftGridPt  + 1 ].x, noise.grid[ topLeftGridPt  + 1 ].y, 10, 0, 2 * Math.PI);
  // c.arc(noise.grid[ topLeftGridPt  + 1 + noise.columns ].x, noise.grid[ topLeftGridPt  + 1 + noise.columns ].y, 10, 0, 2 * Math.PI);
  // c.arc(noise.grid[ topLeftGridPt  + 1 + noise.columns + 1 ].x, noise.grid[ topLeftGridPt  + 1 + noise.columns + 1 ].y, 10, 0, 2 * Math.PI);
  // c.stroke();

  return value;
}

function evaluateValueNoise2DCosine(x, y, noise, offset) {
  if (offset === undefined) offset = 0;

  //console.log(x);
  //console.log(y);

  x = canvas.width/2 + x;

  if (y < 0) y = canvas.height/2 + Math.abs(y);
    else y = canvas.height/2 - y;


  //console.log(x);
  //console.log(y);

  let limit = [];
  limit.x = noise.width;
  limit.y = noise.height;

  if (x == limit.x) x = 0;

  x = x + offset;
  y = y + offset;

  if (x == limit.x || x > limit.x) x = x % limit.x;

  if (y == limit.y || y > limit.y) y = y % limit.y

  let result;

  let location = [];
  location.x = map(x, 0, noise.width, 0, noise.columns);
  location.y = map(y, 0, noise.height, 0, noise.rows);

  //console.log(location);
  //
  //console.log(noise.columns*Math.floor(location.x) + Math.floor(location.x) + Math.floor(location.y));

  // finding top left gridPt:
  let topLeftGridPt = noise.columns*Math.floor(location.x) + Math.floor(location.x) + Math.floor(location.y);
  // //console.log( ( noise.rows * Math.floor(location.x) ) + ( noise.columns *  Math.floor(location.y) ) );

  // retrieving values for the 4 grid points around the requested point to create
  // a cell around the point.
  let topLeftGridPtValue = noise.grid[ topLeftGridPt ].value;
  let bottomLeftGridPtValue = noise.grid[ topLeftGridPt + 1 ].value;
  let topRightGridPtValue = noise.grid[ topLeftGridPt + 1 + noise.columns ].value;
  let bottomRightGridPtValue = noise.grid[ topLeftGridPt + 1 + noise.columns + 1 ].value;
  // //
  //console.log(topLeftGridPtValue, bottomLeftGridPtValue, topRightGridPtValue, bottomRightGridPtValue);
  //
  // extrapolating point's value based on relative x Location in cell, top side
  let cosineX = (1 - Math.cos(  (location.x - Math.floor(location.x))    * Math.PI)) * 0.5;
  let xValue1 = map( cosineX, 0, 1, topLeftGridPtValue, topRightGridPtValue );
  //console.log(xValue1);

  // extrapolating point's value based on relative x Location in cell, bottom side


  let xValue2 = map( cosineX, 0, 1, bottomLeftGridPtValue, bottomRightGridPtValue );
  //console.log(xValue2);

  // extrapolating the final value based on the previous value's
  let cosineY = (1 - Math.cos((location.y - Math.floor(location.y)) * Math.PI)) * 0.5;
  let value = map( cosineY, 0, 1, xValue1, xValue2);



  //console.log(value)

  // c.beginPath();
  // c.strokeStyle = "rgba(255, 50, 50, 0.75)";
  // c.arc(x, y, value*5, 0, 2 * Math.PI);
  // c.stroke();
  //
  // //
  // c.beginPath();
  // c.strokeStyle = "rgba(255, 50, 50, 0.75)";
  // c.arc(noise.grid[ topLeftGridPt ].x, noise.grid[ topLeftGridPt ].y, 10, 0, 2 * Math.PI);
  // c.arc(noise.grid[ topLeftGridPt  + 1 ].x, noise.grid[ topLeftGridPt  + 1 ].y, 10, 0, 2 * Math.PI);
  // c.arc(noise.grid[ topLeftGridPt  + 1 + noise.columns ].x, noise.grid[ topLeftGridPt  + 1 + noise.columns ].y, 10, 0, 2 * Math.PI);
  // c.arc(noise.grid[ topLeftGridPt  + 1 + noise.columns + 1 ].x, noise.grid[ topLeftGridPt  + 1 + noise.columns + 1 ].y, 10, 0, 2 * Math.PI);
  // c.stroke();

  return value;
}
