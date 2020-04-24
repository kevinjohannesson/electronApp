class Layer{
  constructor(){
    // every layer is a new canvas element:
    this.canvas = document.createElement('canvas');
    // store the context
    this.context = this.canvas.getContext('2d');
    // optional arguments upon creation:
    // div container element:
    if(arguments.length != 0){ 
      if(arguments[0] instanceof Element){
        this.addToDocument(arguments[0]);
      }
      // optional canvas element id
      if(arguments[1]){ // string to set id to
        this.id = arguments[1].toString();
      }
    }
  }

  set height(h){
    this.canvas.height = h;
  }

  get height(){
    return this.canvas.height
  }

  set width(w){
    this.canvas.width = w;
  }

  get width(){
    return this.canvas.width
  }

  addToDocument(container_div, id_name){
    if(id_name) this.id = id_name;
    // edit canvas dimensions to container div:
    this.height = container_div.clientHeight;
    this.width = container_div.clientWidth;
    // add canvas element to container div...
    container_div.appendChild(this.canvas);
    // make visible as the default...
    this.show(true);
  }

  set id(name){
    // add optional ID
    this.canvas.setAttribute('data-layer', name);
  }

  get id(){
    return this.canvas // this is not correct yet...........
  }

  show(bool){
    if(bool) this.canvas.style.display = 'block';
    else this.canvas.style.display = 'none';
  }

  printLine(xy_vector_a, xy_vector_b, config){
    // create path at supplied coordinates:
    this.context.beginPath();
    this.context.moveTo( xy_vector_a.x, xy_vector_a.y );
    this.context.lineTo( xy_vector_b.x, xy_vector_b.y );
    // check for configuration:
    if(config){
      if(config.stroke_thickness) this.context.lineWidth = config.stroke_thickness;
      if(config.stroke_color) this.context.strokeStyle = config.stroke_color;
    }
    // stroke the path:
    this.context.stroke();
  }

  printCircle(xy_vector, radius, config){
    // Cirkel op canvas tekenen:
    this.context.beginPath();
    this.context.arc(xy_vector.x, xy_vector.y, radius, 0, Math.PI * 2);
    // arc is created, now to fill or stroke the arc:
    if(config){
      if(config.fill == true){
        this.context.fillStyle = config.fill_color;
        this.context.fill(); 
      }
      if(config.stroke_thickness) this.context.lineWidth = config.stroke_thickness;
      if(config.stroke == true){
        this.context.strokeStyle = config.stroke_color;
        this.context.stroke();
      }
    } else this.context.stroke();
  }

  printRectangle(xy_vector_top_left, xy_vector_bottom_right, config){
    // draw a rectangle on the canvas:
    let width = xy_vector_bottom_right.x - xy_vector_top_left.x,
        height = xy_vector_bottom_right.y - xy_vector_top_left.y;
    
    if(config){
      if(config.fill == true){
        this.context.fillStyle = config.fill_color;
        this.context.fillRect( xy_vector_top_left.x, xy_vector_top_left.y, width, height );
      }
      if(config.stroke_thickness) this.context.lineWidth = config.stroke_thickness;
      if(config.stroke == true){
        this.context.strokeStyle = config.stroke_color;
        this.context.strokeRect( xy_vector_top_left.x, xy_vector_top_left.y, width, height );
      }
    } else this.context.strokeRect( xy_vector_top_left.x, xy_vector_top_left.y, width, height );
  }

  fill(color){
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  clear(){
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
  }
}