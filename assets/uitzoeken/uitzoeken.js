
    insertEdge2(point_object_a = this.insertPoint(), point_object_b = this.insertPoint( { x: 100, y: 100 } ) ){ 
      // check if argument is an array or a 2 points:
      if(point_object_a.constructor === Array){
        const point_collection = point_object_a,
              total_points = point_object_a.length;
        let e;
        for(e = 0; e < total_points; e++){
          const edge = (e!=0) ? this.insertEdge(point_collection[e-1], point_collection[e]) : false;
        }
        if(arguments[1] && arguments[1] != 'open'){
          // create final edge to close shape:
          const edge = this.insertEdge(point_collection[total_points-1], point_collection[0]);
        }
      }
      else {
        const edge = new Edge(point_object_a, point_object_b);
        this.geometry.edges.push(edge);

        return edge
      }
    } 



    

    render(geometry_object, layer_object, config_object){
      // function needs at least geometry
      if(arguments.length >= 1){
        // store default config:
        let config = { render_points: true, render_edges: true};
        if(arguments.length == 1 || !(arguments[1] instanceof Layer)){
          // if only geometry object is passed or 2 arguments passed and second argument is a config
          // render on the current layer...
          layer_object = this.current_layer;  
        }
        if((arguments[1] && !(arguments[1] instanceof Layer)) || config_object){
            // if geometry and config is passed or if all arguments are passed:
            // set config_object based on wether it was passed as second or third argument:
            config_object = (config_object) ? config_object : arguments[1];
            // iterate over the passed config object to change settings:
            for( const property in config_object){
              config[property] = config_object[property];
            } 
          } 
        // render the geometry:
        if(config.render_edges) this.renderEdges(geometry_object.edges, layer_object);
        if(config.render_points) this.renderPoints(geometry_object.points, layer_object);
      }
    }


clearAndRender2(){
  // clear the layer:
  // this.clearLayer();
  // render geometry:
  this.render2();
  // render symbols:
  this.renderSymbols();
}


    getPointPixelPosition(point_object, layer_object){
      // layer is calculated as 0,0 being the top corner whereas the euclidean space allows for negative locations so the screen has to be split in 4 quarters with 0,0 being the dead center of the layer...
      // get point' absolute pixel position in the layer object:
      let point_pixel_position_x = layer_object.width/2 + point_object.x,
          point_pixel_position_y = layer_object.height/2 - point_object.y,
          pixel_xy_vector = { x: point_pixel_position_x, y: point_pixel_position_y };
      return pixel_xy_vector
    }





 fillLayer(layer_number,layer_name, color){
      if(arguments.length === 1 && typeof(arguments[0]) == 'string'){
        // only color
        this.current_layer.fill(arguments[0]);  
      } else {
          if(arguments.length === 2 && typeof(arguments[0]) == 'number' && typeof(arguments[1]) == 'string'){
            // layer number and color 
            this.layers[arguments[0]].fill(arguments[1])
          }
        }
    }

    getDistance_old(vector){
        let distance = {};
        // calculation is to see if the distance is going in the negative or positive direction for both x and y
        distance.x = ( (vector.x < this.x) ? 1 : -1 ) * Math.sqrt( Math.pow((this.x - vector.x), 2) );
        distance.y = ( (vector.y < this.y) ? 1 : -1 ) * Math.sqrt( Math.pow((this.y - vector.y), 2) );
        if(distance.x === -0) distance.x = 0;
        if(distance.y === -0) distance.y = 0;
        distance.xy = Math.sqrt( Math.pow((this.x - vector.x), 2) + Math.pow((this.y - vector.y), 2) );
        
        return distance;
      }

    getPointPixelPositionORIGINAL(point_object, layer_object){
      // layer is calculated as 0,0 being the top corner whereas the euclidean space allows for negative locations so the screen has to be split in 4 quarters with 0,0 being the dead center of the layer...
      // get point' absolute pixel position in the layer object:
      let point_pixel_position_x = layer_object.width/2 + point_object.x,
          point_pixel_position_y = layer_object.height/2 - point_object.y,
          pixel_xy_vector = { x: point_pixel_position_x, y: point_pixel_position_y };
      return pixel_xy_vector
    }

    renderPointsOriginal(point_object, layer_object = this.current_layer){
      const parent = this;
      if(typeof(point_object) == 'object' && point_object.constructor !== Array){ // for single point in first argument
          renderSinglePoint(point_object, this.current_layer);
      }
      else if(point_object.constructor === Array){ // for array of points in first argument
        // render multiple points
        for (let p = point_object.length - 1; p >= 0; p--) {
          this.renderPoints(point_object[p], layer_object);
        }
      }

      function renderSinglePoint(point_object, layer_object){
        // calculate absolute pixel value of the point in the canvas:
        // console.log(point_object)
        // console.log(point_object.nx) 
        const aapje = {x: point_object.nx, y: point_object.ny};
        const pixel_xy_vector = parent.getPointPixelPosition(aapje, layer_object)
        // console.log(pixel_xy_vector)
        // draw a shape at the point location:
        // load preferences and configure the point display:
        const point_display = parent.preferences.point_display,
              point_radius = parseInt( parent.preferences.point_radius ),
              point_color = parent.preferences.point_color,
              config = {
                fill: true,
                fill_color: point_color
              };

        switch(point_display){
          case 'circle':
            // draw points on the canvas in a circle, point is dead center of circle
            layer_object.printCircle(pixel_xy_vector, point_radius, config)
          break;
          case 'square':
            // draw points on the canvas in a square, point location is dead center of the square
            let xy_vector_top_left = {x: pixel_xy_vector.x - point_radius, y: pixel_xy_vector.y - point_radius},
              xy_vector_bottom_right = {x: pixel_xy_vector.x + point_radius, y: pixel_xy_vector.y + point_radius};
            layer_object.printRectangle(xy_vector_top_left,xy_vector_bottom_right, config);
          break;
          case 'plus':
            // draw point on the canvas in a plus shape
            // determining line start and end vector positions:
            let xy_vector_vertical_line_start = {x: pixel_xy_vector.x, y: pixel_xy_vector.y - point_radius},
                xy_vector_vertical_line_end = {x: pixel_xy_vector.x, y: pixel_xy_vector.y + point_radius},
                xy_vector_horizontal_line_start = {x: pixel_xy_vector.x - point_radius, y: pixel_xy_vector.y },
                xy_vector_horizontal_line_end = {x: pixel_xy_vector.x + point_radius, y: pixel_xy_vector.y};
            // create horizontal and vertical lines on canvas:
            layer_object.printLine(xy_vector_vertical_line_start, xy_vector_vertical_line_end);
            layer_object.printLine(xy_vector_horizontal_line_start, xy_vector_horizontal_line_end);
          break;
        }
      }
    }





draw_on_canvas: ()=> {
      const line_set = drawLSystem( );
      const total_lines = line_set.lines.length;
      let l;
      for (l = 0; l < total_lines; l++) {
        const pt_a = asgard.insertPoint( line_set.lines[l].start ),
              pt_b = asgard.insertPoint( line_set.lines[l].end );
        asgard.insertEdge( pt_a, pt_b );
        if( line_set.lines[l].hasOwnProperty( 'leaf' ) ) odin.addSymbol( pt_b, 8, restcolors[getRandomInt(3)] );
      }
      odin.clearAndRender();
    },
    draw_koch_curve: ()=>{
      const l_system = createLSystem( 3, 'F', { F: 'F+F-F-F+F'} ),
            axiom_location = xy(-270,0), 
            instructions = { angle: 90, current_location: axiom_location },
            rules = [
              { char: 'F', operation: (instruction)=>{ // operation instructions per character
                  // create a line between previous and newly created point
                  const line = exp.l_system.line( instructions.current_location, instructions.angle );
                  // set current_loc to newly created:
                  instructions.current_location = line.end;
                  // add to return values:
                  output.lines.push(line);
              } },
              { char: '+', operation: (instruction)=>{
                  // add angle to current instructions
                  instructions.angle -= 90;
              } },
              { char: '-', operation: (instruction)=>{
                  // add angle to current instructions
                  instructions.angle += 90;
              } } ],
            output = { lines: [] };

      const lines = drawLSystem( l_system, axiom_location, instructions, rules, output );

      exp.l_system.geometry_from_lines( lines );

      odin.clearAndRender();
    },
    draw_sierpinski_triangle: ()=>{
      const l_system = createLSystem(5, 'F-G-G', { F: 'F-G+F+G-F', G: 'GG'} ),
            axiom_location = xy(-200,300),
            instructions = { angle: 120, current_location: axiom_location },
            rules = [
              { char: 'F', operation: ()=>{ // operation instructions per character
                  // create a line between previous and newly created point
                  const line = exp.l_system.line( instructions.current_location, instructions.angle );
                  // set current_loc to newly created:
                  instructions.current_location = line.end;
                  // add to return values:
                  output.lines.push(line);
              } },
              { char: 'G', operation: ()=>{ // operation instructions per character
                  rules[0].operation();
              } },
              { char: '+', operation: ()=>{
                  // add angle to current instructions
                  instructions.angle -= 120;
              } },
              { char: '-', operation: ()=>{
                  // add angle to current instructions
                  instructions.angle += 120;
              } } ],
            output = { lines: [] };

      const all_lines = drawLSystem( l_system, axiom_location, instructions, rules, output );

      exp.l_system.geometry_from_lines( all_lines );

      odin.clearAndRender();
    },
    draw_sierpinski_arrowhead: ()=>{
      const l_system = createLSystem( 4, 'A', { A: 'B-A-B', B: 'A+B+A' } ),
            axiom_location = xy(-160,0),
            instructions = { angle: 90, current_location: axiom_location },
            rules = [
              { char: 'A', operation: ()=>{ // operation instructions per character
                  // create a line between previous and newly created point
                  const line = exp.l_system.line( instructions.current_location, instructions.angle );
                  // set current_loc to newly created:
                  instructions.current_location = line.end;
                  // add to return values:
                  output.lines.push(line);
              } },
              { char: 'B', operation: ()=>{ // operation instructions per character
                  rules[0].operation();
              } },
              { char: '+', operation: ()=>{
                  // add angle to current instructions
                  instructions.angle -= 60;
              } },
              { char: '-', operation: ()=>{
                  // add angle to current instructions
                  instructions.angle += 60;
              } } ],
            output = { lines: [] };

      const all_lines = drawLSystem( l_system, axiom_location, instructions, rules, output );

      exp.l_system.geometry_from_lines( all_lines );

      odin.clearAndRender();
    },
    draw_dragon_curve: ()=>{
      const l_system = createLSystem( 4, 'A', { A: 'B-A-B', B: 'A+B+A' } ),
            axiom_location = xy(-160,0),
            instructions = { angle: 90, current_location: axiom_location },
            rules = [
              { char: 'A', operation: ()=>{ // operation instructions per character
                  // create a line between previous and newly created point
                  const line = exp.l_system.line( instructions.current_location, instructions.angle );
                  // set current_loc to newly created:
                  instructions.current_location = line.end;
                  // add to return values:
                  output.lines.push(line);
              } },
              { char: 'B', operation: ()=>{ // operation instructions per character
                  rules[0].operation();
              } },
              { char: '+', operation: ()=>{
                  // add angle to current instructions
                  instructions.angle -= 60;
              } },
              { char: '-', operation: ()=>{
                  // add angle to current instructions
                  instructions.angle += 60;
              } } ],
            output = { lines: [] };

      const all_lines = drawLSystem( l_system, axiom_location, instructions, rules, output );

      exp.l_system.geometry_from_lines( all_lines );

      odin.clearAndRender();
    },



