class DrawableImage extends Drawable{
    constructor(x,y,image, scale=1) {
      super(x,y,image.width*scale,image.height*scale);
      this.image = image;
      this.scale = scale;
    }
    drawShape(canvas) {
        canvas.scale(this.scale,this.scale);
        // canvas.fillStyle = "#f00a";
        // canvas.fillRect(-this.image.width/2,-this.image.height,this.image.width,this.image.height);
        canvas.drawImage(this.image,-this.image.width/2,-this.image.height)
    }
  }