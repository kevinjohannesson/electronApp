
// Functionality tests:
function pointTest(total_points, layer_object, colortheme){

  function generateVectors(total_vectors){
    let all_vectors = [];
    let width = window.innerWidth;
    let height = window.innerHeight
    for(let v = 0; v < total_vectors; v++){
      let vector = {
        x: -(width/2) + getRandomInt(width),
        y: -(height/2) + getRandomInt(height)
      }
      all_vectors.push(vector);
    }
    return all_vectors
  }

function createPoints(vector_set, pointcloud_object, callback){
  let all_points = [];
  for (var p = 0; p < vector_set.length; p++) {
    let point = createPoint(vector_set[p], pointcloud_object);
    all_points.push(point);
  }
  callback()
  return all_points
}

function drawPointsRandom(layer_object, point_array){
    let all_points = point_array.points.length
    for(let p = 0; p < all_points; p++){
      let current_pt = point_array.points[p];
      // random straal genereren:
      let min_radius = 6;
      let max_radius = 20;
      let radius = min_radius + getRandomInt(max_radius - min_radius);
      // random kleuren genereren:
      let color = colortheme[ 1+getRandomInt(colortheme.length-1) ];
      // punt kleuren met random waarden
      current_pt.draw(layer_object, radius, color, true);
    }
  }
//// Punten verbinden met edges op basis van een threshold
function createEdges(layer_object, pointcloud_object, lower_limit, upper_limit){
    let points = pointcloud_object.points;
    for (var p = points.length - 1; p >= 0; p--) {
      // edges maken van elke punt naar alle andere edges:
      for (var i = points.length - 1; i >= 0; i--) {
        if(points[p] != points[i]){
          // punten moeten enkel verbinden wanneer de afstand binnen een bepaalde limiet valt...
          let distance = getPointDistance(points[i], points[p]).xy;
          if(distance < upper_limit && distance > lower_limit){
            let edge = new Edge(points[p], points[i]);
            edge.draw(layer_object, 2, colortheme[1+getRandomInt(colortheme.length-1)]);
            console.log(edge)
          }
        }
      }
    }
  }
  // Draw points on the canvas in a random radius and random color picked from the colortheme:
  // Setup object to store points
  let pointcloud = new Pointcloud;

  // point distance limit for creating edges
  let lower_limit = 75;
  let upper_limit = 125;

  // base point radius
  let pointsize = 4;

  createPoints(generateVectors(total_points), pointcloud, function(){
    createEdges(layer_object, pointcloud, lower_limit, upper_limit);
  });
  
  // drawPointsRandom(layer_object, pointcloud);
  // console.log(pointcloud)
  // pointcloud.drawPoints(layer_object, pointsize, colortheme, true);
  
}