// const mods = new Modifiers;
// const mod_stack = new ModifierStack;


// const noise = mods.createValueNoise(8, 'kevin');
// console.log( noise );


  // rotate(pt_b, xy(0,0), 1)
  const vector = { x: pt_a.x, y: pt_a.y+25 };
  // console.log(vector);
  const pos = rotateSingleVector( { x: pt_a.x, y: pt_a.y+100 }, xy(0,0), 1 );
  console.log(pos)
  pt_b.x = pos.x;
  pt_b.y = pos.y;
  // pt_b.location
  
  // for (var i = 0; i < points.length; i++) {
    
  //  const color_1 = Math.round( getLinearInterpolation(i, 0, points.length-1, 0, 3) ),
  //        color_2 = (color_1 < 3) ? color_1 + 1 : 0;


  //  drawLine(points[i], 
  //    symbols[i], 
  //    0.35, 
  //    restcolors[color_1], 
  //    restcolors[color_2]
  //    );

  //  odin.renderSingleSymbol(symbols[i], layers[i])
  // }






renderPoints(point_object, layer_object){
      const parent = this;
      if(typeof(point_object) == 'object' && point_object.constructor !== Array){ // for single point in first argument
        if(layer_object === undefined) {
          renderSinglePoint(point_object, this.current_layer);
        }
        else {
          renderSinglePoint(point_object, layer_object);
        }
      }
      else if(point_object.constructor === Array){ // for array of points in first argument
        // render multiple points
        for (let p = point_object.length - 1; p >= 0; p--) {
          this.renderPoints(point_object[p], layer_object);
        }
      }

      function renderSinglePoint(point_object, layer_object){
        // calculate absolute pixel value of the point in the canvas: 
        const pixel_xy_vector = parent.getPointPixelPosition(point_object, layer_object)
        // draw a shape at the point location:
        // load preferences and configure the point display:
        const point_display = parent.preferences.point_display,
              point_radius = parseInt( parent.preferences.point_radius ),
              point_color = parent.preferences.point_color,
              config = {
                fill: true,
                fill_color: point_color
              };

        switch(point_display){
          case 'circle':
            // draw points on the canvas in a circle, point is dead center of circle
            layer_object.printCircle(pixel_xy_vector, point_radius, config)
          break;
          case 'square':
            // draw points on the canvas in a square, point location is dead center of the square
            let xy_vector_top_left = {x: pixel_xy_vector.x - point_radius, y: pixel_xy_vector.y - point_radius},
              xy_vector_bottom_right = {x: pixel_xy_vector.x + point_radius, y: pixel_xy_vector.y + point_radius};
            layer_object.printRectangle(xy_vector_top_left,xy_vector_bottom_right, config);
          break;
          case 'plus':
            // draw point on the canvas in a plus shape
            // determining line start and end vector positions:
            let xy_vector_vertical_line_start = {x: pixel_xy_vector.x, y: pixel_xy_vector.y - point_radius},
                xy_vector_vertical_line_end = {x: pixel_xy_vector.x, y: pixel_xy_vector.y + point_radius},
                xy_vector_horizontal_line_start = {x: pixel_xy_vector.x - point_radius, y: pixel_xy_vector.y },
                xy_vector_horizontal_line_end = {x: pixel_xy_vector.x + point_radius, y: pixel_xy_vector.y};
            // create horizontal and vertical lines on canvas:
            layer_object.printLine(xy_vector_vertical_line_start, xy_vector_vertical_line_end);
            layer_object.printLine(xy_vector_horizontal_line_start, xy_vector_horizontal_line_end);
          break;
        }
      }
    }





function createLSystem2( 
  total_recursions = 3, 
  axiom = '0', 
  rules = { 0: '1[0]0', 1: '11' }
  ){

  let all_chars = [];
  all_chars.push(axiom);
  
  let n = 0
  for (n = 0; n < total_recursions; n++) {
    // loop n over total recursions
    const total_chars = all_chars.length;
    let ch;
    for (ch = 0; ch < total_chars; ch++) {
      // loop over all currently existing characters
      const total_rules = Object.keys(rules).length;
      let rl;
      for (rl = 0; rl < total_rules; rl++) {
      // loop over all given rules
        const current_rule = Object.keys(rules)[rl],
              current_char = all_chars[ch];
        if( current_rule == current_char ){
          // change current character to rule  
          all_chars[ch] = Object.values(rules)[rl];
        }   
      }
    }

    // create array to store unpacked strings
    const recursion_chars = [];
    for (ch = 0; ch < total_chars; ch++) {
      // unpack the string
      const new_chars = [ ...all_chars[ch] ];
      const total_new_chars = new_chars.length;
      let nc;
      for (nc = 0; nc < total_new_chars; nc++) {
        // add to the total array
        recursion_chars.push(new_chars[nc]);
      }
    }

    all_chars = recursion_chars;
  }
  
  return all_chars
}



function drawLSystem(
  lSystem = createLSystem(3), 
  axiom_position = {x: 0, y: 0}, 

  instructions = [
    [{ position: axiom_position, angle: 0, current_pt: null}],
    { char: '0', operation: ()=>{
        // punten aanmaken
        const instr = instructions[0][ instructions[0].length-1 ];
        pt = asgard.insertPoint( { x: instr.position.x, y: instr.position.y + 25 } );
        // punten roteren
        rotate(pt, instr.current_pt, instr.angle);
        // punten verbinden met een edge
        asgard.insertEdge(instr.current_pt, pt);

        // add a 'leaf' at the end of the segment
        odin.addSymbol( pt, 8, restcolors[getRandomInt(3)] );

      } },
    { char: '1', operation: ()=>{
        // punten aanmaken
        const instr = instructions[0][ instructions[0].length-1 ];
        pt = asgard.insertPoint( { x: instr.position.x, y: instr.position.y + 25 } );
        // punten roteren
        rotate(pt, instr.current_pt, instr.angle);
        // punten verbinden met een edge
        asgard.insertEdge(instr.current_pt, pt);

        // set current_pt to newly created:
        instr.current_pt = pt;    
        // store current position:
        instr.position = { x: pt.x, y: pt.y };

      } },
    { char: '[', operation: ()=>{
        // current instructions:
        const instr = instructions[0][ instructions[0].length-1 ];

        // push new instructions
        instructions[0].push({ 
          position: instr.position, // store previous position
          angle: instr.angle - 45, // subtract from previous angle
          current_pt: instr.current_pt // save current_pt for edge creation
        })
      } },
    { char: ']', operation: ()=>{
        // remove last instructions
        instructions[0].pop()
        // current instructions:
        const instr = instructions[0][ instructions[0].length-1 ];
        // add angle to current instructions
        instr.angle += 45;
      } }
  ]
  ){
  
  console.log(lSystem);
  instructions[0][ instructions[0].length-1 ].current_pt = asgard.insertPoint( axiom_position );
  // const axiom_pt = asgard.insertPoint( axiom_position );
  // ik wil loopen door de lSystem om elk charater te checken
  for (var i = 0; i < lSystem.length; i++) {
    // console.log(lSystem[i]);
    // nu elk character tegen 't licht houden zogezegd, met de instructions
    for (var j = 1; j < instructions.length; j++) {
      // als 't character een match is met een instructie een operation uitvoeren
      if( lSystem[i] == instructions[j].char ){
        instructions[j].operation();
      }
    }
  }
  // instructions[0]();

}






