class DrawableText extends Drawable{
    constructor(text,x,y,w,h,size) {
      super(x,y,w,h);
      this.text=text;
      this.fontSize = size;
      this.fontFamily = 'Courier';
      this.textAlign ='center';
    }
    drawShape() {
      // super.drawShape();
      var w = this._w;
      var h = this._h;
      // canvas.fillStyle=Color.darken(this).color;
      // canvas.fillRect(0,0,w,h);
      canvas.fillStyle=this.color;
      var ps = this.pixelSpace();
      canvas.font = this.fontSize*ps.W +'px ' + this.fontFamily;
      canvas.textAlign = this.textAlign;
      canvas.textBaseline='middle';
      canvas.fillText(this.text,w/2, h/2,w,h);
    }
  }