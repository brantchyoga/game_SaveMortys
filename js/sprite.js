var sprite = function(filename, is_pattern) {
  this.image = null;
  this.pattern = null;
  this.TO_RADIANS = Math.PI/180;

  if(filename != undefined && filename != '' && filename != null) {
    this.image = new Image();
    this.image.src = filename;
    this.image.onload = function(e) {
      console.log("img loaded");
    }

    if(is_pattern) {
      this.pattern = Context.context.createPattern(this.image, "repeat")
    }
  } else {
    console.log("unable to load sprite");
  };

  this.draw = function(x, y, w, h) {
    //pattern? .draw something that isn't an image or stretched image
    if(this.pattern != null) {
      console.log("pattern!");
      Context.context.fillStyle = this.pattern;
      Context.context.fillRect(x, y, w, h);
    } else {
      //image that has width and height; unhence w & h are undefined
      if(!w || !h) {
        Context.context.drawImage(this.image, x, y, this.image.width, this.image.height);
      } else {
        //stretched-Want to apply our own width and height to image
        Context.context.drawImage(this.image, x, y, w, h)
      }
    }
  };
  
  this.rotate = function(x, y, angle) {
    Context.context.save();
    Context.context.translate(x, y);
    Context.context.rotate(angle * this.TO_RADIANS)
    Context.context.drawImage(this.image,
                            -(this.image.width/2),
                            -(this.image.height/2));
    Context.context.restore();
  };
};