function drawLSystem2(
  lSystem = createLSystem(1), 
  axiom_position = {x: 0, y: 0}, 

  instructions = [
    [{ angle: 0, current_pt: asgard.insertPoint( axiom_position ) }],
    { char: '0', operation: ()=>{
        // punten aanmaken
        const instr = instructions[0][ instructions[0].length-1 ];
        pt = asgard.insertPoint( { x: instr.current_pt.x, y: instr.current_pt.y + 25 } );
        // punten roteren
        rotate(pt, instr.current_pt, instr.angle);
        // punten verbinden met een edge
        asgard.insertEdge(instr.current_pt, pt);
        // add a 'leaf' at the end of the segment
        odin.addSymbol( pt, 8, restcolors[getRandomInt(3)] );

        // add to return values:
        output.all_pts.push(pt);
        output.end_pts.push(pt);
      } },
    { char: '1', operation: ()=>{
        // punten aanmaken
        const instr = instructions[0][ instructions[0].length-1 ];
        pt = asgard.insertPoint( { x: instr.current_pt.x, y: instr.current_pt.y + 25 } );
        // punten roteren
        rotate(pt, instr.current_pt, instr.angle);
        // punten verbinden met een edge
        asgard.insertEdge(instr.current_pt, pt);

        // set current_pt to newly created:
        instr.current_pt = pt;    
        // add to return values:
        output.all_pts.push(pt);

      } },
    { char: '[', operation: ()=>{
        // current instructions:
        const instr = instructions[0][ instructions[0].length-1 ];

        // push new instructions
        instructions[0].push({ 
          // position: instr.position, // store previous position
          angle: instr.angle - 45, // subtract from previous angle
          current_pt: instr.current_pt // save current_pt for edge creation
        })
      } },
    { char: ']', operation: ()=>{
        // remove last instructions
        instructions[0].pop()
        // current instructions:
        const instr = instructions[0][ instructions[0].length-1 ];
        // add angle to current instructions
        instr.angle += 45;
      } }
  ],
  output = { end_pts: [], all_pts: [] }
  ){
  
  console.log(lSystem);
  // ik wil loopen door de lSystem om elk charater te checken
  for (var i = 0; i < lSystem.length; i++) {
    // console.log(lSystem[i]);
    // nu elk character tegen 't licht houden zogezegd, met de instructions
    for (var j = 1; j < instructions.length; j++) {
      // als 't character een match is met een instructie een operation uitvoeren
      if( lSystem[i] == instructions[j].char ){
        instructions[j].operation();
      }
    }
  }
  // instructions[0]();
  return output
}


// ombouwen naar rules en instructions:::!!!!!
function drawLSystem(
  lSystem = createLSystem(3), 
  axiom_position = {x: 0, y: 0}, 

  instructions = [
    [{ angle: 0, current_pt: asgard.insertPoint( axiom_position ) }], // stored instructions
    { char: '0', operation: ()=>{ // operation instructions per character
        // current instruction shorthand
        const instr = instructions[0][ instructions[0].length-1 ];
        // 'extrude' new point from previous point and rotating it to instruction specified degrees
        const origin = instr.current_pt,
              extruded_location = { x: origin.x, y: ( origin.y + 25 ) },
              angle = instr.angle,
              pt_loc = rotateSingleVector( extruded_location, origin, angle );
        // insert a point in the scene at the new location
        const pt = asgard.insertPoint( { x: pt_loc.x, y: pt_loc.y } );
        // punten verbinden met een edge
        const edge = asgard.insertEdge(instr.current_pt, pt);
        // add a 'leaf' at the end of the segment
        const symbol = odin.addSymbol( pt, 8, restcolors[getRandomInt(3)] );

        // add to return values:
        output.all_pts.push(pt);
        output.end_pts.push(pt);
        output.all_edges.push(edge);
        output.symbols.push(symbol);
      } },
    { char: '1', operation: ()=>{
        // current instruction shorthand
        const instr = instructions[0][ instructions[0].length-1 ];
        // 'extrude' new point from previous point and rotating it to instruction specified degrees
        const origin = instr.current_pt,
              extruded_location = { x: origin.x, y: ( origin.y + 25 ) },
              angle = instr.angle,
              pt_loc = rotateSingleVector( extruded_location, origin, angle );
        // insert a point in the scene at the new location
        const pt = asgard.insertPoint( { x: pt_loc.x, y: pt_loc.y } );
        // punten verbinden met een edge
        const edge = asgard.insertEdge(instr.current_pt, pt);
        // set current_pt to newly created:
        instr.current_pt = pt;

        // add to return values:
        output.all_pts.push(pt);
        output.all_edges.push(edge);

      } },
    { char: '[', operation: ()=>{
        // current instructions:
        const instr = instructions[0][ instructions[0].length-1 ];

        // push new instructions
        instructions[0].push({ 
          // position: instr.position, // store previous position
          angle: instr.angle - 45, // subtract from previous angle
          current_pt: instr.current_pt // save current_pt for edge creation
        })
      } },
    { char: ']', operation: ()=>{
        // remove last instructions
        instructions[0].pop()
        // current instructions:
        const instr = instructions[0][ instructions[0].length-1 ];
        // add angle to current instructions
        instr.angle += 45;
      } }
  ],
  output = { end_pts: [], all_pts: [ instructions[0][0].current_pt ], all_edges: [], symbols: [] }
  ){
  
  console.log(lSystem);
  // ik wil loopen door de lSystem om elk charater te checken
  for (var i = 0; i < lSystem.length; i++) {
    // console.log(lSystem[i]);
    // nu elk character tegen 't licht houden zogezegd, met de instructions
    for (var j = 1; j < instructions.length; j++) {
      // als 't character een match is met een instructie een operation uitvoeren
      if( lSystem[i] == instructions[j].char ){
        instructions[j].operation();
      }
    }
  }
  return output
}



// draw the L-System
function drawLSystemBACKUP(
  lSystem = createLSystem(3), 
  axiom_position = {x: 0, y: 0}, 
  instructions = [ { angle: 0, current_pt: asgard.insertPoint( axiom_position ) } ],
  rules = [
    { char: '0', operation: ()=>{ // operation instructions per character
        // current instruction shorthand
        const instr = instructions[ instructions.length-1 ];
        // 'extrude' new point from previous point and rotating it to instruction specified degrees
        const origin = instr.current_pt,
              extruded_location = { x: origin.x, y: ( origin.y + 25 ) },
              angle = instr.angle,
              pt_loc = rotateSingleVector( extruded_location, origin, angle );
        // insert a point in the scene at the new location
        const pt = asgard.insertPoint( { x: pt_loc.x, y: pt_loc.y } );
        // punten verbinden met een edge
        const edge = asgard.insertEdge(instr.current_pt, pt);
        // add a 'leaf' at the end of the segment
        const symbol = odin.addSymbol( pt, 8, restcolors[getRandomInt(3)] );

        // add to return values:
        output.all_pts.push(pt);
        output.end_pts.push(pt);
        output.all_edges.push(edge);
        output.symbols.push(symbol);
      } },
    { char: '1', operation: ()=>{
        // current instruction shorthand
        const instr = instructions[ instructions.length-1 ];
        // 'extrude' new point from previous point and rotating it to instruction specified degrees
        const origin = instr.current_pt,
              extruded_location = { x: origin.x, y: ( origin.y + 25 ) },
              angle = instr.angle,
              pt_loc = rotateSingleVector( extruded_location, origin, angle );
        // insert a point in the scene at the new location
        const pt = asgard.insertPoint( { x: pt_loc.x, y: pt_loc.y } );
        // connect points using edge
        const edge = asgard.insertEdge(instr.current_pt, pt);
        // set current_pt to newly created:
        instr.current_pt = pt;

        // add to return values:
        output.all_pts.push(pt);
        output.all_edges.push(edge);

      } },
    { char: '[', operation: ()=>{
        // current instructions:
        const instr = instructions[ instructions.length-1 ];

        // push new instructions
        instructions.push({ 
          angle: instr.angle - 45, // subtract from previous angle
          current_pt: instr.current_pt // save current_pt for edge creation
        })
      } },
    { char: ']', operation: ()=>{
        // remove last instructions
        instructions.pop()
        // current instructions:
        const instr = instructions[ instructions.length-1 ];
        // add angle to current instructions
        instr.angle += 45;
      } }
  ],
  output = { end_pts: [], all_pts: [ instructions[0].current_pt ], all_edges: [], symbols: [] }
  ){
  
  // loop over L-System's every character
  const total_chars = lSystem.length;
  let c;
  for (c = 0; c < total_chars; c++) {
    // loop over every drawing rule
    const total_rules = rules.length;
    let r;
    for (r = 0; r < total_rules; r++) {
      // apply operation if character has a rule
      if( lSystem[c] === rules[r].char ){
        rules[r].operation();
      }
    }
  }
  return output
}



















