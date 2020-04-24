class Freya{
  constructor(preferences){
    this.settings = {
      fps: parseInt(preferences.fps),
      total_frames: parseInt(preferences.total_frames)
    }
    this.current_frame = 1;
    this.animations = [];
    this.timer;
  }

  get fps(){ return this.settings.fps }
  get framecount(){ return this.settings.total_frames }
  set framecount(count){ this.settings.total_frames = count }

  addAnimation(func){
    this.animations.push(func);
  }

  start(show_frame_number = false){
    let that = this;
    setTimeout(function() { // give frame 1 time
    /// moet hier nog even call() van maken!!!!
    that.timer = 
      setInterval(function(){ // set interval for remaining frames
        if( show_frame_number ) console.log(`f: ${that.current_frame}`)
        for (let a = 0; a < that.animations.length; a++) {
          that.animations[a]();
        }
        if (that.current_frame == that.settings.total_frames) clearInterval(that.timer);
        that.current_frame += 1;
      }, 1000 / that.settings.fps );
    
    }, 1000 / that.settings.fps );
    
  }

  pause(){

  }

  stop(){
    clearInterval(this.timer)
  }

  interpolateCosine( start_value, end_value, animation_frame_length, initial_position ){
    // function interpolates a value at a frame in the animation 
    // with cosine interpolation, so it eases at the limits

    // get the current radian by linear mapping current_frame with the 
    // animation length to 0...PI
    let current_radian = getLinearInterpolation(this.current_frame, 1, animation_frame_length, 0, Math.PI) ; // expected result float answer between 0 and infinity

    // get the cosine of the initial position by mapping the initial position
    // to a cosine and using arc cosine to convert to radians
    const initial_radian = Math.acos( getLinearInterpolation(initial_position, start_value, end_value, -1, 1) ); // expected result somewhere between -1 and 1

    // add the initial radian to the to the current frame radian
    current_radian +=  initial_radian // expected result float answer between 0 and infinity

    // get cosine of the resulting total radian
    const current_cosine = Math.cos( current_radian ); // expected result somewhere beteween -1 and 1

    // return a linear mapped interpolation of the cosine to the start and end arguments
    return getLinearInterpolation( current_cosine, -1, 1, start_value, end_value ) // expected result somewhere between start...end
  }


  interpolateCosine2( animation_frame_length, initial_position ){
    // function interpolates a value at a frame in the animation 
    // with cosine interpolation, so it eases at the limits

    // get the current radian by linear mapping current_frame with the 
    // animation length to 0...PI
    let current_radian = getLinearInterpolation(this.current_frame, 1, animation_frame_length, 0, Math.PI) ; // expected result float answer between 0 and infinity

    // get the cosine of the initial position by mapping the initial position
    // to a cosine and using arc cosine to convert to radians
    const initial_radian = Math.acos( getLinearInterpolation(initial_position, 0, 1, -1, 1) ); // expected result somewhere between -1 and 1

    // add the initial radian to the to the current frame radian
    current_radian +=  initial_radian // expected result float answer between 0 and infinity

    // get cosine of the resulting total radian
    const current_cosine = Math.cos( current_radian ); // expected result somewhere beteween -1 and 1

    // return a linear mapped interpolation of the cosine to the start and end arguments
    return current_cosine
  }
}