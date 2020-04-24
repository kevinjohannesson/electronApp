class Grid{
  // Creêert een xy-grid voor de scene...
  constructor(grid_size, layer_container){
    // Opzetten van een layer met een canvas voor het grid
    this.layer = new Layer();
    // add to document so it has a size;
    this.layer.addToDocument(layer_container, 'grid');
    // Parameters meegeven...
    this.grid_size = grid_size;
    // Limieten aanmaken.
    this.limits = {
      x_start : {x: 0, y: this.layer.canvas.height/2},
      x_end : {x: this.layer.canvas.width, y: this.layer.canvas.height/2},
      y_start : {x: this.layer.canvas.width/2, y: 0},
      y_end : {x: this.layer.canvas.width/2, y: this.layer.canvas.height},
    }

    // Tekenen van grid op de canvas:
    // Scene opdelen in 4 secties dmv een kruisende x- en y-as...
    // Scene wordt opgedeeld in -x+y, +x+y, -x-y, +x-y...
    let x_axis_config = { stroke_thickness: 2, stroke_color: 'rgba(150, 0, 0, 0.5)' },
        y_axis_config = { stroke_thickness: 2, stroke_color: 'rgba(0, 150, 0, 0.5)' };
    this.layer.printLine( this.limits.x_start, this.limits.x_end, x_axis_config);
    this.layer.printLine( this.limits.y_start, this.limits.y_end, y_axis_config);
    // Dividing the grid in smaller cubs...
    let sub_lines_config = { stroke_thickness: 1, stroke_color: 'rgba(255, 255, 255, 0.25)' };
    // Adding vertical grid lines:
    for (let v = 0; v < this.layer.canvas.width; v += this.grid_size){
      this.layer.printLine( {x: v, y: 0}, {x: v, y: this.layer.canvas.height}, sub_lines_config );
    }
    // Adding horizontal grid lines:
    for (let u = 0; u < this.layer.canvas.height; u += this.grid_size){
      this.layer.printLine( {x: 0, y: u}, {x: this.layer.canvas.width, y: u}, sub_lines_config );
    }
   
  }

  placement(side){
    switch(side){
      case 'foreground':
      this.layer.canvas.style.zIndex = 250;
      break;
      case 'background':
      this.layer.canvas.style.zIndex = 0;
      break;
    }
  }
}