// console.log(drawLSystem());

// const lsys = createLSystem( 3, 'F', { F: 'F+F-F-F+F'} ), 
//      axiom_loc = xy(-270,0),
//      axiom_pt = asgard.insertPoint( axiom_loc ),
//      instructions = { angle: 90, current_pt: axiom_pt },
//      rules = [
//        // rules
//        { char: 'F', operation: ()=>{ // operation instructions per character
//          console.log('F')
//          // 'extrude' new point from previous point and rotating it to instruction specified degrees
//          const origin = instructions.current_pt,
//                extruded_location = { x: origin.x, y: ( origin.y + 20 ) },
//                angle = instructions.angle,
//                pt_loc = rotateSingleVector( extruded_location, origin, angle );
//          // insert a point in the scene at the new location
//          const pt = asgard.insertPoint( { x: pt_loc.x, y: pt_loc.y } );
//          // connect points using edge
//          const edge = asgard.insertEdge(instructions.current_pt, pt);
//          // set current_pt to newly created:
//          instructions.current_pt = pt;
//          // add to return values:
//          output.all_pts.push(pt);
//          output.all_edges.push(edge);

//        } },
//        { char: '+', operation: ()=>{
//          console.log('+')
//          // add angle to current instructions
//          instructions.angle -= 90;
//        } },
//        { char: '-', operation: ()=>{
//          console.log('-')
//          // add angle to current instructions
//          instructions.angle += 90;
//        } }
//        ],
//      output = { all_pts: [ axiom_pt ], all_edges: [] };

// console.log( drawLSystem( lsys, axiom_loc, instructions, rules, output ) );


// const lsys = createLSystem(5, 'F-G-G', { F: 'F-G+F+G-F', G: 'GG'} ), 
//      axiom_loc = xy(-250,250),
//      axiom_pt = asgard.insertPoint( axiom_loc ),
//      instructions = { angle: 120, current_pt: axiom_pt },
//      rules = [
//        // rules
//        { char: 'F', operation: ()=>{ // operation instructions per character
//          // console.log('F')
//          // 'extrude' new point from previous point and rotating it to instruction specified degrees
//          const origin = instructions.current_pt,
//                extruded_location = { x: origin.x, y: ( origin.y + 20 ) },
//                angle = instructions.angle,
//                pt_loc = rotateSingleVector( extruded_location, origin, angle );
//          // insert a point in the scene at the new location
//          const pt = asgard.insertPoint( { x: pt_loc.x, y: pt_loc.y } );
//          // connect points using edge
//          const edge = asgard.insertEdge(instructions.current_pt, pt);
//          // set current_pt to newly created:
//          instructions.current_pt = pt;
//          // add to return values:
//          output.all_pts.push(pt);
//          output.all_edges.push(edge);

//        } },
//        { char: 'G', operation: ()=>{ // operation instructions per character
//          // console.log('G')
//          // 'extrude' new point from previous point and rotating it to instruction specified degrees
//          const origin = instructions.current_pt,
//                extruded_location = { x: origin.x, y: ( origin.y + 20 ) },
//                angle = instructions.angle,
//                pt_loc = rotateSingleVector( extruded_location, origin, angle );
//          // insert a point in the scene at the new location
//          const pt = asgard.insertPoint( { x: pt_loc.x, y: pt_loc.y } );
//          // connect points using edge
//          const edge = asgard.insertEdge(instructions.current_pt, pt);
//          // set current_pt to newly created:
//          instructions.current_pt = pt;
//          // add to return values:
//          output.all_pts.push(pt);
//          output.all_edges.push(edge);

//        } },
//        { char: '+', operation: ()=>{
//          // console.log('+')
//          // add angle to current instructions
//          instructions.angle -= 120;
//        } },
//        { char: '-', operation: ()=>{
//          // console.log('-')
//          // add angle to current instructions
//          instructions.angle += 120;
//        } }
//        ],
//      output = { all_pts: [ axiom_pt ], all_edges: [] };
// console.log(lsys)
// console.log( drawLSystem( lsys, axiom_loc, instructions, rules, output ) );


// const lsys = createLSystem(5, 'A', { A: 'B-A-B', B: 'A+B+A'} ), 
//      axiom_loc = xy(-250,-250),
//      axiom_pt = asgard.insertPoint( axiom_loc ),
//      instructions = { angle: 90, current_pt: axiom_pt },
//      rules = [
//        // rules
//        { char: 'A', operation: ()=>{ // operation instructions per character
//          // console.log('F')
//          // 'extrude' new point from previous point and rotating it to instruction specified degrees
//          const origin = instructions.current_pt,
//                extruded_location = { x: origin.x, y: ( origin.y + 15 ) },
//                angle = instructions.angle,
//                pt_loc = rotateSingleVector( extruded_location, origin, angle );
//          // insert a point in the scene at the new location
//          const pt = asgard.insertPoint( { x: pt_loc.x, y: pt_loc.y } );
//          // connect points using edge
//          const edge = asgard.insertEdge(instructions.current_pt, pt);
//          // set current_pt to newly created:
//          instructions.current_pt = pt;
//          // add to return values:
//          output.all_pts.push(pt);
//          output.all_edges.push(edge);

//        } },
//        { char: 'B', operation: ()=>{ // operation instructions per character
//          // console.log('G')
//          // 'extrude' new point from previous point and rotating it to instruction specified degrees
//          const origin = instructions.current_pt,
//                extruded_location = { x: origin.x, y: ( origin.y + 20 ) },
//                angle = instructions.angle,
//                pt_loc = rotateSingleVector( extruded_location, origin, angle );
//          // insert a point in the scene at the new location
//          const pt = asgard.insertPoint( { x: pt_loc.x, y: pt_loc.y } );
//          // connect points using edge
//          const edge = asgard.insertEdge(instructions.current_pt, pt);
//          // set current_pt to newly created:
//          instructions.current_pt = pt;
//          // add to return values:
//          output.all_pts.push(pt);
//          output.all_edges.push(edge);

//        } },
//        { char: '+', operation: ()=>{
//          // console.log('+')
//          // add angle to current instructions
//          instructions.angle += 60;
//        } },
//        { char: '-', operation: ()=>{
//          // console.log('-')
//          // add angle to current instructions
//          instructions.angle -= 60;
//        } }
//        ],
//      output = { all_pts: [ axiom_pt ], all_edges: [] };
// console.log(lsys)
// console.log( drawLSystem( lsys, axiom_loc, instructions, rules, output ) );

// const lsys = createLSystem(9, 'FX', { X: 'X+YF+', Y: '-FX-Y'} ), 
//      axiom_loc = xy(-100,100),
//      axiom_pt = asgard.insertPoint( axiom_loc ),
//      instructions = { angle: 90, current_pt: axiom_pt },
//      rules = [
//        // rules
//        { char: 'F', operation: ()=>{ // operation instructions per character
//          // console.log('F')
//          // 'extrude' new point from previous point and rotating it to instruction specified degrees
//          const origin = instructions.current_pt,
//                extruded_location = { x: origin.x, y: ( origin.y + 15 ) },
//                angle = instructions.angle,
//                pt_loc = rotateSingleVector( extruded_location, origin, angle );
//          // insert a point in the scene at the new location
//          const pt = asgard.insertPoint( { x: pt_loc.x, y: pt_loc.y } );
//          // connect points using edge
//          const edge = asgard.insertEdge(instructions.current_pt, pt);
//          // set current_pt to newly created:
//          instructions.current_pt = pt;
//          // add to return values:
//          output.all_pts.push(pt);
//          output.all_edges.push(edge);

//        } },
//        { char: '+', operation: ()=>{
//          // console.log('+')
//          // add angle to current instructions
//          instructions.angle += 90;
//        } },
//        { char: '-', operation: ()=>{
//          // console.log('-')
//          // add angle to current instructions
//          instructions.angle -= 90;
//        } }
//        ],
//      output = { all_pts: [ axiom_pt ], all_edges: [] };
// console.log(lsys)
// console.log( drawLSystem( lsys, axiom_loc, instructions, rules, output ) );
// console.log( drawLSystem() )



// point_a.modifiers.noise = {x: 50, y: 50};

// const point_a = asgard.insertPoint( xy(100, 75) );
// const point_b = asgard.insertPoint( xy(50, 150) );
// const point_c = asgard.insertPoint( xy(-140, -5) );
// const point_d = asgard.insertPoint( xy(40, 60) );
// const point_e = asgard.insertPoint( xy(-25, 35) );
// console.log( point_a.addModifier('noise', xy(50,50) ) );


// console.log( point_a.addModifier('noise', xy(150,50) ) );

// const symbol_a = odin.addSymbol(point_a, 20, restcolors[1]);
// const symbol_b = odin.addSymbol(point_b, 10, restcolors[1]);
// const symbol_c = odin.addSymbol(point_c, 10, restcolors[1]);
// const symbol_d = odin.addSymbol(point_d, 10, restcolors[1]);
// const symbol_e = odin.addSymbol(point_e, 10, restcolors[1]);

// symbol_a.radius = noise.evaluate( point_a, odin.current_layer) * 20;
// const scaleb = scaleSinglePoint2(point_a, xy(0,0), 1.2)

// console.log(scaleb)
// point_a.addModifier('scale', scaleb)
// point_a.modifiers.noise = xy(50, 50);
// translate2(point_a, xy(50,50))
// console.log(point_a);
// console.log( point_a.nx )

// const aapje2 = { x: point_a.nx, y: point_a.ny }; 
// let aapje = noise.evaluate( aapje2, odin.current_layer)
  // point_a.modifiers.scale = scaleSinglePoint2(point_a, xy(0,0), 1+aapje)


// odin.clearAndRender2();

// showNoiseCircles();

// noise.evaluate( point_a, odin.current_layer)



// for (var i = 0; i < 10; i++) {
//  point_a.modifiers.scale = scaleSinglePoint2(point_a, xy(0,0), 1+(i/10));
//  console.log(point_a.modifiers.scale)
//  console.log(point_a.nx)
// }


// const evaluate = noise.evaluate( point_a, odin.current_layer);

// console.log( evaluate );
// function generateRandomVectors(total_vectors){
//     let all_vectors = [];
//     let width = odin.current_layer.width/2.25;
//     let height = odin.current_layer.height/2.25;
//     for(let v = 0; v < total_vectors; v++){
//       let vector = {
//         x: -(width/2) + getRandomInt(width),
//         y: -(height/2) + getRandomInt(height)
//       }
//       all_vectors.push(vector);
//     }
//     return all_vectors
//   }

//   function generatePseudoRandomVectors(total_vectors, seed){
//     let all_vectors = [];
//     let width = odin.current_layer.width/2.25;
//     let height = odin.current_layer.height/2.25;

//     // Create xmur3 state:
//    var state = xmur3(seed);

//    // Output one 32-bit hash to provide the seed for mulberry32.
//    var rand = mulberry32(state());

//     for(let v = 0; v < total_vectors; v++){




//       let vector = {
//         x: -(width/2) + rand() * (width),
//         y: -(height/2) + rand() * (height)
//       }
//       all_vectors.push(vector);
//     }
//     return all_vectors
//   }

// function createPoints(vector_set){
//   let all_points = [];
//   for (var p = 0; p < vector_set.length; p++) {
//     let point = asgard.insertPoint(vector_set[p]);
//     all_points.push(point);
//   }
  
//   return all_points
// }

// const points = createPoints( generatePseudoRandomVectors(15, 'apu') );
// const addSymbols = function(points){
//  const symbols = [];
//  for (var i = 0; i < points.length; i++) {
//    symbols.push( odin.addSymbol(points[i], 20, 'black') );

//  }
//  return symbols
// }
// const symbols = addSymbols(points);
// // odin.clearAndRender2();
// // console.log(odin.width)
// const layers = []
// for (var i = 0; i < points.length; i++) {
//  layers.push( odin.createLayer() );
// }
// // console.log(asgard.geometry)
// // console.log(odin)



// function drawLine(point_object, symbol_object, base_scale = 1, color_1 = 'rgba(255,255,255,1)', color_2 = 'rgba(0,0,0,1)'){

//  const part = getLinearInterpolation(f(), 1, 361, -1, 1);
//  color_1 = decodeRgba(color_1);
//  color_2 = decodeRgba(color_2);

//  const r = getLinearInterpolation(f(), 1, 361, 
//    (part > 0) ? color_1.r : color_2.r, 
//    (part > 0) ? color_2.r : color_1.r );
//   const g = getLinearInterpolation(f(), 1, 361, 
//    (part > 0) ? color_1.g : color_2.g, 
//    (part > 0) ? color_2.g : color_1.g );
//   const b = getLinearInterpolation(f(), 1, 361, 
//    (part > 0) ? color_1.b : color_2.b, 
//    (part > 0) ? color_2.b : color_1.b );

//   const current_noise = noise.evaluateCosine( point_object, odin.current_layer)
//   point_object.modifiers.scale = scaleSinglePoint2(point_object, xy(0,0), 1+(current_noise*0.5))

//   rotate(point_object, xy(0,0), 1);

//  const display_coords = { x: point_object.nx, y: point_object.ny }; 
  
//   symbol_object.config.fill_color = `rgba(${r}, ${g}, ${b},1)`;

//   symbol_object.radius = base_scale * getCosineInterpolation( noise.evaluate( display_coords, odin.current_layer), 0, 1, 1, 20 );

// }

// point y location needs to move up and down, directional 
// speed easing down when nearing upper and lower limit
const lower_limit = -200;
const upper_limit = 200;
// need to know the speed of the directional vector:
// get the total duration of one translation from upper to lower limit
// declare duration in ms:
const cycle_length = 5000;
// get duration in frames:
const cycle_frame_length = kvn.getRoundedFloat( cycle_length / ( 1000 / freya.settings.fps ), 0 );


console.log( kvn.decodeRgba('rgba(230, 34, 199, 0.2') );
// const points = asgard.grid.diamond(1, 20, 'horizontal');
// const points = asgard.grid.horizontal(5, 5, 50);
// const points = asgard.grid.horizontal(5, 5, 50, true);
// const points = asgard.grid.vertical(5, 5, 50, 'horizontal');

// const points = asgard.shape.polyline( 
//         xy(upper_limit, lower_limit), 
//         xy(lower_limit, upper_limit), 
//         {
//           create_edges: false,
//           line_segments: 5,
//           reverse: true
//         }
//       );


const polyline = asgard.shape.polyline( 
        xy(100, -100), 
        xy(-100, 100), 
        {
          create_edges: true,
          line_segments: 5
        }
      );

// const polygon = asgard.shape.polygon( 
//         xy(0,0), 
//         250, 
//         16, 
//         {
//           create_edges: false
//         }
//       );

// const points = asgard.shape.square(
//         xy(0,0),
//         200,
//         {
//           create_edges: true
//         }
//       );

// const rectangle = asgard.shape.rectangle(
//         xy(-225, 125),
//         xy(225, -125),
//         {
//           create_edges: true
//         }
//       );

const triangle = asgard.shape.triangle(
        xy(0,0),
        300,
        {
          create_edges: true
        }
      );

const points = asgard.shape.star(
                xy(0,0), 
                175, 
                225, 
                8, 
                {
                  create_edges: true
                }
              );


const points_x = [];
const points_y = [];

const symbols = [];

const color_1 = kvn.decodeRgba(restcolors[2]);
const color_2 = kvn.decodeRgba(restcolors[3]);


for (let i = 0; i < points.length; i++) {
  points_x.push( points[i].x );
  points_y.push( points[i].y );

  const rad = kvn.getCosineInterpolation(i, 0, points.length, 5, 30);
  const r = kvn.getLinearInterpolation(i, 0, points.length, color_1.r, color_2.r);
  const g = kvn.getLinearInterpolation(i, 0, points.length, color_1.g, color_2.g);
  const b = kvn.getLinearInterpolation(i, 0, points.length, color_1.b, color_2.b);
  const symbol = odin.addSymbol(points[i], rad, `rgba(${r}, ${g}, ${b},1)`);
  symbols.push(symbol)
}





let increment = 0.5;
function growSymbols(symbol_set){

  for (var i = 0; i < symbol_set.length; i++) {

    if(symbol_set[i].radius >= 30) symbol_set[i].growing = false
    else if (symbol_set[i].radius <= 5) symbol_set[i].growing = true;

    if(symbol_set[i].growing) symbol_set[i].radius += increment;
    else symbol_set[i].radius -= increment;
  }
  
}

    emit(total_vectors){
      let xy_vector_collection = [];
      for (let v = 0; v < total_vectors; v++) {
        let point = new Point({x: this.point.x, y: this.point.y});
        xy_vector_collection.push(point);
      }

      let point_collection = this.world_space.createPoint( xy_vector_collection )

      return point_collection
    }




  class Particle {
    constructor(xy_vector, lifetime) { 
        this.x = xy_vector.x;
        this.y = xy_vector.y;
        this.life = lifetime;
      }
    echo(){
      console.log(this);
    }
  }

    emitters = {

      add: (point_object)=>{
        let emitter = new Emitter(point_object);
        return emitter;
      },

      emit: (emitter_object, arg)=>{
        // console.log(this);
        console.log(emitter_object)
        let point_collection = this.createPoint( emitter_object.emit(arg) );
        console.log(point_collection)
        this.geometry.points.push( point_collection );
      }


    }


createPolyline(start_xy_vector, end_xy_vector, config) {

      const default_options = { line_segments: 1, create_edges: true },
            options = this.get_options(default_options, config);

      const xy_vector_collection = []
      // create vectors for the polyline:
      let s;
      const total_segments = options.line_segments;
      for (s = 0; s <= total_segments; s++) {
        const line_segment_xy_vector = {
          // use linear interpolation to find vector position
          x : map(s, 0, total_segments, start_xy_vector.x, end_xy_vector.x),
          y : map(s, 0, total_segments, start_xy_vector.y, end_xy_vector.y)
        }
        // store vectors in object:
         xy_vector_collection.push(line_segment_xy_vector)
      }

      // create the shape:
      return this.insertObject(xy_vector_collection, options.create_edges)
    }

    createPolygon( origin_xy_vector, radius, segments, config ) {
      const default_options = { create_edges: true },
            options = this.get_options(default_options, config);

      const xy_vector_collection = [];

      for(let s = 0; s < segments; s++){
        // linear interpolate the current radians per segment:
        const current_radian = map(s, 0, segments, 0, Math.PI*2);
        // creating vectors at current radian at radius length: 
        const xy_vector = {
                x: origin_xy_vector.x + Math.cos(current_radian)*radius, 
                y: origin_xy_vector.y + Math.sin(current_radian)*radius
              };
        xy_vector_collection.push(xy_vector);
      }
      // create the shape
      return this.insertObject(xy_vector_collection, options.create_edges, 'closed')
    }




    createStar(origin_xy_vector, inner_radius, outer_radius, points, config){
      const default_options = { create_edges: true },
            options = this.get_options(default_options, config);

      const xy_vector_collection = [],
            all_points = points * 2;
      let s;
      let radius;
      for(s = 0; s < all_points; s++){
        // linear interpolate the current radians per segment:
        const current_radian = map(s, 0, all_points, 0, Math.PI*2);
        // simple switching between inner and outer radius
        if(s%2 === 0) radius = inner_radius; 
        else radius = outer_radius;
        // creating vectors at current radian at radius length: 
        const xy_vector = {
                x: origin_xy_vector.x + Math.cos(current_radian)*radius, 
                y: origin_xy_vector.y + Math.sin(current_radian)*radius
              };
        xy_vector_collection.push(xy_vector);
      }
      // create the shape
      return this.insertObject(xy_vector_collection, options.create_edges, 'closed')

    }














odin.clearAndRender();



// let up = true;

// let fps = freya.settings.fps;

// const cycle_length = 2000;

// const frame_length = 1000 / fps;

// const cycle_fps = cycle_length / frame_length;

// console.log(cycle_fps)



// point y location needs to move up and down, directional 
// speed easing down when nearing upper and lower limit
const lower_limit = -200;
const upper_limit = 200;
// need to know the speed of the directional vector:
// get the total duration of one translation from upper to lower limit
// declare duration in ms:
const cycle_length = 8000;
// get duration in frames:
const cycle_frame_length = Math.round( cycle_length / ( 1000 / freya.settings.fps ) );

function pointDiamond(){
  const point_collection = [];
  const max_points = 5;
  const point_spread = 50;
  const total_length = (max_points-1) * point_spread;
  for (var i = 0; i < max_points; i++) {
    for (var j = 0; j < max_points; j++) {
     
      const x_pos = -(total_length) + i*point_spread + j*point_spread;
      const y_pos = -i*point_spread + j*point_spread;

      point_collection.push( asgard.insertPoint( xy( x_pos, y_pos) ) );

    }
  }

  return point_collection
}

const points = pointDiamond();
const points_x = [];
const points_y = [];

const symbols = [];

const color_1 = decodeRgba(restcolors[2]);
const color_2 = decodeRgba(restcolors[3]);


for (let i = 0; i < points.length; i++) {
	points_x.push( points[i].x );
	points_y.push( points[i].y );

	const rad = getFadedPosition(i, 0, points.length, 5, 75);
  const r = map(i, 0, points.length, color_1.r, color_2.r);
  const g = map(i, 0, points.length, color_1.g, color_2.g);
  const b = map(i, 0, points.length, color_1.b, color_2.b);
  const symbol = odin.addSymbol(points[i], rad, `rgba(${r}, ${g}, ${b},1)`);
  symbols.push(symbol)
}


odin.clearAndRender();


let increment = 0.5;
function growSymbols(symbol_set){

  for (var i = 0; i < symbol_set.length; i++) {

    if(symbol_set[i].radius >= 75) symbol_set[i].growing = false
    else if (symbol_set[i].radius <= 5) symbol_set[i].growing = true;

    if(symbol_set[i].growing) symbol_set[i].radius += increment;
    else symbol_set[i].radius -= increment;
  }
  
}


freya.addAnimation(function(){

	for (var p = 0; p < points.length; p++) {
		points[p].x = freya.interpolateCosine( lower_limit, upper_limit, cycle_frame_length, points_x[p] );
		points[p].y = freya.interpolateCosine( upper_limit, lower_limit, cycle_frame_length, points_y[p] );	
	}


	// growSymbols(symbols);

  odin.clearAndRender();
});
// freya.start();














function sinPt2(){
	const amplitude = 100;
	let current_radian = map(freya.current_frame, 1, cycle_frame_length, 0, Math.PI*2);	
	if(current_radian >= Math.PI*2) current_radian = 0;

	let cur_rad = map(freya.current_frame, 1, cycle_frame_length, 0, Math.PI);
	// if(cur_rad >= Math.PI) cur_rad = Math.PI;
	console.log( map( Math.sin( (Math.PI/2) + cur_rad ), -1, 1, -amplitude, amplitude ) );
	pt.y = map( Math.sin( (Math.PI/2) + cur_rad ), -1, 1, -amplitude, amplitude );
	// pt.y = Math.sin(cur_rad)
	// console.log(Math.sin(current_radian));
	// let pos = map(freya.current_frame, 1, cycle_frame_length, lower_limit, upper_limit)
	// console.log( Math.sin( current_radian ) );
	// const pos = map( Math.sin( current_radian ), -1, 1, lower_limit, upper_limit);
	// console.log(pos);
	// pt.y = pos ;
}

function moveSin4(xy_vector_start, xy_vector_end){
	const current_radian = map(freya.current_frame, 1, cycle_frame_length, 0, Math.PI);
	pt.x = map( Math.sin( (Math.PI/2) + current_radian ), -1, 1, xy_vector_end.x, xy_vector_start.x );
	pt.y = map( Math.sin( (Math.PI/2) + current_radian ), -1, 1, xy_vector_end.y, xy_vector_start.y );
}

function moveSin(){
	let start = -200;
	let end = 200;
	if(freya.current_frame == 1){
			
		}
	if(freya.current_frame <= cycle_frame_length){
	// 	pt.x = freya.tweenSin(0, 200, cycle_frame_length);
	// 	pt.y = freya.tweenSin(0, 200, cycle_frame_length);
	} 
	else {
		pt.x = freya.tweenSin(start, end, cycle_frame_length);
		pt.y = freya.tweenSin(start, end, cycle_frame_length);
	}
}
// for (var i = 1; i <= cycle_frame_length; i++) {
// 	const y = map(i, 1, cycle_frame_length, lower_limit, upper_limit);
// 	const fade = getFadedPosition(y, lower_limit, upper_limit, -1, 1);
// 	const loc_y = getFadedPosition(y, lower_limit, upper_limit, lower_limit, upper_limit);

// 	let sin = map(i, 1, cycle_frame_length, 0, Math.PI);

// 	if(sin === Math.PI){
// 		sin = 0;
// 	} 
// 	sin = Math.sin(sin);
	
// 	const circle = {
// 		location: y,
// 		radius: 1-Math.abs(fade),
// 		loc_y: loc_y
// 	} 

// 	console.log(i, circle);
	
// 	console.log(sin);
// }
// var frames = 60;
// var height = 100;
// var currentframe = 0;
// var y = 0;
// var amplitude = 400;
// var frequency = 1;


//ctx.moveTo(x, y);
// while (currentframe < frames) {
//     y = amplitude * Math.sin(currentframe/frequency);
//     console.log(y)
//     currentframe += 1;
// }
// let cosinePosition = (1 - Math.cos(n * Math.PI)) * 0.5;



// const speed = (Math.abs(upper_limit) + Math.abs(lower_limit)) / ( cycle_length / frame_length )

// // const speed = 400/(fps*2);

// function movePt(){

// 	// let t = map( f()%cycle_fps, 1, cycle_fps,   );
// 	// need to have the speed ease in and out 
// 	let s = map( pt.y, lower_limit, upper_limit, 0, 1 )
// 	console.log(s)
// 	let t = map(s, 0, 1, 0, cycle_fps)
// 	console.log(t)
// 	let a = getFadedPosition(f()%cycle_fps, 1, cycle_fps, lower_limit, upper_limit);
// 	console.log(a)
// 	if(pt.y >= upper_limit) up = false;
// 	else if(pt.y <= lower_limit) up = true;
// 	if(up) translate(pt, xy(0,speed));
// 	else translate(pt, xy(0,-speed));
// }

// function getFadedPosition2(x, in_min,  in_max,  out_min,  out_max) // minder ghetto versie
//  {
//    let normalizedPosition = map(x, in_min,  in_max, 0, 1);

//    let cosinePosition = (1 - Math.cos(normalizedPosition * Math.PI)) * 0.5;

//    let returnValue = map(cosinePosition, 0, 1, out_min, out_max);

//    return returnValue;
//  }



function sinTween(start, end, current, length, current_pos){
	let current_radian = ( (Math.PI/2) + ( map(current, 1, length, 0, Math.PI) ) );
	console.log(8, current_radian)

	if (current_pos){
		echo()
		// console.log( Math.sin  )
		console.log( 9,current_radian + Math.asin( map(current_pos, start, end, -1, 1) ) )
		console.log( 10, Math.asin( map(current_pos, start, end, -1, 1) ) );
		current_radian = Math.asin( map(current_pos, start, end, 1, -1) )
	}
	// console.log( 3, current_radian );
	// console.log( 4, current_radian + aapje )
	// if(current_radian + current_normalized_pos == Math.PI) current_radian = 0;

	// console.log( 2, Math.sin(current_radian))

	return map( Math.sin( current_radian ), -1, 1, start, end );
}


function cosTween2(start, end, current, length, pos){
	let current_radian = map(current, 1, length, 0, Math.PI) ;

	// get radian of current position:
	console.log(1,1, map(pos, lower_limit, upper_limit, -1, 1) )
	console.log(1,2, Math.acos( map(pos, lower_limit, upper_limit, -1, 1) ) )
	console.log(1,3, Math.acos( map(pos, lower_limit, upper_limit, -1, 1) ) + current_radian );
	console.log(1,4, Math.cos( Math.acos( map(pt.y, lower_limit, upper_limit, -1, 1) ) + current_radian ) )
	console.log(1,5, map( ( Math.cos( Math.acos( map(pt.y, lower_limit, upper_limit, -1, 1) ) + current_radian ) ), -1, 1, start, end ) );
	// console.log(1,2, current_radian + map( pos, start, end, 0, Math.PI) )


	// console.log(1,3, map( Math.cos( current_radian + map( pos, start, end, 0, Math.PI) ), -1, 1, start, end ) )

	return map( ( Math.cos( Math.acos( map(pos, lower_limit, upper_limit, -1, 1) ) + current_radian ) ), -1, 1, start, end )

	// return map( Math.cos( current_radian ), -1, 1, start, end );
}



///////// DEZE WERKT HIERONDER

function cosTween(start, end, current, length, initial_position){
	// function interpolates a value at a frame in the animation 
	// with cosine interpolation, so it eases at the limits

	// get the current radian by linear mapping current_frame with the 
	// animation length to 0...PI
	let current_radian = map(current, 1, length, 0, Math.PI) ; // expected result float answer between 0 and infinity

	// get the cosine of the initial position by mapping the initial position
	// to a cosine and using arc cosine to convert to radians
	const initial_radian = Math.acos( map(initial_position, start, end, -1, 1) ); // expected result somewhere between -1 and 1

	// add the initial radian to the to the current frame radian
	current_radian +=  initial_radian // expected result float answer between 0 and infinity

	// get cosine of the resulting total radian
	const current_cosine = Math.cos( current_radian ); // expected result somewhere beteween -1 and 1

	// return a linear mapped interpolation of the cosine to the start and end arguments
	return map( current_cosine, -1, 1, start, end ) // expected result somewhere between start...end
}
console.log(all_points_initial_x[0])
console.log( cosTween(-50, 50, 1, 60, all_points_initial_x[0]) );



console.log(all_points_initial_x);
console.log(freya.interpolateCosine( -50, 50, cycle_frame_length, all_points_initial_x[0] ));



// console.log(xy_vector(100,-100));



// console.log(collection);

// const point_a = asgard.insertPoint(xy([100,100])),
//       point_b = asgard.insertPoint({x: -100, y: -100}),
//       point_c = asgard.insertPoint(xy_vector(-100,100)),
//       point_d = asgard.insertPoint(xy(100,-100));

// const vectors = [
//   xy_vector(275,-0),
//   {x: -275, y: 0},
//   xy(0, 275),
//   xy_vector([0,-275])
// ];
// const points = asgard.insertPoint(vectors);


// const edge_a = asgard.insertEdge(point_a, point_b);

// const polyline = asgard.createPolyline( 
//         xy(100, -100), 
//         xy(-100, 100), 
//         {
//           create_edges: true,
//           line_segments: 5
//         }
//       );

// const polygon = asgard.createPolygon( 
//         xy(0,0), 
//         175, 
//         16, 
//         {
//           create_edges: false
//         }
//       );

// const square = asgard.createRectangle(
//         xy(0,0),
//         500,
//         {
//           create_edges: true
//         }
//       );

// const rectangle = asgard.createRectangle(
//         xy(-225, 125),
//         xy(225, -125),
//         {
//           create_edges: true
//         }
//       );

// const triangle = asgard.createTriangle(
//         xy(0,0),
//         300,
//         {
//           create_edges: true
//         }
//       );

// const star = asgard.createStar(
//                 xy(0,0), 
//                 175, 
//                 225, 
//                 16, 
//                 {
//                   create_edges: false
//                 }
//               );

















// // let foreground = odin.createLayer('foreground')
// // odin.fillLayer(0, colorscheme[2]);
// // odin.clearLayer();

// // odin.renderPoints(polyline);

// // odin.renderPoints(asgard.geometry.points)

// // render all geometry
// let render_config = {render_edges: true}


// // odin.addSymbol(point_a);





// // const noise = createValueNoise(odin.current_layer, 7, 7, 'kroon');
// // let n;
// // const all_points = noise.gridpoints.length;


// // for (n = 0; n < all_points; n++) {
// //   let config = {
// //         fill: true,
// //         fill_color: restcolors[ Math.floor( map( noise.gridpoints[n].value, 0, 1, 0, 4 ) )]
// //       };
// //   odin.current_layer.printCircle(noise.gridpoints[n], 1 + noise.gridpoints[n].value * 10, config)
// // }

// // console.log(createValueNoise1(10))

// function showNoiseCircles(){
//   const noise = createValueNoise(10);
//   let n;
//   const all_points = noise.length;

//   const layer_size = (odin.current_layer.width >= odin.current_layer.height) ? odin.current_layer.width : odin.current_layer.height;

//   for (n = 0; n < all_points; n++) {
//     const config = {
//             fill: true,
//             fill_color: restcolors[ Math.floor( map( noise[n].value, 0, 1, 0, 4 ) )]
//           };
//     const xy_vector = { x: noise[n].x * layer_size,
//                         y: noise[n].y * layer_size
//                       };
//     odin.current_layer.printCircle(xy_vector, 1 + noise[n].value * 10, config)
//   }
// }
// // showNoiseCircles();

// function showNoiseSquare(points, opacity){
//   const noise = createValueNoise(points);
//   // console.log(noise);
  
//   odin.current_layer.opacity = opacity;
  

 
//   const all_points = noise.length;
//   const lattice = Math.sqrt(all_points)-1;

//   const layer_size = (odin.current_layer.width >= odin.current_layer.height) ? odin.current_layer.width : odin.current_layer.height;
//   const quarter = ( ( layer_size / lattice ) / 2 );
//    let n;
//   for (n = 0; n < all_points; n++) {
    
//     // debugger;
//     const config = {
//           fill: true,
//           fill_color: colorscheme[ Math.floor( map( noise[n].value, 0, 1, 0, colorscheme.length ) )]
//         };
//     const xy_vector_top_left = { 
//             x: noise[n].x * layer_size - quarter,
//             y: noise[n].y * layer_size - quarter
//           },
//           xy_vector_bottom_right = {
//             x: noise[n].x * layer_size + quarter,
//             y: noise[n].y * layer_size + quarter
//           }

//     // console.log(xy_vector_top_left, xy_vector_bottom_right)

//     odin.current_layer.printRectangle(xy_vector_top_left, xy_vector_bottom_right, config);
//   }
// }

// showNoiseSquare(4, 0.7);
// let layer1 = odin.createLayer()
// showNoiseSquare(8, 0.6);
// let layer2 = odin.createLayer()
// showNoiseSquare(16, 0.5);
// let layer3 = odin.createLayer()
// showNoiseSquare(32, 0.4);
// let layer4 = odin.createLayer()
// showNoiseSquare(64, 0.3);
// let layer5 = odin.createLayer()
// showNoiseSquare(128, 0.2);
// let layer6 = odin.createLayer()
// showNoiseSquare(256, 0.1);


// // odin.render(asgard.geometry, render_config);
// // odin.render(asgard.geometry, foreground, render_config);

// // odin.renderPoints(point_collection);
// // odin.renderEdges(edge_collection);

// // // Opzetten van het grid:
// let grid = new Grid(50, layer_container);
// // Grid tonen...
// grid.layer.show(false);
// grid.placement('foreground');



// // setting up the animator...
// let animator = new Freya();
// function helloWorld(){
//   console.log('hello world');
// }
// function goodbyeWorld(){
//   console.log('goodbye world');
// }

// console.log(animator)
// // animator.addAnimation(helloWorld);
// // animator.addAnimation(goodbyeWorld);

// function movePt(point_object, arg2){
//   // console.log('movePt + ', point_object);
//   // move point 1 unit to the right each frame:
//   // point_object.x += 1;

//   // rotatePoint({x:0, y: 0}, point_object, 3)
//   rotateShape2({x:0, y: 0}, point_object, 1)
//   rotateShape2({x:0, y: 0}, arg2, -1)
//   // clear the layer:
//   odin.clearLayer();
//   // render new point location:
//   odin.render(asgard.geometry);
// }
// function rotatePt(point_object){
//   rotatePoint({x:0, y: 0}, point_object, 2)
//   // clear the layer:
//   odin.clearLayer();
//   // render new point location:
//   // odin.addSymbol(point_a);
//   let emit = emitter.emit(3);

//   // console.log(emit);

//   for (var i = 0; i < emit.length; i++) {

//     const current_radius = map(animator.current_frame,  1, animator.settings.total_frames,  1,  50)
//     // console.log(emit[i])
//     let max_velocity = 5,
//         v = { x: max_velocity - getRandomInt(max_velocity*2),
//               y: max_velocity - getRandomInt(max_velocity*2)
//             };
//     function velocity(pt) {
//       pt.x += v.x;
//       pt.y += v.y;
//     }

//     let current_pt = emit[i];
//     odin.addSymbol( current_pt, current_radius, restcolors[getRandomInt(restcolors.length)] );
//     // console.log(aapje)
//     animator.addAnimation(function(){
//       velocity(current_pt);
//     });

    
//   }


//   odin.renderSymbols();
//   // odin.render(asgard.geometry);
// }

// function createDots(){
//   const total_dots = 5;
//   const height = odin.current_layer.height;
//   const width = odin.current_layer.width;
//   const points = {
//     pts: [],
//     bounds: { x_min: NaN,
//               y_min: NaN,
//               x_max: NaN,
//               y_max: NaN }
//   };
//   // create some vectors:
//   for (var i = 1; i < total_dots+1; i++) {
//     const x = map(i, 0, total_dots+1, -(width/2), (width/2) )
//     if(i === 1) points.bounds.x_min = x;
//     else if(i == total_dots) points.bounds.x_max = x;

//     for (var j = 1; j < total_dots+1; j++) {
//       const y = map(j, 0, total_dots+1, -(height/2), (height/2) )
//       if(i === 1 && j === 1) points.bounds.y_min = y;
//       else if(i == total_dots && j == total_dots) points.bounds.y_max = y;
//       const pt = asgard.insert('point', [x, y]);
//       points.pts.push(pt);
//     }
    
//   }
//   return points
// }



// let direction = 'right';
// function moveDots(dots){

//   // console.log(dots)

//   for (var i = 0; i < dots.pts.length; i++) {
  
//     if(dots.pts[i].x >= dots.bounds.x_max){
//     direction = 'up';
//   } if(dots.pts[i].y >= dots.bounds.y_max) {
//       direction = 'left';
//     } if(dots.pts[i].x <= dots.bounds.x_min) {
//         direction = 'down';
//       } if(dots.pts[i].y <= dots.bounds.y_min && dots.pts[i].x != dots.bounds.x_max) {
//           direction = 'right';
//         }

//   switch(direction){
//     case 'right':
//       dots.pts[i].x += 5;
//       break;
//     case 'left':
//       dots.pts[i].x -= 5;
//       break;
//     case 'up':
//       dots.pts[i].y += 5;
//       break;
//     case 'down':
//       dots.pts[i].y -= 5;
//       break;
//   }


//   }

  

//    // clear the layer:
//   odin.clearLayer();
// odin.render(asgard.geometry);
//   // for (var i = 0; i < dots.length; i++) {
//   //   dots[i].x += 0;
//   //   dots[i].y += 0;
//   // }
// }

// // moveDots(pts);
// function createCircles(color){
//   let total_circles = 9;
//   let polygons = [];
//   for (var i = 0; i < total_circles; i++) {
//     let poly = asgard.insert('polygon', [0,0], 50+i*20, 24);
//     for (var j = 0; j < poly.length; j++) {
//       odin.addSymbol( poly[j], 3+i, restcolors[color] );
//     }
//     polygons.push(poly);
//   }
//   return polygons
// }

// // let polys = createCircles(3);
// // let polys2 = createCircles(3);
// function animateCircles(circles, circles2){

//   console.log(circles);
//   const max_velocity = 0.5;
//   for (var i = 0; i < circles.length; i++) {
//     const v = map(i, 0, circles.length, 0, max_velocity )
//     rotateShape2({x: 0, y: 0}, circles[i], v)  
//   }
//   for (var i = 0; i < circles2.length; i++) {
//     const v = map(i, 0, circles2.length, 0, max_velocity )
//     rotateShape2({x: 0, y: 0}, circles2[i], -v)  
//   }
//   // clear the layer:
//   odin.clearLayer();
//   odin.renderSymbols();
// }

// // animateCircles(polys);

// odin.render(asgard.geometry);
// odin.renderSymbols();

// animator.addAnimation(function(){
//   // movePt(triangle, polygon);
//   // rotatePt(point_a);
//   // animateCircles(polys, polys2);
//   // moveDots(pts);
//   // addGravity(point);
// })

// animator.start();




function scaleAndRotateSomething(object){
  scale(object, xy(0,0), incr);
  rotate(object, xy(0,0), 360/(30*15));
  // clear the layer:
  odin.clearLayer();
  // render geometry:
  odin.render(asgard.geometry);
  frame++;
  if(frame%30 === 0) incr = (incr === 1.01) ? 0.99 : 1.01;
}

function rotateDelayed(object, min_angle, max_angle){

  for (var i = 0; i < object.length; i++) {
    const current_angle = map(i, 0, object.length, min_angle, max_angle)
    rotate(object[i], xy(0,0), current_angle);
  }
}




function pointGrid_horizontal(points_h, points_v, point_spread){
  const point_collection = [];
  const total_width = (points_h-1)*point_spread;
  const total_height = (points_v-1)*point_spread;

  for (var v = 0; v < points_v; v++) {

    for (var h = 0; h < points_h; h++) {
      
      const x_pos = -(total_width/2)+(h*point_spread);
      const y_pos = -(total_height/2)+(v*point_spread);

      point_collection.push( asgard.insertPoint( xy( x_pos, y_pos) ) );

    }
    
  }

  return point_collection

}

function pointGrid_vertical(points_h, points_v, point_spread){
  const point_collection = [];
  const total_width = (points_h-1)*point_spread;
  const total_height = (points_v-1)*point_spread;

  for (var h = 0; h < points_h; h++) {

    for (var v = 0; v < points_v; v++) {
      
      const x_pos = -(total_width/2)+(h*point_spread);
      const y_pos = -(total_height/2)+(v*point_spread);

      point_collection.push( asgard.insertPoint( xy( x_pos, y_pos) ) );

    }
    
  }

  return point_collection

}







function pointDiamond2(){
  const point_collection = [];
  const max_points = 5;
  const point_spread = 100;
  const total_length = (max_points-1) * point_spread;
  let dots;
  for (var i = 0; i < max_points+max_points-1; i++) {

    if(i > max_points-1) dots = (max_points-1+max_points-1 ) - i;

    else dots = i;

    for (var j = 0; j <= dots; j++) {
     
      const x_pos = -(total_length/2) + i*point_spread/2;

      const y_pos = -(dots*point_spread)/2 + j*point_spread;

      point_collection.push( asgard.insertPoint( xy( x_pos, y_pos) ) );
    }
  }

  return point_collection
}


function pointDiamond(){
  const point_collection = [];
  const max_points = 5;
  const point_spread = 50;
  const total_length = (max_points-1) * point_spread;
  for (var i = 0; i < max_points; i++) {
    for (var j = 0; j < max_points; j++) {
     
      const x_pos = -(total_length) + i*point_spread + j*point_spread;
      const y_pos = -i*point_spread + j*point_spread;

      point_collection.push( asgard.insertPoint( xy( x_pos, y_pos) ) );

    }
  }

  return point_collection
}
// pointdiamond2();
// pointsDiamond();

console.log(asgard.geometry);


const points = pointGrid_horizontal(5, 5, 75);

translatePoint(points[0], xy(0,20));
const symbols = [];

const col1 = decodeRgba(restcolors[2]);
const col2 = decodeRgba(restcolors[3]);

for (var i = 0; i < points.length; i++) {
  // const rad = map(i, 0, points.length, 5, 55);
  const rad = getFadedPosition(i, 0, points.length, 5, 55);
  const r = map(i, 0, points.length, col1.r, col2.r);
  const g = map(i, 0, points.length, col1.g, col2.g);
  const b = map(i, 0, points.length, col1.b, col2.b);
  const symbol = odin.addSymbol(points[i], rad, `rgba(${r}, ${g}, ${b},1)`)
  symbols.push(symbol)
}

let increment = 0.25;
function growSymbols(){

  for (var i = 0; i < symbols.length; i++) {

    if(symbols[i].radius >= 55) symbols[i].growing = false
    else if (symbols[i].radius <= 5) symbols[i].growing = true;

    if(symbols[i].growing) symbols[i].radius += increment;
    else symbols[i].radius -= increment;
  }
  
}




// rotation
function rotatePoint(origin, point_object, angle) {
	// calculate new point location
  let radians = (Math.PI / 180) * angle,
  cos = Math.cos(radians),
  sin = Math.sin(radians),
  new_x = (cos * (point_object.x - origin.x)) + (sin * (point_object.y - origin.y)) + origin.x,
  new_y = (cos * (point_object.y - origin.y)) - (sin * (point_object.x - origin.x)) + origin.y;
  // update point
  point_object.x = new_x;
  point_object.y = new_y;
}

// rotation of shape
function rotateShape(origin, shape_object, angle) {
  for (let i = shape_object.points.length - 1; i >= 0; i--) {
    rotatePoint(origin, shape_object.points[i],angle);
  }
}

function rotateShape2(origin, shape_object, angle) {
  for (let i = shape_object.length - 1; i >= 0; i--) {
    rotatePoint(origin, shape_object[i],angle);
  }
}